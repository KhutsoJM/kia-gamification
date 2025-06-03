import { useEffect, useState } from "react";
import { motion, scale } from 'framer-motion';
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { Box, IconButton } from "@mui/material"
import { Add, Remove } from "@mui/icons-material";


const Crate = ({ fruitSrc, crateSrc, fruitType }) => {

    const [fruitCount, setFruitCount] = useState(0);
    // const [localTransform, setLocalTransform] = useState(null);


    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: fruitType,
        data: { fruitType },
    });

    // console.log(`Crate fruitType: ${fruitType}`);

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

            {/* Remove icon */}
            <IconButton sx={{ color: "black", marginTop: "28px" }} onClick={() => updateFruitCount("decrease")}>
                <Remove />
            </IconButton>
            <Box sx={{
                position: "relative",
                width: "128px",
                display: 'block'
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
                <motion.img
                    ref={setNodeRef}
                    {...listeners}
                    {...attributes}
                    src={fruitSrc}
                    alt={fruitType}
                    // animate={isDragging ? { scale: 1.25 } : { scale: 1 }}
                    style={{
                        position: "absolute",
                        top: "45%",
                        left: "40%",
                        width: "32px",
                        height: "32px",
                        transform: `${CSS.Translate.toString(transform)}`,
                        opacity: isDragging ? 0.8 : 1,
                        transition: "transform 0.05s ease",
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

            {/* Add icon */}
            <IconButton sx={{ color: "black", marginTop: "28px" }} onClick={() => updateFruitCount("increase")}>
                <Add />
            </IconButton>
        </Box >
    )
}

export default Crate