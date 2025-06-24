// FRAMER MOTION
import { motion } from "framer-motion";

// MUI
import { Box } from "@mui/material";


// SOUNDS
import crateDrop from "../../../assets/FruitFall/sounds/drop-1.mp3";



// COMPONENTS
import Crate from "./Crate";

const CrateRow = ({ crates, fruitCounts, handleIncrement, handleDecrement, setDraggedFruit, setPointerPosition, setIsDragging }) => {
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: "3%",
                right: "5%",
                display: "flex",
                gap: "64px",
            }}
        >
            {crates.map((crate, index) => (
                <motion.div
                    key={crate.fruitType}
                    // src={crate.crateImg}
                    alt={`${crate.fruitType} crate`}
                    initial={{ y: -300, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                        delay: index * 0.7,
                        duration: 0.6,
                        type: "spring",
                        bounce: 0.4,
                    }}
                >
                    <Crate
                        crateImg={crate.crateImg}
                        fruitImg={crate.fruitImg}
                        fruitType={crate.fruitType}
                        fruitCount={fruitCounts[crate.fruitType] || 0}
                        onIncrement={() => handleIncrement(crate.fruitType)}
                        onDecrement={() => handleDecrement(crate.fruitType)}
                        setDraggedFruit={setDraggedFruit}
                        setPointerPosition={setPointerPosition}
                        setIsDragging={setIsDragging}
                    />
                </motion.div>
            ))}
        </Box>
    )
}

export default CrateRow;
