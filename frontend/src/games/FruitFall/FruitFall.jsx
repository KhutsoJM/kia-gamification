import { useState } from "react";

// MUI
import { Box } from "@mui/material";

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


const levelOneConfig = [
    {
        name: "Level 1",
        background: "background.png",
        requestPool: [
            {
                animaltype: "giraffe",
                animalImg: giraffe,
                fruitType: "raspberry",
                fruitImg: raspberry,
                amount: 3,
                frustrationLimit: 3,
            },
            {
                animaltype: "parrot",
                animalImg: parrot,
                fruitType: "cherry",
                fruitImg: cherry,
                amount: 2,
                frustrationLimit: 3,
                expression: "5 - 2"
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
    const level = levelOneConfig[0];
    const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
    const [animalsLost, setAnimalsLost] = useState(0);
    const [fruitCounts, setFruitCounts] = useState({
        blueberry: 0,
        raspberry: 0,
        apple: 0,
    });

    const currentRequest = level.requestPool[currentRequestIndex];

    const handleDrop = (fruitType, amount) => {
        // handles fruit drop
        if (fruitType === currentRequest.fruitType && amount === currentRequest.amount) {
            // right
            console.log('correct!')
        } else {
            // wrong, show feedback, frustration, etc
            console.log('incorrect')
        }
    }

    const increment = (fruitType) => {
        setFruitCounts(prev => ({
            ...prev,
            [fruitType]: Math.max(0, prev[fruitType] + 1)
        }))
    }

    const decrement = (fruitType) => {
         setFruitCounts(prev => ({
            ...prev,
            [fruitType]: Math.max(0, prev[fruitType] - 1)
        }))
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
            <AnimalRequest request={currentRequest} />
            <Basket
                expectedFruit={currentRequest.fruitType}
                expectedAmount={currentRequest.amount}
                onDrop={handleDrop}
            />
            <CrateRow crates={level.cratesData} />
        </Box>
    )
}

export default FruitFall;