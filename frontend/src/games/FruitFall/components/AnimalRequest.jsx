// REACT
import { useState, useRef, useEffect } from "react";

// FRAMER MOTION
import { motion } from "framer-motion";

import SoundManager from "../../../../utils/soundManager";

// MUI
import { Box, Typography } from "@mui/material";

// COMPONENTS
import Animal from "./Animal";
import Basket from "./Basket";



const AnimalRequest = ({ request, draggedFruit, handleDrop, pointerPosition, isDragging, animationStep, onNextAnimation, frustrationCount }) => {

    const {
        animalImg,
        animalType,
        fruitImg,
        fruitType,
        amount,
        expression,
        sound,
    } = request;

    const quickEntry = (animationStep.startsWith("QUICK_") || animationStep.includes("EXIT"))
    const animalEntry = quickEntry ? 0.5 : 2;
    const speechBubbleEntry = quickEntry ? 1 : 3.5;


    return (
        <>
            {/* Animal + Basket container */}
            {(animationStep?.includes("ANIMAL_") || animationStep?.includes("SPEECH_BUBBLE")) && (<motion.div
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                    delay: animalEntry,
                    duration: 1.2,
                    type: "spring",
                    bounce: 0.3,
                }}
                exit={{
                    x: -500,
                    transition: {
                        delay: 3,
                        duration: 1.2,
                        type: "spring",
                        bounce: 0.3,
                    }
                }}
                onAnimationComplete={() => {
                    if (animationStep === "ANIMAL_ENTRY" || animationStep === "QUICK_ANIMAL_ENTRY") {
                        onNextAnimation();
                        setTimeout(() => {
                            SoundManager.play("animals", request.sound);
                        }, 2500);
                    }
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
            </motion.div>)}
            {/* Speech bubble */}
            {(animationStep?.includes("SPEECH_BUBBLE") || animationStep?.includes("ANIMAL_")) && (<motion.div
                initial={{ scale: 0, rotate: -60 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: speechBubbleEntry, duration: 0.3 }}
                exit={{ scale: 0, rotate: -30 }}
                onAnimationComplete={() => {
                    onNextAnimation();
                    SoundManager.play("sfx", "pop");
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
            </motion.div>)}
        </>
    );
};

export default AnimalRequest;
