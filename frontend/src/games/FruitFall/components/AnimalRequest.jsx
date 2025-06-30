// REACT
import { useRef, useEffect } from "react";

// FRAMER MOTION
import { motion } from "framer-motion";

// MUI
import { Box, Typography } from "@mui/material";

// HOWLER
import { Howl } from "howler";

// COMPONENTS
import Animal from "./Animal";
import Basket from "./Basket";

// SOUNDS
import speechBubbleSfx from "../../../assets/FruitFall/sounds/pop-2.mp3";


const AnimalRequest = ({ request, draggedFruit, handleDrop, pointerPosition, isDragging, phase, setPhase, frustrationCount }) => {

    const {
        animalImg,
        animalType,
        fruitImg,
        fruitType,
        amount,
        expression,
        sound,
    } = request;

    const speechBubbleSound = useRef();
    const animalSound = useRef();

    useEffect(() => {
        speechBubbleSound.current = new Howl({
            src: [speechBubbleSfx],
            volume: 0.5,
            preload: true,
        });
    }, []);

    useEffect(() => {
        animalSound.current = new Howl({
            src: [sound],
            volume: 1,
            rate: 1,
            preload: true,
        });
    }, []);


    return (
        <>
            {/* Animal + Basket container */}
            <motion.div
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={phase === "animalEntering" ?
                    { delay: 2.5, duration: 1, type: "spring", bounce: 0.3 }
                    : { delay: 2.5, duration: 1.5, type: "spring", bounce: 0.3 }
                }
                exit={{ x: -500 }}
                onAnimationComplete={() => {
                    setPhase("bubbleExiting");
                    phase === "bubbleExiting" && setPhase("bubbleEntering");
                    console.log(phase)
                    animalSound.current?.play();
                }}
                style={{
                    position: "absolute",
                    bottom: "5%",
                    left: "5%",
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "16px",
                }}
            >
                <Animal animalImg={animalImg} animalType={animalType} frustrationCount={frustrationCount} />
                <Basket
                    expectedFruit={fruitType}
                    expectedAmount={amount}
                    draggedFruit={draggedFruit}
                    onDrop={handleDrop}
                    pointerPosition={pointerPosition}
                    isDragging={isDragging}
                />
            </motion.div>
            {/* Speech bubble */}
            <motion.div
                initial={{ scale: 0, rotate: -60 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={
                    phase === "bubbleEntering" ?
                        { delay: 4.4, duration: 0.4 }
                        : { delay: 3, duration: 0.3 }
                }
                exit={{ scale: 0, rotate: -30 }}
                onAnimationComplete={() => {
                    setPhase("animalEntering");
                    speechBubbleSound.current?.play();
                }}
                style={{
                    position: "absolute",
                    bottom: "20%",
                    left: "10%",
                    background: "white",
                    borderRadius: "24px",
                    padding: "21px 42px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    zIndex: 10,
                }}
            >
                <Typography variant="body1">{expression}</Typography>
                <Box
                    component="img"
                    src={fruitImg}
                    alt={fruitType}
                    sx={{ width: 24, height: 24 }}
                />
            </motion.div>
        </>
    );
};

export default AnimalRequest;
