import { Box } from "@mui/material";
import { motion } from "framer-motion";

// COMPONENTS
import Crate from "./Crate";

const CrateRow = ({ crates, fruitCounts, handleIncrement, handleDecrement, setDraggedFruit }) => {
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
                    />
                </motion.div>
            ))}
        </Box>
    )
}

export default CrateRow;
