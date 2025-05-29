import { Box, IconButton } from "@mui/material"
import { Add, Remove } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { motion } from 'framer-motion'



const Crate = ({ fruitSrc, crateSrc, fruitName }) => {

    const [fruitCount, setFruitCount] = useState(0);


    const updateFruitCount = (change) => {
        change === "increase" ?
            setFruitCount(prev => prev + 1) :
            setFruitCount(prev => Math.max(0, prev - 1))
    }

    return (
        <Box
            display="flex"
            alignItems="center"
        >
            <IconButton sx={{ color: "black", marginTop: "28px" }} onClick={() => updateFruitCount("decrease")}>
                <Remove />
            </IconButton>
            <Box sx={{
                position: "relative",
                width: "128px",
            }}>
                {/* Crate */}
                <Box
                    component="img"
                    src={crateSrc}
                    alt="Crate"
                    sx={{
                        width: "100%",
                        display: "block",
                        pointerEvents: 'none',
                    }}
                />

                {/* Fruit icon */}
                <Box
                    component="img"
                    src={fruitSrc}
                    alt={fruitName}
                    sx={{
                        position: "absolute",
                        top: "60%",
                        left: "50%",
                        width: "48px",
                        transform: "translate(-50%, -50%)",
                        cursor: "pointer",
                    }}
                />

                {/* Fruit count */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        fontSize: 14,
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        userSelect: 'none',
                        pointerEvents: 'none',
                    }}
                >
                    {fruitCount}
                </Box>
            </Box>
            <IconButton sx={{ color: "black", marginTop: "28px" }} onClick={() => updateFruitCount("increase")}>
                <Add />
            </IconButton>
        </Box>
    )
}

export default Crate