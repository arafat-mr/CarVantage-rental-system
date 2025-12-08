import { Request, Response } from "express";
import { usersServices } from "./user.service";



const {getUsersService,updateUserService,singleUserService,deleteUserService}=usersServices
const getUsers=async(req:Request,res:Response)=>{

try {
    

    const result =  await getUsersService()
  
   const users=result.rows.map((user)=>{
    delete user.password
    return user
   })
   

   
   
    res.status(200).json({
        success:true,
        messgae:'Users retrievd successfully',
        data:users
    })
} catch (error:any) {
    res.status(500).json({
        success:false,
        message:'Failed to load users',
        errors:error.messae
    })
}

}


const getSingleUser=async(req:Request,res:Response)=>{


    
    try {
   const result = await singleUserService(req.params.userId!)

     const user=result.rows[0]
     delete user.password
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
        
      });
    } else {
      res.status(200).json({
        success: true,
        messae: "User fetched",
        data: user,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch User',
      errors:error.message
    });
  }

}
const updateUser=async(req:Request,res:Response)=>{


   
  try {
 const { name, email,phone,role} = req.body;
    const userId=req.params.userId!.toString()
   
    
     const loggedInUser = req.user;
    
     
     const loggedinUserId= loggedInUser!.id.toString()
     
     
    
    if (loggedInUser!.role !== 'admin' && loggedinUserId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to update this user'
      });
    }
    const result = await updateUserService(
      
      
      
     name,
      email,
      phone,
      loggedInUser!.role === 'admin' ? role : null, 
      userId!
    );

    

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        messae: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const deleteUser=async(req:Request,res:Response)=>{

   try {
    const result= await deleteUserService(req.params.userId!)
  
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        messae: "User Deleted Successfully",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export const userController={
    getUsers,getSingleUser,updateUser,deleteUser
}