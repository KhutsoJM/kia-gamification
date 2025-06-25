// HOOKS
import { useEffect, useRef } from "react";

// FRAMER MOTION
import { motion } from "framer-motion";

// HOWLER
import { Howl } from "howler";

// MUI
import { Box } from "@mui/material";

// SOUNDS
import crateDropSfx from "../../../assets/FruitFall/sounds/drop-1.mp3";
import drop2Sfx from "../../../assets/FruitFall/sounds/drop-2.mp3";

// COMPONENTS
import Crate from "./Crate";


const CrateRow = ({ crates, fruitCounts, handleIncrement, handleDecrement, setDraggedFruit, setPointerPosition, setIsDragging }) => {

    const crateDropSound = useRef();
    const crateDelay = 0.7;

    useEffect(() => {
        crateDropSound.current = new Howl({
            src: [drop2Sfx],
            volume: 0.5,
            preload: true,
        });
    }, []);

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
            {crates.map((crate, index) => {

                const dropSoundDelay = (index * crateDelay - 0.14) * 1000;

                useEffect(() => {
                    const timer = setTimeout(() => {
                        crateDropSound.current?.play();
                    }, dropSoundDelay);
                    return () => clearTimeout(timer);
                }, []);

                return (
                    <motion.div
                        key={crate.fruitType}
                        alt={`${crate.fruitType} crate`}
                        initial={{ y: -300, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{
                            delay: index * crateDelay,
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
                )
            })}
        </Box>
    )
}

export default CrateRow;
