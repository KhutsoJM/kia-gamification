import { Box, LinearProgress } from "@mui/material";

const ProgressBar = ({ progress, maxProgress }) => {
    return (
        <Box mb={4}>
            <LinearProgress
                variant="determinate"
                color="success"
                value={(progress / maxProgress) * 100}
                sx={{ height: 10, borderRadius: 5, }}
            />
        </Box>
    )
}

export default ProgressBar;