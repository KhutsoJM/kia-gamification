import { Box } from "@mui/material";
import Fruit from "./Fruit";
import { motion } from "framer-motion";

export default function FruitRow({ fruits, fruitCounts, onAdd, onRemove, handleDrop, setIsDraggingFruit }) {

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            mt={4}
            sx={{
                padding: "36px 36px",
                backgroundColor: "#155d27",
                borderTop: "1px solid black",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"
                // borderRadius: "36px"
            }}
        >
            {fruits.map(({ type, img }, index) => (
                <motion.div
                    key={type}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.4 * index,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }}
                >
                    <Fruit
                        key={type}
                        fruitImg={img}
                        fruitType={type}
                        count={fruitCounts[type] || 0}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onDrop={handleDrop}
                        setIsDraggingFruit={setIsDraggingFruit}
                    />
                </motion.div>
            ))}
        </Box>
    )
}