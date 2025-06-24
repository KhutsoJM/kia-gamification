import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

import basket from '../../../assets/FruitFall/props/wooden-bucket.png';


const Basket = ({ expectedFruit, expectedAmount, draggedFruit, onDrop, pointerPosition, isDragging }) => {
    const basketRef = useRef();
    const [isHovering, setIsHovering] = useState(false);
    const [isCorrectDrop, setIsCorrectDrop] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);


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
            isCorrect ? setIsCorrectDrop(true) : setIsCorrectDrop(false);

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
        <Box
            component="img"
            src={basket}
            ref={basketRef}
            alt="basket"
            // onDrop={handleDropLogic}
            onDragOver={(e) => e.preventDefault()}
            draggable={false}
            sx={{
                width: "clamp(60px, 10vw, 96px)",
                height: "auto",
                pointerEvents: "auto",
                userSelect: "none",
                transition: "filter 0.6s ease",
                // filter: isHovering && "drop-shadow(0 0 8px rgba(170, 208, 175, 0.8))",
                filter:
                    isHovering ?
                        "drop-shadow(0 0 16px rgba(170, 208, 175, 0.8))"
                        : showFeedback ?
                            isCorrectDrop ?
                                "drop-shadow(0 0 16px rgba(35, 178, 58, 0.8))"
                                : "drop-shadow(0 0 16px rgba(181, 49, 49, 0.8))"
                            : null
            }}
        />
    )
}

export default Basket;