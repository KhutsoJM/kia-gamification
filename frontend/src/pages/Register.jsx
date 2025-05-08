import { useState } from "react"
import { Box, Paper, TextField, Grid, Typography, Button, Checkbox } from "@mui/material"


const Register = () => {
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

    const handleSubmit = (e) => {

    }

    return (
        <Box p={4} sx={{
            display: "flex",
            height: "80vh",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Paper elevation={8} sx={{
                padding: 4,
                width: 470,
                height: 620,
            }}>

                <Typography variant="h5" gutterBottom>Create Your Account</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} p={2}>
                        <Grid size={6} mb={2}>
                            <TextField variant="outlined" name="firstName" label="Name" fullWidth value={data.firstName} onChange={handleChange}/>
                        </Grid>
                        <Grid size={6} mb={2}>
                            <TextField variant="outlined" name="lastName" label="Surname" fullWidth value={data.lastName} onChange={handleChange}/>
                        </Grid>
                        <Grid mb={2} size={12}>
                            <TextField variant="outlined" name="email" label="Email" fullWidth placeholder="example@email.com" value={data.email} onChange={handleChange}/>
                        </Grid>
                        <Grid mb={2} size={12}>
                            <TextField variant="outlined" name="password" label="Password" fullWidth type="password" value={data.password} onChange={handleChange}/>
                        </Grid>
                        <Grid mb={2} size={12}>
                            <TextField variant="outlined" name="confirmPassword" label="Confirm Password" fullWidth value={data.confirmPassword} onChange={handleChange}/>
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
                            <Typography>Already have an account? <a href="">Login here</a></Typography>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    )

}

export default Register