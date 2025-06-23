import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

// COMPONENTS
import Animal from "./Animal";
import Basket from "./Basket";


const AnimalRequest = ({ request, draggedFruit, handleDrop }) => {

    const {
        animalImg,
        animalType,
        fruitImg,
        fruitType,
        amount,
    } = request;

    return (
        <>
            {/* Animal + Basket container */}
            <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 1, type: "spring", bounce: 0.3 }}
                style={{
                    // position: "relative",
                    bottom: "10%",
                    left: "10%",
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "16px",
                }}
            >
                <Animal animalImg={animalImg} animalType={animalType} />
                <Basket
                    expectedFruit={fruitType}
                    expectedAmount={amount}
                    draggedFruit={draggedFruit}
                    onDrop={handleDrop}
                />
            </motion.div>

            {/* Speech bubble */}
            <motion.div
                initial={{ scale: 0, rotate: -60 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 3, duration: 0.4 }}
                style={{
                    position: "absolute",
                    bottom: "16%",
                    left: "12%",
                    background: "white",
                    borderRadius: "24px",
                    padding: "21px 16px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    zIndex: 10,
                }}
            >
                <Typography variant="body1">{amount}</Typography>
                <Box
                    component="img"
                    src={fruitImg}
                    alt={fruitType}
                    sx={{ width: 24, height: 24 }}
                />
            </motion.div>
        </>
    )
}

export default AnimalRequest;