// PACKAGES
import express from "express";
import mongoose from "mongoose";

const app = express()

// MIDDLEWARE
app.use(express.json())

const PORT = 3000


app.post('/register', (req, res) => {
    console.log(`User Registered: ${req.body}`)
    return res.json({ success: true, 'userDetails': req.body })
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})