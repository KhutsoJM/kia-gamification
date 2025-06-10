import axios from "axios"
import { useState } from "react"
import {
    Box,
    Paper,
    TextField,
    Grid,
    Typography,
    Button,
    Checkbox,
    FormControl,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    IconButton,
} from "@mui/material"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"

import { useNavigate } from 'react-router-dom'


const Register = () => {
    // STATE
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const navigate = useNavigate()

    // FUNCTIONS
    const handleChange = (e) => {
        const input = e.target.name
        const value = e.target.value

        setData(prevData => ({ ...prevData, [input]: value }))
    }

    const handleSubmit = async (e) => {
        // ADD FEATURE: Check if 'confirm password is correct'
        e.preventDefault()

        const response = await axios.post('http://localhost:3000/users/auth/register', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        }, {
            validateStatus: (status) => {
                return status >= 200 && status < 300 || status === 401 || status === 400;
            }
        });

        if (response.data.success) {
            navigate('/thanks')
        } else {
            console.log(`Error: ${response.data.error}`)
        }
    }

    const handleClickPasswordIcon = () => {
        setIsPasswordVisible(isVisible => !isVisible)
    }

    return (
        <Box p={4} sx={{
            display: "flex",
            maxHeight: "90vh",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Paper elevation={8} sx={{
                padding: 4,
                width: 470,
                height: 620,
            }}>

                <Typography variant="h5" gutterBottom>Create Your Account</Typography>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Grid container spacing={2} p={2}>
                        <Grid size={6} mb={2}>
                            <TextField
                                variant="outlined"
                                name="firstName"
                                label="Name"
                                fullWidth
                                value={data.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={6} mb={2}>
                            <TextField
                                variant="outlined"
                                name="lastName"
                                label="Surname"
                                fullWidth
                                value={data.lastName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid mb={2} size={12}>
                            <TextField
                                variant="outlined"
                                name="email"
                                label="Email"
                                fullWidth
                                placeholder="example@email.com"
                                value={data.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid mb={2} size={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    name="password"
                                    id="password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={data.password}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={
                                                    isPasswordVisible ? "hide the password" : "display the password"
                                                }
                                                onClick={handleClickPasswordIcon}
                                                edge="end"
                                            >
                                                {isPasswordVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid mb={2} size={12}>
                            <TextField
                                variant="outlined"
                                name="confirmPassword"
                                label="Confirm Password"
                                fullWidth
                                value={data.confirmPassword}
                                onChange={handleChange}
                                type="password"
                            />
                        </Grid>
                        <Grid mb={1} size={2}>
                            <Checkbox required />
                        </Grid>
                        <Grid mb={1} size={10}>
                            <Typography textAlign="left">I agree to the <a href="">Terms and Conditions</a> and <a href="">Privacy Policy</a></Typography>
                        </Grid>
                        <Grid mb={1} size={12}>
                            <Button variant="outlined" fullWidth type="submit">Register</Button>
                        </Grid>
                        <Grid size={12}>
                            <Typography>Already have an account? <a href="/login">Login here</a></Typography>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    )

}

export default Register