
import express, { Request, Response } from 'express'
import config from './config'
import { initdb, pool } from './config/db'
import { authRoutes } from './modules/auth/auth.routes'
import { vehicleRoute, } from './modules/Vehicles/vehicle.routes'
import { userRoute } from './modules/users/user.routes'
import { bookingRouter } from './modules/bookings/booking.routes'



 export const {port}=config

export const app = express()

app.use(express.json())

initdb()

app.get('/', (req:Request, res:Response) => {
  res.send('Welcome to the CarVantage! A Modern Platform For Car Rental System')
})





   app.use('/api/v1/auth',authRoutes)

   app.use('/api/v1',vehicleRoute)

   app.use('/api/v1',userRoute)

   app.use('/api/v1',bookingRouter)


