import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { motion, scale } from 'framer-motion';
import { Howl } from "howler";

import { Box, IconButton } from "@mui/material"
import { Add, Remove } from "@mui/icons-material";

// sounds
import click from '../../../assets/numberSafari/sounds/click.wav'
import emptyClick from '../../../assets/numberSafari/sounds/click-2.mp3'


const Crate = ({ fruitSrc, crateSrc, fruitType, handleDrop }) => {

    const [fruitCount, setFruitCount] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const clickSound = new Howl({ src: [click] })
    const emptyClickSound = new Howl({ src: [emptyClick] })

    // const clickSound = useRef(new Audio(click))


    const updateFruitCount = (change) => {
        change === "increase" ?
            setFruitCount(prev => prev + 1) :
            setFruitCount(prev => Math.max(0, prev - 1))

        fruitCount === 0 && change === "decrease" ? emptyClickSound.play() : clickSound.play();
        
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

                {/* Copy of the fruit icon */}
                <img
                    src={fruitSrc}
                    alt={fruitType}
                    style={{
                        position: "absolute",
                        top: "45%",
                        left: "40%",
                        width: "32px",
                        height: "32px",
                        zIndex: 0,
                        pointerEvents: 'none',
                        opacity: isDragging ? 0.4 : 1,
                        transition: ' opacity 1.25s',
                    }}
                />

                {/* Fruit icon */}
                <motion.img
                    drag
                    dragSnapToOrigin
                    dragMomentum={false}
                    whileDrag={{ scale: 1.25 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    data-fruittype={fruitType}

                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onDragEnd={(e) => {
                        const droppedFruitType = e.target.dataset.fruittype
                        const droppedFruitCount = fruitCount

                        // get the position and size of the fruit when dropped
                        const fruitRect = e.target.getBoundingClientRect()

                        handleDrop({ droppedFruitType, droppedFruitCount, fruitRect })
                    }}

                    src={fruitSrc}
                    alt={fruitType}
                    style={{
                        position: "absolute",
                        top: "45%",
                        left: "40%",
                        width: "32px",
                        height: "auto",
                        opacity: isDragging ? 0.95 : 1,
                        transition: "transform 0.05s ease",
                        zIndex: 10,
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
            <IconButton
                sx={{
                    color: "black",
                    marginTop: "28px"
                }}
                onClick={() => updateFruitCount("increase")}>
                <Add />
            </IconButton>
        </Box >
    )
}

export default Crate