// HOOKS
import { useState, useEffect, useRef } from "react";

// FRAMER MOTION
import { motion, useAnimation } from "framer-motion";

// HOWLER
import { Howl } from "howler";

// MUI
import { Box, Typography } from "@mui/material";

// ASSETS
import basket from '../../../assets/FruitFall/props/wooden-bucket.png';

// SOUNDS
import wrongFruitSfx from "../../../assets/FruitFall/sounds/bucket-3.mp3";



const Basket = ({ expectedFruit, expectedAmount, draggedFruit, onDrop, pointerPosition, isDragging }) => {
    const basketRef = useRef();
    const [isHovering, setIsHovering] = useState(false);
    const [isCorrectDrop, setIsCorrectDrop] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const controls = useAnimation();

    const wrongFruit = useRef();

    useEffect(() => {
        wrongFruit.current = new Howl({
            src: [wrongFruitSfx],
            volume: 0.8,
            preload: true,
            rate: 2,
        });
    }, []);

    useEffect(() => {
        if (!pointerPosition || !basketRef.current || !draggedFruit?.fruitRef?.current) {
            setIsHovering(false);
            return
        };

        const basketRect = basketRef.current?.getBoundingClientRect();
        const fruitRect = draggedFruit?.fruitRef?.current?.getBoundingClientRect();

        const { x, y } = pointerPosition;

        const pointerIntersects =
            x > basketRect.left &&
            x < basketRect.right &&
            y > basketRect.top &&
            y < basketRect.bottom;

        const intersects =
            fruitRect.right > basketRect.left &&
            fruitRect.left < basketRect.right &&
            fruitRect.bottom > basketRect.top &&
            fruitRect.top < basketRect.bottom;

        if (pointerIntersects && !isDragging) {
            console.log('dropped inside basket')

            const isCorrect = draggedFruit.fruitType === expectedFruit && draggedFruit.fruitCount === expectedAmount;
            isHovering && setIsHovering(false);

            // Glow
            setShowFeedback(true);
            if (isCorrect) {
                setIsCorrectDrop(true);
            } else {
                wrongFruit.current?.play();
                setIsCorrectDrop(false);
                controls.start({
                    x: [0, -10, 10, -6, 6, -2, 2, 0],
                    transition: { duration: 0.4 },
                });
            }

            setTimeout(() => {
                setShowFeedback(false)
                setIsCorrectDrop(false);
            }, 600);

            // setTimeout(() => { onDrop(draggedFruit.fruitType, draggedFruit.fruitCount) }, 1000);
            onDrop(draggedFruit.fruitType, draggedFruit.fruitCount)

        } else if (intersects) {
            !isHovering && setIsHovering(true);
        } else {
            isHovering && setIsHovering(false);
        }
    }, [pointerPosition, isDragging, draggedFruit]);


    return (
        <motion.div animate={controls}>
            <Box
                component="img"
                src={basket}
                ref={basketRef}
                alt="basket"
                // onDrop={handleDropLogic}
                onDragOver={(e) => e.preventDefault()}
                draggable={false}
                zIndex={50}
                sx={{
                    width: "clamp(60px, 10vw, 96px)",
                    height: "auto",
                    pointerEvents: "auto",
                    userSelect: "none",
                    transition: "filter 0.6s ease",
                    // filter: isHovering && "drop-shadow(0 0 8px rgba(170, 208, 175, 0.8))",
                    filter:
                        isHovering ?
                            "drop-shadow(0 0 16px rgba(170, 208, 175, 0.8))" :
                            showFeedback ?
                                isCorrectDrop ?
                                    "drop-shadow(0 0 16px rgba(35, 178, 58, 0.8))" :
                                    "drop-shadow(0 0 16px rgba(181, 49, 49, 0.8))"
                                : null
                }}
            />
        </motion.div>
    )
}

export default Basket;