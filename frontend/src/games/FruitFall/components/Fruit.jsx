
import { motion } from "framer-motion"
import { useState, useRef } from "react";

import { Box, IconButton, Typography } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";

export default function Fruit({ fruitImg, fruitType = "fruit", onAdd, onRemove, count = 2 }) {

    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Box
            padding={0.5}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={0.4}
        >
            <IconButton onClick={() => onRemove(fruitType)} color="secondary">
                <Remove />
            </IconButton>

            {/* Fruit Image and Count */}
            <Box
                position="relative"
                width="36px"
                height="36px"
            >
                <img
                    src={fruitImg}
                    alt={fruitType}
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        opacity: 0.6,
                        pointerEvents: "none",
                    }}
                />

                {(count > 0 || isDragging) &&
                    <motion.img
                        src={fruitImg}
                        alt={fruitType}
                        drag
                        dragSnapToOrigin
                        whileTap={{ scale: 1.2 }}
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileDrag={{
                            rotate: [0, 10, -10, 0]
                        }}
                        onHoverStart={() => setIsHovering(true)}
                        onHoverEnd={() => setIsHovering(false)}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => {
                            setIsDragging(false);
                            setIsHovering(false);
                        }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 5,
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            opacity: isDragging ? 1 : 0.8,
                            filter: (isDragging || isHovering) ?
                                "drop-shadow(0px 4px 8px rgba(59, 198, 44, 0.8))"
                                : "none",
                            transition: "filter 0.2s ease, transform 0.15s ease-out",
                        }}
                    />}

                {count > 0 && (
                    <Box
                        position="absolute"
                        bottom={-6}
                        right={-6}
                        width={20}
                        height={20}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bgcolor="blue"
                        color="white"
                        fontSize="0.75rem"
                        borderRadius="50%"
                        zIndex={10}
                    >
                        <Typography variant="subtitle2" color="white">
                            {count}
                        </Typography>
                    </Box>
                )}
            </Box>

            <IconButton onClick={() => onAdd(fruitType)} color="primary">
                <Add />
            </IconButton>

        </Box>
    )
}