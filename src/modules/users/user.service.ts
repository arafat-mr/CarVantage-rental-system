import { pool } from "../../config/db"



const getUsersService=async()=>{
    const result=await pool.query(`
        SELECT * FROM users
        `)
   return result
     }


     const singleUserService=async(userId:string)=>{
               

        const result= await pool.query(`SELECT * FROM users WHERE id=$1`,[userId])
      return result
     }


     const updateUserService=async(name:string,email:string,phone:string,role:string,userId:string)=>{
        const result =await pool.query(`
            
            UPDATE users
        SET
          name = COALESCE($1, name),
        email = COALESCE($2, email),
        phone = COALESCE($3, phone),
         role = COALESCE($4, role)
      
        WHERE id = $5
        RETURNING *;
            
            `,
            [name,email,phone,role,userId]
        )
        return result
     }


     const deleteUserService=async(userId:string)=>{

 const result= await pool.query(`DELETE  FROM users WHERE id=$1 `,[userId])

 return result
     }
     export const usersServices={
        getUsersService,singleUserService,updateUserService,deleteUserService
     }