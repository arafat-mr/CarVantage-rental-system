import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";


const router= Router()


const {createVehicle,getVehicles,getSingleVehicle,updateSingleVehicle,deleteSingle}= vehicleController


router.post('/vehicles',auth('admin'),createVehicle)

router.get('/vehicles',getVehicles)

router.get('/vehicles/:vehicleId',getSingleVehicle)
router.put('/vehicles/:vehicleId',auth('admin'),updateSingleVehicle)
router.delete('/vehicles/:vehicleId',auth('admin'),deleteSingle)
export const vehicleRoute=router