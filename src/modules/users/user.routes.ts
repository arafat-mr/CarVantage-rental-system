import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";


const {getUsers,updateUser,getSingleUser,deleteUser}=userController
const router= Router()

router.get('/users',auth('admin'),getUsers)
router.get('/users/:userId',auth('admin'),getSingleUser)
router.put('/users/:userId',auth('admin','customer'),updateUser)

router.delete('/users/:userId',auth('admin'),deleteUser)
export const userRoute= router