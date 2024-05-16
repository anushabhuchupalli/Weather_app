import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
import userRoutes from "./routes/userRoutes.js";


const app = express()
app.use(express.json())
app.use(cors({
    origin: ["https://weather-app-vg6e.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', userRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/authentication')

const PORT = process.env.PORT || 3000; // Default port 3000

app.listen(PORT, () => {
    console.log("Server is Running")
})