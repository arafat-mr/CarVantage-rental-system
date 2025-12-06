
import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import config from "../../config";
import jwt from 'jsonwebtoken'
const createSignUpService= async(payload: Record<string,unknown>)=>{

    const {name,email,password,phone,role}=payload

    const hashedPass= await bcrypt.hash(password as string ,10)
      const result= await pool.query(`
             INSERT INTO users (name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *
            
             `,[name,email,hashedPass,phone,role])
            return result
}



const loginUserService=async(email:string,password:string)=>{
const result= await pool.query(`SELECT * FROM users WHERE email=$1`,[email])
console.log(result);

if(result.rows.length === 0){
    return null
}

const user= result.rows[0]

const matchedUser= await bcrypt.compare(password,user.password)
 
console.log(matchedUser,user);

if(!matchedUser){
    return false
}
const secret= config.jwt_secret
const token = jwt.sign({name:user.name,email:user.email,role:user.role},secret as string,{
    expiresIn:'7d'
})
console.log({token});

 delete user.password
return {token,user}

}


export const authServices={
    createSignUpService,loginUserService
}