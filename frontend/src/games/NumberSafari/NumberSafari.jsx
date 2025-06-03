import { AnimatePresence, motion } from 'framer-motion'
import { DndContext, closestCenter, PointerSensor, useSensors, useSensor } from '@dnd-kit/core'

import { useState } from 'react'


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
import bananas from '../../assets/numberSafari/fruits/normal/bananas.png'
import blueberry from '../../assets/numberSafari/fruits/normal/blueberry.png'
import cherries from '../../assets/numberSafari/fruits/normal/cherries.png'
import orange from '../../assets/numberSafari/fruits/normal/orange.png'
import raspberry from '../../assets/numberSafari/fruits/normal/raspberry.png'
import watermelon from '../../assets/numberSafari/fruits/normal/watermelon.png'

// crates



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
    amount: 3,
  },
]



const NumberSafari = () => {
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
  const currentRequest = requests[currentRequestIndex];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleCorrectDrop = () => {
    if (currentRequestIndex < requests.length - 1) {
      setCurrentRequestIndex(index => index + 1)
    } else {
      console.log("Game Over!");
    }
  }

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (!over) return

    const draggedFruit = active.data?.current?.fruitType;
    const droppedTargetId = over.id;

    if (draggedFruit === currentRequest.fruitType && droppedTargetId === 'basket') {
      handleCorrectDrop();
    }
  }


  return (
    <div>
      <SafariScene>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <AnimalRequest
            animaltype={currentRequest.animalType}
            fruitSrc={currentRequest.fruitImg}
            fruitType={currentRequest.fruitType}
            animalSrc={currentRequest.animalImg}
            amount={currentRequest.amount}
            onCorrectDrop={handleCorrectDrop}
          />
          <CrateRow targetFruitType={currentRequest.fruitType} />
        </DndContext>
      </SafariScene>
    </div>
  )
}

export default NumberSafari