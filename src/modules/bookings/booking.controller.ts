import { Request, response, Response } from "express"
import { bookingServices } from "./booking.service"
import { pool } from "../../config/db"



const {createBookingService,getBookingService,updateBookingService}= bookingServices
const createBooking=async(req:Request,res:Response)=>{

         
    try {
        const result= await createBookingService(req.body)
        
      
        res.status(201).json({
            success:true,
            message:'Booking placed successfully',
            data:result
            
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:'Error while creating',
            errors:error.message
        })
        
    }

}


const getBooking=async(req:Request,res:Response)=>{

         const loggedInUser = req.user!;
       
         
          let result
    
    try {
        if(loggedInUser.role==='customer'){
            result = await getBookingService(loggedInUser.id.toString())

           
        }else{

            result= await getBookingService()
        }

        res.status(200).json({
            success:true,
            message:'Bookings retrieved successfully',
            data: result.rows
        })
        
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:'Error loading bookings',
            errors:error.message
        })
    }
}


const updateBooking = async (req: Request, res: Response) => {
  const loggedInUser = req.user!;
  const { status } = req.body;
  const bookingId = req.params.bookingId!;

  try {
   
    const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);
    if (bookingRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const booking = bookingRes.rows[0];
    const now = new Date();

  
    if (loggedInUser.role === "customer") {
      if (booking.customer_id !== loggedInUser.id) {
        return res.status(403).json({ success: false, message: "You cannot cancel this booking" });
      }
      if (status !== "cancelled") {
        return res.status(400).json({ success: false, message: "Customers can only cancel bookings" });
      }
      if (new Date(booking.rent_start_date) <= now) {
        return res.status(400).json({ success: false, message: "Cannot cancel after start date" });
      }
    }

    if (loggedInUser.role === "admin" && status !== "returned") {
      return res.status(400).json({ success: false, message: "Admin can only mark bookings as returned" });
    }

   
    const updatedBooking = await updateBookingService(status, bookingId);

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: updatedBooking,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
      errors: error.message,
    });
  }
};

export const bookingController={
    createBooking,getBooking,updateBooking
}