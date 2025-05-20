// PACKAGES
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";

// ROUTERS
import authRoutes from "./routes/auth.js";

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())

dotenv.config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI


// Routes
app.use('/users/auth', authRoutes)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
    mongoose.connect(MONGO_URI)
        .then(() => console.log('conncected to the database'))
        .catch((e) => console.log(`ERROR: ${MONGO_URI}`))
})