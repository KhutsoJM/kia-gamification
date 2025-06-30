// HOOKS
import { useState, useEffect, useRef } from "react";

// FRAMER MOTION
import { AnimatePresence } from "framer-motion";

// MUI
import { Box } from "@mui/material";

// HOWLER
import { Howl } from "howler";

import clickSfx from '../../assets/FruitFall/sounds/click-1.wav';
import emptyClickSfx from "../../assets/FruitFall/sounds/click-2.mp3";


// COMPONENTS
import AnimalRequest from "./components/AnimalRequest";
import Basket from "./components/Basket";
import CrateRow from "./components/CrateRow";


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
import bgMusic from "../../assets/sounds/bg-music.mp3";
import birdSquawkSfx from "../../assets/FruitFall/sounds/animals/bird-squawk.mp3";

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
                sound: birdSquawkSfx,
            },
            {
                animalType: "parrot",
                animalImg: parrot,
                fruitType: "blueberry",
                fruitImg: blueberry,
                amount: 4,
                frustrationLimit: 3,
                expression: "5 - 1",
                sound: birdSquawkSfx,
            },
            {
                animalType: "rabbit",
                animalImg: rabbit,
                fruitType: "apple",
                fruitImg: apple,
                amount: 1,
                frustrationLimit: 3,
                expression: "4 - 3",
                sound: birdSquawkSfx,
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

const FruitFall = () => {
    SoundManager.loadSounds();
    
    const level = levelOneConfig[0];
    const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
    const [animalsLost, setAnimalsLost] = useState([]);
    const [frustrationCount, setFrustrationCount] = useState(0);

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

    const [phase, setPhase] = useState("bubbleEntering");

    // Sounds
    const clickSound = new Howl({
        src: [clickSfx],
        volume: 0.6,
    });

    const emptyClickSound = new Howl({
        src: [emptyClickSfx],
        volume: 0.6,
    });

    const bgMusicSound = useRef();

    useEffect(() => {
        bgMusicSound.current = new Howl({
            src: [bgMusic],
            volume: 1,
            preload: true,
            loop: true,
        });

        setTimeout(() => {
            bgMusicSound.current?.play();
        }, 300);

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


    const handleDrop = (droppedFruitType, droppedAmount) => {
        console.log(`Fruit Dropped: ${droppedFruitType}, Amount: ${droppedAmount}`);
        // handles fruit drop

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

    const handleIncrement = (fruitType) => {
        // clickSound.play();
        setFruitCounts(prev => ({
            ...prev,
            [fruitType]: Math.max(0, prev[fruitType] + 1)
        }))

        SoundManager.play("ui", 'click');
    }

    const handleDecrement = (fruitType) => {
        // fruitCounts[fruitType] === 0 ? emptyClickSound.play() : clickSound.play();
        setFruitCounts(prev => ({
            ...prev,
            [fruitType]: Math.max(0, prev[fruitType] - 1)
        }));

        SoundManager.play("ui", 'click');
    }

    const handleNextRequest = () => {
        setTimeout(() => {
            setCurrentRequestIndex(prev => prev + 1);
        }, 500);
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
            <Box
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
            />
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
                        phase={phase}
                        setPhase={setPhase}
                        frustrationCount={frustrationCount}
                    />
                </AnimatePresence>
            </Box>
            <CrateRow
                crates={level.cratesData}
                fruitCounts={fruitCounts}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                setDraggedFruit={setDraggedFruit}
                setPointerPosition={setPointerPosition}
                setIsDragging={setIsDragging}
            />
        </Box>
    )
}

export default FruitFall;
