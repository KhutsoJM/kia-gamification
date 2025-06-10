import { motion } from 'framer-motion'
import Basket from './Basket'

const AnimalRequest = ({ animalType, animalSrc, fruitType, fruitSrc, amount, onCorrectDrop, isFirst }) => {
    // const entranceDelay = isFirst ? 2.8 : 0.6

    return (
        <>
            {/* Animated Animal + Basket */}
            <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.8, duration: 1, type: 'spring', bounce: 0.3 }}
                exit={{ x: -200, opacity: 0 }} // smooth exit
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '10%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '16px',
                }}
            >
                <img src={animalSrc} alt={animalType} style={{ height: '90px', width: 'auto' }} />
                <Basket acceptType={fruitType} />
            </motion.div>

            {/* Animated Speech Bubble */}
            <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 6.25, duration: 0.5 }}
                exit={{ scale: 0, opacity: 0 }} // smooth exit
                style={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '15%',
                    background: 'white',
                    borderRadius: '16px',
                    padding: '8px 16px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    zIndex: 10,
                }}
            >
                <p style={{
                    padding: '8px 0px'
                }}>
                    {amount}
                    <img src={fruitSrc} alt={fruitType} style={{
                        width: '21px',
                        height: 'auto',
                        verticalAlign: 'middle',
                        marginInline: '6px'
                    }} />
                </p>
            </motion.div>
        </>
    )
}

export default AnimalRequest