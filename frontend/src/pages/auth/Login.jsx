import axios from 'axios'
import { useState } from "react"
import { Box, Paper, TextField, Grid, Typography, Button, Divider } from "@mui/material"


const Login = () => {
    // STATE
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    // FUNCTIONS
    const handleChange = (e) => {
        const input = e.target.name
        const value = e.target.value

        setData(prevData => ({ ...prevData, [input]: value }))
    }

    const handleSubmit = async (e) => {
        
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

                <Typography variant="h5" gutterBottom>Login to Your Account</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} p={2}>
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
                            <TextField
                                variant="outlined"
                                name="password"
                                label="Password"
                                fullWidth
                                value={data.password}
                                onChange={handleChange}
                                type="password"
                            />
                        </Grid>
                        <Grid mb={1} size={12}>
                            <Button variant="outlined" fullWidth type="submit">Login</Button>
                        </Grid>
                        <Grid size={12}>
                            <Typography>Don't have an account? <a href="/register">Register here</a></Typography>
                        </Grid>
                    </Grid>
                </form>
                <Divider />
            </Paper>
        </Box>
    )

}

export default Login