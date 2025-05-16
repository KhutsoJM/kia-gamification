import { Box, Typography, Button } from '@mui/material';

const CompletionScreen = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="lightgreen">
            <Typography variant="h4">🎉 Safari Complete!</Typography>
            <Typography variant="h6" mt={2}>You matched all numbers correctly.</Typography>
            <Button variant="contained" sx={{ mt: 4 }}>Play Again</Button>
        </Box>
    );
}

export default CompletionScreen;