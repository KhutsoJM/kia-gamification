import User from "../models/User.js"

export const register = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body

    try {
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
        })

        return res.status(200).json({ success: true, 'userDetails': user })
    } catch (e) {
        return res.status(500).json({ success: false, error: "failed to register the user" })
    }
}

export const login = async (req, res) => {
    const {
        email,
        password,
    } = req.body

    try {
        const user = await User.findOne({ email })

        return res.status(200).json({ success: true, 'userDetails': user })
    } catch (e) {
        return res.status(500).json({ success: false, error: "failed to find the user" })
    }
}