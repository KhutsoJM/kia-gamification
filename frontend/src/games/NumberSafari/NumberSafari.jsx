import { AnimatePresence, motion } from 'framer-motion'

import { useState } from 'react'
import './NumberSafari.css'


// MUI
import { Box } from '@mui/material'


// COMPONENTS
import SafariScene from './components/SafariScene'
import AnimalRequest from './components/AnimalRequest'
import CrateRow from './components/CrateRow'


// ASSETS
// animals
import giraffe from '../../assets/numberSafari/animals/Round/giraffe.png'
import elephant from '../../assets/numberSafari/animals/Round/elephant.png'
import hippo from '../../assets/numberSafari/animals/Round/hippo.png'
import panda from '../../assets/numberSafari/animals/Round/panda.png'
import parrot from '../../assets/numberSafari/animals/Round/parrot.png'
import penguin from '../../assets/numberSafari/animals/Round/penguin.png'
import pig from '../../assets/numberSafari/animals/Round/pig.png'
import rabbit from '../../assets/numberSafari/animals/Round/rabbit.png'
import snake from '../../assets/numberSafari/animals/Round/snake.png'

// fruits
import apple from '../../assets/numberSafari/fruits/normal/apple.png'
import banana from '../../assets/numberSafari/fruits/normal/banana.png'
import blueberry from '../../assets/numberSafari/fruits/normal/blueberry.png'
import cherry from '../../assets/numberSafari/fruits/normal/cherry.png'
import orange from '../../assets/numberSafari/fruits/normal/orange.png'
import raspberry from '../../assets/numberSafari/fruits/normal/raspberry.png'
import watermelon from '../../assets/numberSafari/fruits/normal/watermelon.png'
import grape from '../../assets/numberSafari/fruits/normal/grape.png'



// REQUESTS
const requests = [
  {
    animalType: 'giraffe',
    animalImg: giraffe,
    fruitType: 'raspberry',
    fruitImg: raspberry,
    amount: 3,
  },
  {
    animalType: 'parrot',
    animalImg: parrot,
    fruitType: 'blueberry',
    fruitImg: blueberry,
    amount: 4,
  },
  {
    animalType: 'pig',
    animalImg: pig,
    fruitType: 'apple',
    fruitImg: apple,
    amount: 6,
  },
]


const NumberSafari = () => {
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
  const currentRequest = requests[currentRequestIndex];

  const handleDrop = ({ droppedFruitType, droppedFruitCount, fruitRect }) => {
    for (const [type, basketRef] of Object.entries(window.baskets || {})) {
      if (!basketRef.current) continue;
      const basketRect = basketRef.current.getBoundingClientRect();

      const isOverlapping =
        fruitRect.left < basketRect.right &&
        fruitRect.right > basketRect.left &&
        fruitRect.top < basketRect.bottom &&
        fruitRect.bottom > basketRect.top;

      if (isOverlapping) {
        const triggerShake = window.basketTriggers?.[type];

        if (droppedFruitType === currentRequest.fruitType) {
          if (droppedFruitCount === currentRequest.amount) {
            console.log('thank you!')
            handleCorrectDrop()
          } else {
            console.log('not the right amount!')
            if (triggerShake) triggerShake();
          }
        } else {
          if (triggerShake) triggerShake();
        }
      }
    }
  }

  const handleCorrectDrop = () => {
    if (currentRequestIndex < requests.length - 1) {
      setCurrentRequestIndex(index => index + 1)
    } else {
      console.log("Game Over!");
    }
  }

  return (
    <div>
      <SafariScene>
        <AnimalRequest
          animaltype={currentRequest.animalType}
          fruitSrc={currentRequest.fruitImg}
          fruitType={currentRequest.fruitType}
          animalSrc={currentRequest.animalImg}
          amount={currentRequest.amount}
        />
        <CrateRow targetFruitType={currentRequest.fruitType} handleDrop={handleDrop} />
      </SafariScene>
    </div>
  )
}

export default NumberSafari