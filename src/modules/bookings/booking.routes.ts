import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";


const router= Router()


const {createBooking,getBooking,updateBooking}= bookingController

router.post('/bookings',auth(),createBooking)
  router.get('/bookings',auth(),getBooking)
   router.put('/bookings/:bookingId',auth(),updateBooking)
export const bookingRouter=router