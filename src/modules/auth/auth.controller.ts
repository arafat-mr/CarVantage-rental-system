import { Request, Response } from "express";
import { pool } from "../../config/db";
import { authServices } from "./auth.service";

const { createSignUpService ,loginUserService} = authServices;
const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await createSignUpService(req.body);

    const user = result.rows[0];
    delete user.password;
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });

    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      errors:error.message
    });
  }
};


const loginUser= async(req:Request,res:Response)=>{

    const {email,password}=req.body
     try {
    
      const result= await loginUserService(email,password)
    
    
    res.status(200).json({
      success: true,
      message: "Login successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Login Failed',
      errors:error.message
    });
  }
  
}

export const authController={
    signupUser,loginUser
}