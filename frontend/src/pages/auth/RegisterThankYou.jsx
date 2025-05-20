import { Typography, Box, Button } from "@mui/material"
import confetti from '../../assets/animations/confetti.gif'

const RegisterThankYou = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{
                backgroundImage: `url(${confetti})`,
                backgroundSize: "cover"
            }}
        >
            <Typography variant="h4">Thank You for Registering!</Typography>
        </Box>
    )
}

export default RegisterThankYou;
