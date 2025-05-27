import { Box, Typography } from "@mui/material"

const Fruit = ({ fruit, fruitCount }) => {
    return (
        <Box
            component="img"
            src={fruit}
            sx={{
                position: "relative"
            }}
        >
            <Typography sx={{
                position: "absolute"
            }}>{fruitCount}</Typography>
        </Box>
    )
}