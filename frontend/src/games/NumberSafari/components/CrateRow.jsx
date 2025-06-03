import { motion } from 'framer-motion'

import Crate from "./Crates";

// ASSETS
// fruits
import apple from '../../../assets/numberSafari/fruits/normal/apple.png'
import bananas from '../../../assets/numberSafari/fruits/normal/bananas.png'
import blueberry from '../../../assets/numberSafari/fruits/normal/blueberry.png'
import cherries from '../../../assets/numberSafari/fruits/normal/cherries.png'
import orange from '../../../assets/numberSafari/fruits/normal/orange.png'
import raspberry from '../../../assets/numberSafari/fruits/normal/raspberry.png'
import watermelon from '../../../assets/numberSafari/fruits/normal/watermelon.png'

// crates
import crateBlue from '../../../assets/numberSafari/crates/crate-blue.png'
import crateYellow from '../../../assets/numberSafari/crates/crate-yellow.png'
import cratePink from '../../../assets/numberSafari/crates/crate-pink.png'
import crateGreen from '../../../assets/numberSafari/crates/crate-green.png'

const CrateRow = ({ fruitCounts, onIncrement, onDecrement, requestFruitType }) => {
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
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        delay: 5 + i * 0.3,
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