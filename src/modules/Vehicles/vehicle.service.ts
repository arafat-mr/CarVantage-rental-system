
import { Request, Response } from "express";
import { pool } from "../../config/db";



const createVehicleService=async(payload: Record<string,unknown>)=>{
console.log( 'from payload ',payload);

const {vehicle_name,type,registration_number,daily_rent_price,availability_status}= payload


const result= await pool.query(`
    
             INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *
            
             `,
             [vehicle_name,type,registration_number,daily_rent_price,availability_status]
            )
    
 

   return result
}


const getVehiclesServices=async()=>{
     const result = await pool.query(`SELECT * FROM vehicles`)
    return result
}

const getSingleVehicleService=async(id:string)=>{
  const result= await pool.query(`SELECT * FROM vehicles WHERE id=$1`,[id])
      return result
}


const updateSingleVehicleService=async(vehicle_name:string,type:string,registration_number:string,daily_rent_price:number,availability_status:string,vehicleId:string)=>{
    const result = await pool.query(`
        
        
        UPDATE vehicles SET 
         vehicle_name = COALESCE($1, vehicle_name),
      type = COALESCE($2, type),
     registration_number = COALESCE($3, registration_number),
     daily_rent_price = COALESCE($4, daily_rent_price),
     availability_status = COALESCE($5, availability_status)
     WHERE id = $6
     RETURNING *
        
        
        
        `,[vehicle_name,type,registration_number,daily_rent_price,availability_status,vehicleId])
        return result
}

const deleteSingleVehicleService=async(vehicleId: string)=>{

    const result= await pool.query(`DELETE  FROM vehicles WHERE id=$1 `,[vehicleId])

 return result

}
export const vehicleServices={
    createVehicleService,getVehiclesServices,getSingleVehicleService,updateSingleVehicleService,deleteSingleVehicleService
}