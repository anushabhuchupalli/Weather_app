import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
dotenv.config()
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors'



const app = express()
const corsOptions = {
  origin: ["http://localhost:3000"], 
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
};


app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())
app.use('/auth', userRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/authentication')

const PORT = 3001; // Default port 3000

app.listen(PORT, () => {
    console.log("Server is Running")
})
