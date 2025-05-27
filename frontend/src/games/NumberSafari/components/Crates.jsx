import { Box, IconButton } from "@mui/material"
import { Add, Remove } from "@mui/icons-material";

import { useState } from "react";
import { motion } from 'framer-motion'



const Crate = ({ fruit, crate, fruitName }) => {

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
                {/* Crate image */}
                <Box
                    component="img"
                    src={crate}
                    alt="Crate"
                    sx={{
                        width: "100%",
                        display: "block",
                        pointerEvents: 'none',
                    }}
                />

                {/* Fruit image */}
                <Box
                    component="img"
                    src={fruit}
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
                {/* Drag */}
                {fruitCount > 0 && (
                    <motion.img
                        drag
                        dragSnapToOrigin
                        // dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
                        src={fruit}
                        alt={fruitName}
                        style={{
                            position: "absolute",
                            top: "60%",
                            left: "50%",
                            width: "64px",
                            transform: "translate(-50%, -50%)",
                            cursor: "grab",
                            zIndex: 10
                        }}
                    />
                )}

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