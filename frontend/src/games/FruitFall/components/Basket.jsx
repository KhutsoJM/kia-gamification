import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

import basket from '../../../assets/FruitFall/props/wooden-bucket.png';


const Basket = ({ expectedFruit, expectedAmount, draggedFruit, onDrop }) => {

    const basketRef = useRef();

    useEffect(() => {
        if (!draggedFruit || !draggedFruit.fruitRect) return;

        const basketRect = basketRef.current?.getBoundingClientRect();
        const fruitRect = draggedFruit.fruitRect;

        const intersects =
            fruitRect.right > basketRect.left &&
            fruitRect.left < basketRect.right &&
            fruitRect.bottom > basketRect.top &&
            fruitRect.top < basketRect.bottom;

        if (intersects) {
            onDrop(draggedFruit.fruitType, draggedFruit.fruitCount);
        }
    }, [draggedFruit]);

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
                "&:hover": {
                    filter: "drop-shadow(0 0 8px rgba(100, 255, 121, 0.8))",
                },
            }}
        />
    )
}

export default Basket;