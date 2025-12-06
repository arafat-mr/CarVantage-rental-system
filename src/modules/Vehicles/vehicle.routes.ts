import { Router } from "express";
import { vehicleController } from "./vehicle.controller";


const router= Router()


const {createVehicle,getVehicles,getSingleVehicle,updateSingleVehicle,deleteSingle}= vehicleController


router.post('/vehicle',createVehicle)

router.get('/vehicles',getVehicles)

router.get('/vehicles/:vehicleId',getSingleVehicle)
router.put('/vehicles/:vehicleId',updateSingleVehicle)
router.delete('/vehicles/:vehicleId',deleteSingle)
export const vehicleRoute=router