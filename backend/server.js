// PACKAGES
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())

const PORT = 3000


app.post('/register', (req, res) => {
    console.log(`User Registered: ${req.body}`)
    return res.json({ success: true, 'userDetails': req.body })
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})