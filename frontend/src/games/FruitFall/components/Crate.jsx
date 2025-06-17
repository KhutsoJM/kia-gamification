import { Box, Typography } from "@mui/material";

const Crate = ({ crateImg, fruitImg, fruitType }) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "128px",
                height: "auto",
            }}
        >
            {/* Crate Image */}
            <Box
                component="img"
                src={crateImg}
                alt={`${fruitType}-crate`}
                sx={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: 'none',
                    display: "block",
                }}
            />

            {/* Fruit Image (visually sitting inside crate) */}
            <Box
                component="img"
                src={fruitImg}
                alt={fruitType}
                sx={{
                    position: "absolute",
                    top: "42%",
                    left: "40%",
                    width: "38px",
                    height: "38px",
                    pointerEvents: 'none',
                }}
            />
        </Box>
    )
}

export default Crate;
