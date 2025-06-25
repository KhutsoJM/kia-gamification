// HOOKS
import { useRef, useEffect } from "react";

// FRAMER MOTION
import { motion } from "framer-motion";

// MUI
import { Box, Typography, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

// SOUNDS
import popSfx from "../../../assets/FruitFall/sounds/pop-2.mp3";


const Crate = ({ crateImg, fruitImg, fruitType, fruitCount, onIncrement, onDecrement, setDraggedFruit, setPointerPosition, setIsDragging }) => {

    const fruitRef = useRef();
    const pickSound = useRef();

    useEffect(() => {
        pickSound.current = new Howl({
            src: [popSfx],
            volume: 0.4,
            preload: true,
            rate: 2,
        });
    })

    return (
        <Box
            sx={{
                position: "relative",
                width: {
                    xs: '64px',  // <600px screen
                    sm: '84px',  // >=600px
                    md: '128px',  // >=900px
                },
                height: "auto",
                userSelect: "none",
            }}
        >
            {/* Crate Image */}
            <Box
                component="img"
                src={crateImg}
                alt={`${fruitType}-crate`}
                sx={{
                    width: "100%",
                    height: "auto",
                    pointerEvents: 'none',
                }}
            />

            {fruitCount > 0 && (
                <motion.img
                    ref={fruitRef}
                    src={fruitImg}
                    alt={fruitType}
                    drag
                    dragSnapToOrigin
                    whileTap={{ scale: 1.2 }}
                    onTapStart={() => {
                        pickSound.current?.play();
                    }}
                    onDrag={(e, info) => {
                        const { x, y } = info.point;
                        setPointerPosition({ x, y });
                        setDraggedFruit({
                            fruitType,
                            fruitImg,
                            fruitRef,
                            fruitCount,
                        });
                    }}
                    onDragStart={(e) => {
                        setIsDragging(true);
                    }}
                    onDragEnd={() => {
                        setIsDragging(false);
                    }}
                    style={{
                        position: "absolute",
                        top: "38%",
                        left: "38%",
                        width: "36px",
                        height: "auto",
                        opacity: 1,
                        zIndex: 20,
                    }}
                />
            )}

            <img
                src={fruitImg}
                alt={fruitType}
                style={{
                    position: "absolute",
                    top: "38%",
                    left: "38%",
                    width: "36px",
                    height: "auto",
                    opacity: 0.3,
                    zIndex: 1,
                    pointerEvents: "none",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    bgcolor: "rgba(255,255,255,0.8)",
                    borderRadius: "12px",
                    opacity: 0.8,
                    px: 0.5,
                }}
            >
                <IconButton
                    onClick={onDecrement}
                    size="small"
                    sx={{ p: 0.5 }}
                >
                    <Remove fontSize="inherit" />
                </IconButton>

                <Typography variant="caption" fontWeight="bold">
                    {fruitCount}
                </Typography>

                <IconButton
                    onClick={onIncrement}
                    size="small"
                    sx={{ p: 0.5 }}
                >
                    <Add fontSize="inherit" />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Crate;
