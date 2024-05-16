import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
dotenv.config()
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors'



const app = express()
app.use(cors(
    {
        origin: ["https://deploy-mern-frontend-blue.vercel.app"],
        methods: ["POST", "GET","PUT","DELETE"],
        credentials: true
    }
));
app.use(express.json())
app.use(cookieParser())
app.use('/auth', userRoutes)
app.get("/",(req,res) => {
    res.json("hello");
});

mongoose.connect('mongodb://127.0.0.1:27017/authentication')

const PORT = process.env.PORT || 3001; // Default port 3000

app.listen(PORT, () => {
    console.log("Server is Running")
})
