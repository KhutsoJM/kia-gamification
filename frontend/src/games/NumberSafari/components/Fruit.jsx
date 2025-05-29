import { Box, Typography } from "@mui/material"

const Fruit = ({ fruitSrc, fruitCount }) => {
    return (
        <Box
            component="img"
            src={fruitSrc}
            alt="Fruit"
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

export default Fruit