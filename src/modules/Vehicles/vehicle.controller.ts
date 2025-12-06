import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const {createVehicleService,getVehiclesServices,getSingleVehicleService,updateSingleVehicleService,deleteSingleVehicleService}= vehicleServices

const createVehicle=async(req:Request,res:Response)=>{


try {
console.log(req.body);

const result =  await  createVehicleService(req.body)

res.status(201).json({
      success: true, 
      message: "Vehicle createdd successfully",
      data: result.rows[0],
    });
    
} catch (error:any) {
    res.status(500).json({
        success:false,
        message:'Failed to create vehicle',
        errors:error.message
    })
}


}


const getVehicles=async(req:Request,res:Response)=>{
     try {
    const result = await getVehiclesServices();
   

     if(result.rows.length===0){
     return  res.status(200).json({
      success: true,
      message:"No vehicles found",
     data: [],
    
    }
)}
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
       data: result.rows,
    
     
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicles',
      errors:error.message
    });
  }
}

const getSingleVehicle=async(req:Request,res:Response)=>{

    console.log(req.params.vehicleId);
    
try {
    const result = await getSingleVehicleService(req.params.vehicleId!);
    
     console.log(result);
     
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
        
      });
    } else {
      res.status(200).json({
        success: true,
        messae: "User fetched",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicle',
      errors:error.message
    });
  }

}

const updateSingleVehicle=async(req:Request,res:Response)=>{

   const { vehicle_name,type, registration_number,daily_rent_price, availability_status}= req.body



   try {


    const result= await updateSingleVehicleService(vehicle_name,type, registration_number,daily_rent_price, availability_status,req.params.vehicleId!)
     if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        messae: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }
   } catch (error:any) {
      res.status(500).json({

        success:false,
        message:'Failed to update vehicle',
        errors:error.messae
      })
   }
}

const deleteSingle=async(req:Request,res:Response)=>{

  try {
    const result = await deleteSingleVehicleService(req.params.vehicleId!);
    // console.log(result.rows);
    // console.log(result.rowCount);
    if (result.rowCount == 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        messae: "Vehicle Deleted Successfully",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete vehicle',
      errors:error.messae
    });
  }

}
export const vehicleController= {
    createVehicle,getVehicles,getSingleVehicle,updateSingleVehicle,deleteSingle
}