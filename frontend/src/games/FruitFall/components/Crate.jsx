import { motion } from "framer-motion";
import { Box, Typography, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";


const Crate = ({ crateImg, fruitImg, fruitType, fruitCount, onIncrement, onDecrement, setDraggedFruit }) => {

    return (
        <Box
            sx={{
                position: "relative",
                width: "128px",
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
                    src={fruitImg}
                    alt={fruitType}
                    drag
                    dragSnapToOrigin
                    whileTap={{ scale: 1.2 }}
                    onDragStart={() => setDraggedFruit(null)}
                    onDragEnd={(e) => {
                        const fruitRect = e.target.getBoundingClientRect();
                        setDraggedFruit({
                            fruitType,
                            fruitImg,
                            fruitRect,
                            fruitCount,
                        });
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
                    disabled={fruitCount <= 0}
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
