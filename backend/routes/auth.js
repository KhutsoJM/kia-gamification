import express from "express";
import authMiddleware from "../middleware.js";

import {
    register,
    login,
} from '../controllers/auth.js'

const router = express.Router();


router.post('/register', authMiddleware, register)

router.post('/login', login)

export default router
