import { Box, Typography } from "@mui/material";

import basket from '../../../assets/FruitFall/props/wooden-bucket.png';


const Basket = ({ expectedFruit, expectedAmount, onDrop }) => {
    return (
        <Box
            sx={{
                width: 160,
                height: "auto",
                position: "relative",
            }}
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <Box
                component="img"
                src={basket}
                alt="basket"
                sx={{ width: "100%", height: "100%" }}
                draggable={false}
            />
        </Box>
    )
}

export default Basket;