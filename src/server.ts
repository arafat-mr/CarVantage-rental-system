// const express = require('express')
import express, { Request, Response } from 'express'
const app = express()
const port = 3000
app.use(express.json())
app.get('/', (req:Request, res:Response) => {
  res.send('Welcome to the CarVantage! A Modern Platform For Car Rental System')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
