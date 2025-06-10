import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    } = req.body

    try {
        // Check for existing user
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).json({ success: false, error: 'Email already in use' })
        }

        if (confirmPassword !== password) {
            return res.status(401).json({ success: false, error: 'Passwords must be matching' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })

        return res.status(201).json({ success: true, userDetails: user })
    } catch (e) {
        return res.status(500).json({ success: false, error: `Failed to register the user: ${e.message}` })
    }
}

export const login = async (req, res) => {
    const {
        email,
        password,
    } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' })
        }

        // Create JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        return res.status(200).json({
            success: true,
            token,
            userDetails: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        })
    } catch (e) {
        return res.status(500).json({ success: false, error: `Failed to log in the user: ${e.message}` })
    }
}