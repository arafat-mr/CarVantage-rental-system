import { Router } from "express";
import { authController } from "./auth.controller";


const router= Router()


const {signupUser,loginUser}= authController
router.post('/signup',signupUser)

router.post('/signin',loginUser)



export const authRoutes=router