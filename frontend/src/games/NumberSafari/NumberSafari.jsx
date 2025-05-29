import { AnimatePresence, motion } from 'framer-motion';
import { DndContext, closestCenter, PointerSensor, useSensors, useSensor } from '@dnd-kit/core';

import { useState } from 'react'


// MUI
import { Box } from '@mui/material'


// COMPONENTS
import SafariScene from './components/SafariScene'
import Crate from './components/Crates'
import Fruit from './components/Fruit'


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
import crateBlue from '../../assets/numberSafari/crates/crate-blue.png';
import crateYellow from '../../assets/numberSafari/crates/crate-yellow.png';
import cratePink from '../../assets/numberSafari/crates/crate-pink.png';
import crateGreen from '../../assets/numberSafari/crates/crate-green.png';
import { spring } from 'framer-motion'


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

// CRATES
const crates = [{
  id: 1,
  crateSrc: cratePink,
  fruitSrc: raspberry,
  fruitName: 'raspberry',
}, {
  id: 2,
  crateSrc: crateGreen,
  fruitSrc: apple,
  fruitName: 'apple',
}, {
  id: 3,
  crateSrc: crateYellow,
  fruitSrc: orange,
  fruitName: 'orange',
}
]


const NumberSafari = () => {
  const [counts, setCounts] = useState({ raspberry: 3, apple: 2, orange: 1 });
  const [collected, setCollected] = useState({ raspberry: 0, apple: 0, orange: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (over && over.id === active.data.current.fruit) {
      // successful drop
      setCounts(c => ({ ...c, [active.data.current.fruit]: c[active.data.current.fruit] - 1 }))
      setCollected(c => ({ ...c, [active.data.current.fruit]: c[active.data.current.fruit] + 1 }))
    }
    // else: automatically resets position
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div>
        <SafariScene>
          <Box sx={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            display: "flex",
          }}>
            <Box sx={{
              position: "absolute",
              bottom: "18px",
              right: "25px",
              display: "flex",
              marginInline: "28px",
              gap: "36px"
            }}
            >
              {crates.map((crate, index) => (
                <motion.div
                  key={crate.id}
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 4 + index * 0.5,
                    type: spring,
                    stiffness: 120,
                  }}
                >
                  <Crate
                    crateSrc={crate.crateSrc}
                    fruitSrc={crate.fruitSrc}
                    fruitName={crate.fruitName}
                  />
                </motion.div>
              ))}
            </Box>
          </Box>
        </SafariScene>
      </div>
    </DndContext>
  )
}

export default NumberSafari