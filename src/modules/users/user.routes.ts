import { Router } from "express";
import { userController } from "./user.controller";


const {getUsers,updateUser,getSingleUser,deleteUser}=userController
const router= Router()

router.get('/users',getUsers)
router.get('/users/:userId',getSingleUser)
router.put('/users/:userId',updateUser)

router.delete('/users/:userId',deleteUser)
export const userRoute= router