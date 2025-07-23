import { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { easeIn, motion } from "framer-motion";

export default function Basket({ basketImg, basketRef, isDragging, dropFeedback }) {

    const getGlowColor = () => {
        if (dropFeedback === "correct") return "drop-shadow(0 0 8px rgba(0,255,0,0.8))";
        if (dropFeedback === "incorrect") return "drop-shadow(0 0 8px rgba(255, 0, 0, 0.8))";
        if (isDragging) return "drop-shadow(0 0 6px rgba(255,255,0,0.6))";
        return "none";
    };


    const pulseAnimation = isDragging
        ? {
            // scale: [1, 1.05, 1],
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
            },
        }
        : {};

    const shakeAnimation =
        dropFeedback === "incorrect"
            ? {
                scale: [1, 1.1, 1],
                x: [0, -10, 10, -6, 6, -2, 2, 0],
                rotate: [0, -5, 5, -3, 3, -1, 1, 0],
                transition: { duration: 0.5 },
            }
            : {};

    return (
        <Box
            ref={basketRef}
            width="96px"
            height="auto"
            position="relative"
            display="flex"
            alignItems="end"
            justifyContent="center"
        >

            <motion.img
                key={dropFeedback}
                src={basketImg}
                alt="Animal's basket"
                style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                    transition: "0.2s ease-out",
                    filter: getGlowColor(),
                }}
                animate={{ ...pulseAnimation, ...shakeAnimation }}
                transition={{ duration: 0.5 }}
            />

            {/* <img
                src={basketImg}
                alt="Animal's basket"
                style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                    transition: "0.2s ease-out",
                    filter: getGlowColor(),
                }}
            /> */}
        </Box>
    )
}