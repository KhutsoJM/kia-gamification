import { Box, Typography, Paper, Stack } from '@mui/material';
import partyPopper from '../assets/animations/party-popper.gif';

const CompletionScreen = ({ score, total, timeTaken }) => {

    return (
        <Box
            height="80vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            flexDirection="column"
            bgcolor="none"
            marginBlock={4}
            p={2}
            sx={{
                boxShadow: "10"
            }}
        >
            <Typography variant="h3" gutterBottom style={{ width: '100%' }} display="flex" justifyContent="center" alignItems="center">
                <img src={partyPopper} alt="" style={{ width: '100%', maxWidth: '150px', paddingBottom: "55px", overflow: "visible" }} /> Well Done! <img src={partyPopper} alt="" style={{ width: '100%', maxWidth: '150px', paddingBottom: "55px", overflow: "visible", transform: "scaleX(-1)" }} />
            </Typography>

            <Stack direction="row" spacing={3} mt={4} width="100%" display="flex" justifyContent="center">
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6">Total Time</Typography>
                    <Typography variant="body1">{Math.floor(timeTaken / 1000)} seconds</Typography>
                </Paper>

                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6">Score</Typography>
                    <Typography variant="body1">{score} / {total}</Typography>
                </Paper>
            </Stack>
        </Box>
    );
}

export default CompletionScreen;