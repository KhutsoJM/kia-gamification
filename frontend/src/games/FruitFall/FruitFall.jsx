// HOOKS
import { useState, useEffect, useRef } from "react";

// FRAMER MOTION
import { motion, AnimatePresence } from "framer-motion";

// MUI
import { Box, Button, Typography } from "@mui/material";
import { Pause } from '@mui/icons-material';

const MotionButton = motion(Button);


// COMPONENTS
import AnimalRequest from "./components/AnimalRequest";
import Basket from "./components/Basket";
import CrateRow from "./components/CrateRow";
import Scene from "./components/Scene";


// ASSETS
// animals
import giraffe from "../../assets/FruitFall/animals/Round/giraffe.png";
import elephant from "../../assets/FruitFall/animals/Round/elephant.png";
import hippo from "../../assets/FruitFall/animals/Round/hippo.png";
import panda from "../../assets/FruitFall/animals/Round/panda.png";
import parrot from "../../assets/FruitFall/animals/Round/parrot.png";
import penguin from "../../assets/FruitFall/animals/Round/penguin.png";
import pig from "../../assets/FruitFall/animals/Round/pig.png";
import rabbit from "../../assets/FruitFall/animals/Round/rabbit.png";
import snake from "../../assets/FruitFall/animals/Round/snake.png";

// fruits
import apple from "../../assets/FruitFall/fruits/normal/apple.png";
import banana from "../../assets/FruitFall/fruits/normal/banana.png";
import blueberry from "../../assets/FruitFall/fruits/normal/blueberry.png";
import cherry from "../../assets/FruitFall/fruits/normal/cherry.png";
import orange from "../../assets/FruitFall/fruits/normal/orange.png";
import raspberry from "../../assets/FruitFall/fruits/normal/raspberry.png";
import watermelon from "../../assets/FruitFall/fruits/normal/watermelon.png";
import grape from "../../assets/FruitFall/fruits/normal/grape.png";

// crates
import crateBlue from '../../assets/FruitFall/crates/crate-blue.png';
import crateYellow from '../../assets/FruitFall/crates/crate-yellow.png';
import cratePink from '../../assets/FruitFall/crates/crate-pink.png';
import crateGreen from '../../assets/FruitFall/crates/crate-green.png';

// coins
import coinImg from "../../assets/FruitFall/props/coin.PNG";

// sounds
import SoundManager from "../../../utils/soundManager";


const levelOneConfig = [
    {
        name: "Level 1",
        background: "background.png",
        requestPool: [
            {
                animalType: "giraffe",
                animalImg: giraffe,
                fruitType: "raspberry",
                fruitImg: raspberry,
                amount: 3,
                frustrationLimit: 3,
                expression: "6 - 3",
                sound: "giraffeGrunt",
            },
            {
                animalType: "parrot",
                animalImg: parrot,
                fruitType: "blueberry",
                fruitImg: blueberry,
                amount: 4,
                frustrationLimit: 3,
                expression: "5 - 1",
                sound: "parrotSquawk",
            },
            {
                animalType: "rabbit",
                animalImg: rabbit,
                fruitType: "apple",
                fruitImg: apple,
                amount: 1,
                frustrationLimit: 3,
                expression: "4 - 3",
                sound: "parrotSquawk",
            },
        ],
        cratesData: [
            {
                fruitType: 'blueberry',
                crateImg: crateBlue,
                fruitImg: blueberry
            },
            {
                fruitType: 'raspberry',
                crateImg: cratePink,
                fruitImg: raspberry
            },
            {
                fruitType: 'apple',
                crateImg: crateGreen,
                fruitImg: apple
            },
        ]
    }
]

const ANIMATIONS = {
    CRATES_ENTRY: "CRATES_ENTRY",
    ANIMAL_ENTRY: "ANIMAL_ENTRY",
    QUICK_ANIMAL_ENTRY: "QUICK_ANIMAL_ENTRY",
    ANIMAL_EXIT: "ANIMAL_EXIT",
    SPEECH_BUBBLE_ENTRY: "SPEECH_BUBBLE_ENTRY",
    QUICK_SPEECH_BUBBLE_ENTRY: "QUICK_SPEECH_BUBBLE_ENTRY",
    QUICK_SPEECH_BUBBLE_EXIT: "SPEECH_BUBBLE_EXIT",
    NEXT_REQUEST: "NEXT_REQUEST",
}

const SEQUENCES = {
    INITIAL: [
        ANIMATIONS.CRATES_ENTRY,
        ANIMATIONS.ANIMAL_ENTRY,
        ANIMATIONS.SPEECH_BUBBLE_ENTRY,
    ],
    LOOP: [
        ANIMATIONS.QUICK_SPEECH_BUBBLE_EXIT,
        ANIMATIONS.ANIMAL_EXIT,
        ANIMATIONS.QUICK_SPEECH_BUBBLE_ENTRY,
        ANIMATIONS.QUICK_ANIMAL_ENTRY,
    ],
}


const FruitFall = () => {
    SoundManager.loadSounds();

    const level = levelOneConfig[0];
    const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
    const [animalsLost, setAnimalsLost] = useState([]);
    const [frustrationCount, setFrustrationCount] = useState(0);
    const [isLevelComplete, setIsLevelComplete] = useState(false);

    const [isPaused, setIsPaused] = useState(false);

    const [draggedFruit, setDraggedFruit] = useState({
        fruitType: '',
        fruitImg: '',
    });

    const [fruitCounts, setFruitCounts] = useState({
        blueberry: 0,
        raspberry: 0,
        apple: 0,
    });

    const [pointerPosition, setPointerPosition] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // ANIMATIONS
    const animationIndexRef = useRef(0);
    const [sequenceName, setSequenceName] = useState("INITIAL");
    const [animationStep, setAnimationStep] = useState(SEQUENCES.INITIAL[0]);

    useEffect(() => {
        console.log("ANIMATION STEP:", animationStep);
    }, [animationStep]);


    useEffect(() => {
        SoundManager.play("music", "bgMusic");
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsPaused(prev => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (frustrationCount >= currentRequest.frustrationLimit) {
            console.log("Animal left!");
            setAnimalsLost(prev => [...prev, currentRequest.animalType]);
            setFrustrationCount(0);

            if (currentRequestIndex < level.requestPool.length - 1) {
                handleNextRequest();
            } else {
                console.log("🎉 Level complete!");
            }
        }
    }, [frustrationCount]);

    const currentRequest = level.requestPool[currentRequestIndex];

    const handlePauseClick = () => {
        setIsPaused(paused => !paused);
        SoundManager.play("sfx", "pop");
    }

    const handleNextAnimationStep = () => {
        const currentSequence = SEQUENCES[sequenceName];

        animationIndexRef.current++;

        if (animationIndexRef.current < currentSequence.length) {
            console.log("next animation");
            setAnimationStep(currentSequence[animationIndexRef.current]);
        } else {
            if (sequenceName === "INITIAL") {
                console.log("changing to looping sequence animations");
                setSequenceName("LOOP");
                animationIndexRef.current = 0;
                setAnimationStep(SEQUENCES.LOOP[0]);
            } else {
                console.log("reseting loop");
                animationIndexRef.current = 0;
                setAnimationStep(SEQUENCES.LOOP[0]);
            }
        }
    }

    const handleDrop = (droppedFruitType, droppedAmount) => {
        console.log(`Fruit Dropped: ${droppedFruitType}, Amount: ${droppedAmount}`);

        const isCorrect = (
            droppedFruitType === currentRequest.fruitType &&
            droppedAmount === currentRequest.amount
        );

        if (isCorrect) {
            handleCorrectMatch(droppedFruitType);
        } else {
            handleIncorrectMatch(droppedFruitType);
        }
    }

    const handleCorrectMatch = (fruit) => {
        // Reset frustration count
        setFrustrationCount(0);

        // Reset count
        setFruitCounts(prev => ({
            ...prev,
            [fruit]: 0,
        }));

        // Move onto the next animal
        if (currentRequestIndex < level.requestPool.length - 1) {
            // setCurrentRequestIndex(prev => prev + 1);
            handleNextRequest();
        } else {
            console.log("🎉 Level complete!");
            setTimeout(() => {
                setIsLevelComplete(true);
            }, 2000);
            // TODO: Handle level completion (score, stars, etc)
        }
    }

    const handleIncorrectMatch = (fruit) => {
        // wrong, show feedback, frustration, etc
        setFrustrationCount(prev => {
            let newFrustrationCount = prev + 1;
            console.log(newFrustrationCount);

            if (newFrustrationCount === 1) console.log("Animal is annoyed 😒");
            else if (newFrustrationCount === 2) console.log("Animal is frustrated 💢");
            else if (newFrustrationCount === 3) console.log("Animal is angry! 😡")

            return newFrustrationCount;
        })
    }

    const updateFruitCount = (fruitType, delta) => {

        setFruitCounts(prev => {
            const newCount = Math.max(0, prev[fruitType] + delta);

            // Handle sound
            if (delta > 0) {
                SoundManager.play("sfx", "click");
            } else {
                SoundManager.play("sfx", newCount === 0 ? "emptyClick" : "click");
            }

            return {
                ...prev,
                [fruitType]: newCount
            };
        });
    }

    const handleNextRequest = () => {
        setTimeout(() => {
            setCurrentRequestIndex(prev => prev + 1);
        }, 500);
    }



    if (isLevelComplete) {
        return (
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.75)",
                    zIndex: 2000,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "white",
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    style={{ background: "#ffffff", color: "#333", padding: "36px", borderRadius: "16px", textAlign: "center" }}
                >
                    <Typography variant="h4" sx={{ mb: 2 }}>Level Complete!</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>You helped all the animals 🎉</Typography>
                    {/* Optional: stars, coins, etc */}
                    <Button variant="contained" onClick={() => window.location.reload()}>
                        Restart
                    </Button>
                </motion.div>
            </Box>
        )
    }


    return (
        <Box
            sx={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                background: "radial-gradient(circle, #a3b18a,  #588157, #3a5a40)",
                // backgroundImage: do this later
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Scene />
            {/* COIN IMAGE */}
            {/* <Box
                component="img"
                src={coinImg}
                alt="Coin"

                sx={{
                    position: "absolute",
                    top: "5%",
                    right: "5%",
                    width: "64px",
                    zIndex: 10,
                    pointerEvents: "none",
                }}
            /> */}
            <AnimatePresence>
                {isPaused && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                backgroundColor: 'white',
                                padding: '36px',
                                borderRadius: '16px',
                            }}
                        >
                            <Typography variant="h4">Game Paused</Typography>
                            <Button onClick={handlePauseClick} sx={{ mt: 1 }}>Resume</Button>
                            <Button sx={{ mt: 0.5 }}>Main Menu</Button>
                            <Button sx={{ mt: 0.5 }}>Settings</Button>
                            <Button sx={{ mt: 0.5 }}>Logout</Button>
                        </motion.div>
                    </Box>
                )}
            </AnimatePresence>

            <MotionButton
                onClick={handlePauseClick}
                variant="outlined"
                color="primary"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "5%",
                    right: "5%",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    padding: 0,
                    minWidth: 0,
                    zIndex: 100,
                }}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}  // use a smaller scale so it looks natural
                whileTap={{ scale: 0.95 }}    // add tap feedback
            >
                <Pause fontSize="large" />
            </MotionButton>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    gap: "32px",
                }}
            >
                <AnimatePresence mode="wait">
                    <AnimalRequest
                        key={currentRequestIndex}
                        request={currentRequest}
                        draggedFruit={draggedFruit}
                        handleDrop={handleDrop}
                        pointerPosition={pointerPosition}
                        isDragging={isDragging}
                        animationStep={animationStep}
                        frustrationCount={frustrationCount}
                        onNextAnimation={handleNextAnimationStep}
                    />
                </AnimatePresence>
            </Box>
            <CrateRow
                crates={level.cratesData}
                fruitCounts={fruitCounts}
                setDraggedFruit={setDraggedFruit}
                setPointerPosition={setPointerPosition}
                setIsDragging={setIsDragging}
                onUpdateFruitCount={updateFruitCount}
                onNextAnimation={handleNextAnimationStep}
            />
        </Box>
    )
}

export default FruitFall;
