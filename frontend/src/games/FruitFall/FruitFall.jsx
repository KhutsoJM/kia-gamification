import { useState } from "react";

// MUI
import { Box } from "@mui/material";

// COMPONENTS
import AnimalRequest from "./components/AnimalRequest";
import Basket from "./components/Basket";
import CrateRow from "./components/CrateRow";


// ASSETS
// animals
import giraffe from "../../assets/numberSafari/animals/Round/giraffe.png";
import elephant from "../../assets/numberSafari/animals/Round/elephant.png";
import hippo from "../../assets/numberSafari/animals/Round/hippo.png";
import panda from "../../assets/numberSafari/animals/Round/panda.png";
import parrot from "../../assets/numberSafari/animals/Round/parrot.png";
import penguin from "../../assets/numberSafari/animals/Round/penguin.png";
import pig from "../../assets/numberSafari/animals/Round/pig.png";
import rabbit from "../../assets/numberSafari/animals/Round/rabbit.png";
import snake from "../../assets/numberSafari/animals/Round/snake.png";

// fruits
import apple from "../../assets/numberSafari/fruits/normal/apple.png";
import banana from "../../assets/numberSafari/fruits/normal/banana.png";
import blueberry from "../../assets/numberSafari/fruits/normal/blueberry.png";
import cherry from "../../assets/numberSafari/fruits/normal/cherry.png";
import orange from "../../assets/numberSafari/fruits/normal/orange.png";
import raspberry from "../../assets/numberSafari/fruits/normal/raspberry.png";
import watermelon from "../../assets/numberSafari/fruits/normal/watermelon.png";
import grape from "../../assets/numberSafari/fruits/normal/grape.png";



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
        ]
    }
]

const FruitFall = () => {

    const level = levelOneConfig[0];
    const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
    const [animalsLost, setAnimalsLost] = useState(0);

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
            <CrateRow />
        </Box>
    )
}

export default FruitFall;