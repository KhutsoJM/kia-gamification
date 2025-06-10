import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion'
import { Howl } from 'howler'


import Crate from "./Crate";

// ASSETS
// fruits
import apple from '../../../assets/numberSafari/fruits/normal/apple.png'
import banana from '../../../assets/numberSafari/fruits/normal/banana.png'
import blueberry from '../../../assets/numberSafari/fruits/normal/blueberry.png'
import cherry from '../../../assets/numberSafari/fruits/normal/cherry.png'
import orange from '../../../assets/numberSafari/fruits/normal/orange.png'
import raspberry from '../../../assets/numberSafari/fruits/normal/raspberry.png'
import watermelon from '../../../assets/numberSafari/fruits/normal/watermelon.png'
import grape from '../../../assets/numberSafari/fruits/normal/grape.png'

// crates
import crateBlue from '../../../assets/numberSafari/crates/crate-blue.png'
import crateYellow from '../../../assets/numberSafari/crates/crate-yellow.png'
import cratePink from '../../../assets/numberSafari/crates/crate-pink.png'
import crateGreen from '../../../assets/numberSafari/crates/crate-green.png'

// sounds
// import crateDrop from '../../../assets/numberSafari/sounds/crate-drop.mp3'
import crateDrop from '../../../assets/numberSafari/sounds/thump-2.mp3'


const cratesData = [
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

const CrateRow = ({ fruitCounts, onIncrement, onDecrement, requestFruitType, handleDrop }) => {

    // const 

    useEffect(() => {
        const delays = [4.4, 4.9, 5.4]
        cratesData.forEach((_, index) => {
            const delay = delays[index]
            setTimeout(() => {
                const sound = new Audio(crateDrop)
                sound.volume = 0.3
                sound.play()
            }, delay * 1000)
        })
    }, [])


    return (
        <div style={{
            position: 'absolute',
            display: 'flex',
            gap: '24px',
            bottom: '3%',
            right: '5%',
        }}>
            {cratesData.map((crate, i) => (
                <motion.div
                    key={crate.fruitType}
                    initial={{ y: -100, opacity: 0, scale: 0.6 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}

                    transition={{
                        delay: 4.4 + i * 0.5,
                        duration: 0.8,
                        type: 'spring',
                        bounce: 0.3,
                    }}
                >
                    <Crate
                        // key={crate.fruitType}
                        fruitSrc={crate.fruitImg}
                        crateSrc={crate.crateImg}
                        fruitType={crate.fruitType}
                        handleDrop={handleDrop}
                        // count={0}
                        onIncrement={() => onIncrement(crate.fruitType)}
                        onDecrement={() => onDecrement(crate.fruitType)}
                        isActive={crate.fruitType === requestFruitType}
                    />
                </motion.div>
            ))}
        </div>
    )
}

export default CrateRow;