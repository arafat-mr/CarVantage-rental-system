import { pool } from "../../config/db";

const createBookingService = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleRes = await pool.query(
    `
        SELECT daily_rent_price,availability_status FROM vehicles WHERE id=$1
        
        `,
    [vehicle_id]
  );

  if (vehicleRes.rows.length === 0) {
    throw new Error("Vehicle not found");
  }
  if (vehicleRes.rows[0].availability_status !== "available") {
    throw new Error(
      "Vehicle is already booked .Please wait till  available again"
    );
  }
  const pricePerDay = vehicleRes.rows[0].daily_rent_price;

  const startDate = new Date(rent_start_date as string);

  const endDate = new Date(rent_end_date as string);

  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (totalDays <= 0) {
    throw new Error("End date must be after start date");
  }

  const total_price = pricePerDay * totalDays;

  const status = "active"; //default

  const result = await pool.query(
    `
        
        INSERT INTO bookings(
        
        customer_id,vehicle_id,rent_start_date,rent_end_date ,total_price,status
        
        ) VALUES($1,$2,$3,$4,$5,$6) RETURNING *
        
        
        `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );

  await pool.query(
    `
    UPDATE vehicles 
    SET availability_status = 'booked' 
    WHERE id=$1
  `,
    [vehicle_id]
  );

  const bookingWithVehicle = await pool.query(
    `SELECT b.*, v.vehicle_name, v.daily_rent_price
     FROM bookings b
     JOIN vehicles v ON b.vehicle_id = v.id
     WHERE b.id = $1`,
    [result.rows[0].id]
  );

  const bookingRow = bookingWithVehicle.rows[0];

  return {
    id: bookingRow.id,
    customer_id: bookingRow.customer_id,
    vehicle_id: bookingRow.vehicle_id,
    rent_start_date: bookingRow.rent_start_date,
    rent_end_date: bookingRow.rent_end_date,
    total_price: bookingRow.total_price,
    status: bookingRow.status,
    vehicle: {
      vehicle_name: bookingRow.vehicle_name,
      daily_rent_price: bookingRow.daily_rent_price,
    },
  };
};


const getBookingService=async(customerId?: string)=>{

   if(customerId){
     const customerResult= await pool.query(`
        
      SELECT * FROM bookings WHERE customer_id=$1
      
      `,[customerId])
        return customerResult
   }

 const result= await pool.query(`
    
    SELECT * FROM bookings
    `)

    return result

}


const updateBookingService=async(status:string,bookingId:string)=>{

  const result = await pool.query(`
    UPDATE bookings SET

    status =$1 WHERE id=$2
    RETURNING *
    
    `,[status,bookingId])
     
       
 if (result.rows.length === 0) {
    throw new Error('Booking not found');
  }

  const updatedBooking = result.rows[0];


  const now= new Date()

  
    if (status === "cancelled" && new Date(updatedBooking.rent_start_date) <= now) {
    throw new Error("Cannot cancel booking after start date");
  }


  if (status === 'returned') {
    
    await pool.query(
      `UPDATE vehicles 
       SET availability_status = 'available'
       WHERE id = $1`,
      [updatedBooking.vehicle_id]
    );
  } else if (status === 'cancelled') {
    
    await pool.query(
      `UPDATE vehicles 
       SET availability_status = 'available'
       WHERE id = $1`,
      [updatedBooking.vehicle_id]
    );

    const autoReturnResult = await pool.query(
    `UPDATE bookings
     SET status = 'returned'
     WHERE status = 'active' AND rent_end_date < $1
     RETURNING *`,
    [now]
  );

  for (const booking of autoReturnResult.rows) {
    await pool.query(
      `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
      [booking.vehicle_id]
    );
  }

  }

  return updatedBooking;

}

export const bookingServices = {
  createBookingService,getBookingService,updateBookingService
};
