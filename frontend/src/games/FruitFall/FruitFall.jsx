// REACT
import { useState, useRef } from "react";

// MUI
import { Box, Button, Typography, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";


// COMPONENTS
import FruitRow from "./components/FruitRow";
import Animal from "./components/Animal";
import Basket from "./components/Basket";


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

import basket from "../../assets/FruitFall/props/wooden-bucket.png";


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
                expression: "3",
            },
            {
                animalType: "parrot",
                animalImg: parrot,
                fruitType: "blueberry",
                fruitImg: blueberry,
                amount: 4,
                frustrationLimit: 3,
                expression: "5 - 1",
            },
            {
                animalType: "rabbit",
                animalImg: rabbit,
                fruitType: "apple",
                fruitImg: apple,
                amount: 1,
                frustrationLimit: 3,
                expression: "4 - 3",
            },
        ],
    }
]

const fruitData = [
    {
        img: apple,
        type: "apple",
    },
    {
        img: banana,
        type: "banana",
    },
    {
        img: blueberry,
        type: "blueberry",
    },
    {
        img: raspberry,
        type: "raspberry",
    }
]

export default function FruitFall() {

    const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
    const animalRequest = levelOneConfig[0].requestPool[currentAnimalIndex];

    const basketRef = useRef(null);

    const [isDraggingFruit, setIsDraggingFruit] = useState(false);
    const [dropFeedback, setDropFeedback] = useState("");

    const [fruitCounts, setFruitCount] = useState({
        apple: 0,
        banana: 0,
        blueberry: 0,
        cherry: 0,
        orange: 0,
        raspberry: 0,
        watermelon: 0,
        grape: 0,
    });

    const handleAdd = (fruitType) => {
        setFruitCount(prevCounts => ({
            ...prevCounts,
            [fruitType]: prevCounts[fruitType] + 1
        }))
    }

    const handleRemove = (fruitType) => {
        setFruitCount(prevCounts => ({
            ...prevCounts,
            [fruitType]: Math.max(prevCounts[fruitType] - 1, 0)
        }))
    }

    const handleDrop = (fruitRef, fruitType) => {
        if (!fruitRef.current || !basketRef.current) return;

        const fruitRect = fruitRef.current.getBoundingClientRect();
        const basketRect = basketRef.current.getBoundingClientRect();

        const isIntersecting =
            fruitRect.left < basketRect.right &&
            fruitRect.right > basketRect.left &&
            fruitRect.top < basketRect.bottom &&
            fruitRect.bottom > basketRect.top;

        if (isIntersecting) {
            const expectedFruit = animalRequest.fruitType;
            const correctAmount = eval(animalRequest.expression);

            if (fruitType === expectedFruit) {
                console.log("correct fruit!")
            } else {
                console.log("incorrect fruit!");
            }

            if (fruitCounts[fruitType] === correctAmount) {
                console.log("correct amount!")
                setDropFeedback("correct");
                setTimeout(() => {
                    setDropFeedback(""); // reset after a short delay
                }, 500);
                handleNextRequest();
            } else {
                console.log("incorrect amount!");
                setDropFeedback("incorrect");
                setTimeout(() => {
                    setDropFeedback(""); // reset after a short delay
                }, 500);
            }
        } else {
            console.log("not intersecting!")
        }
    }

    const handleNextRequest = () => {
        setCurrentAnimalIndex(prev => (prev + 1) % levelOneConfig[0].requestPool.length);
    }


    return (
        <Box
            minHeight="100vh"
            minWidth="100vw"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                background: "linear-gradient(to right, #2d6a4f, #1b4332)",
            }}
        >

            {/* Animal and Fruit Row */}
            <Box
                display="flex"
                flexDirection="column"
                gap={5}
            >
                {/* Animal and Basket */}
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="end"
                    gap={1}
                    maxHeight="140px"
                >
                    {/* Animal */}
                    <Animal
                        animalImg={animalRequest.animalImg}
                        animalType={animalRequest.animalType}
                    />

                    {/* Basket */}
                    <Basket
                        basketImg={basket}
                        basketRef={basketRef}
                        isDragging={isDraggingFruit}
                        dropFeedback={dropFeedback}
                    />
                </Box>

                {/* Fruit Row: Displays all the fruits */}
                <FruitRow
                    fruits={fruitData}
                    fruitCounts={fruitCounts}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                    handleDrop={handleDrop}
                    setIsDraggingFruit={setIsDraggingFruit}
                />
            </Box>

            <Button
                variant="contained"
                sx={{ mt: 4 }}
                onClick={() => {
                    const submittedAmount = fruitCounts[animalRequest.fruitType];
                    const correctAmount = eval(animalRequest.expression);

                    if (submittedAmount === correctAmount) {
                        alert("✅ Correct!");
                        // Reset state and move to next animal
                        setFruitCount(prev => ({ ...prev, [animalRequest.fruitType]: 0 }));
                        setCurrentAnimalIndex(prev => (prev + 1) % levelOneConfig[0].requestPool.length);
                    } else {
                        alert("❌ Incorrect. Try again!");
                    }
                }}
            >
                Submit
            </Button>
        </Box>
    )
}
