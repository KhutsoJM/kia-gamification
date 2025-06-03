import { motion } from 'framer-motion'
import Basket from './Basket'
import { Box, Typography } from '@mui/material'

const AnimalRequest = ({ animalType, animalSrc, fruitType, fruitSrc, amount, onCorrectDrop }) => {
    return (
        <>
            {/* Animated Animal + Basket */}
            <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.8, duration: 1, type: 'spring', bounce: 0.3 }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '10%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '16px',
                }}
            >
                <img src={animalSrc} alt={animalType} style={{ height: '100px' }} />
                <Basket acceptType={fruitType} onDrop={onCorrectDrop} />
            </motion.div>

            {/* Animated Speech Bubble */}
            <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 4, duration: 0.5 }}
                style={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '15%',
                    background: 'white',
                    borderRadius: '16px',
                    padding: '8px 20px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    zIndex: 10,
                }}
            >
                <p>
                    Can I have {amount}
                    <img src={fruitSrc} alt={fruitType} style={{
                        width: '32px',
                        verticalAlign: 'middle',
                        paddingInline: '6px'
                    }} />, please?
                </p>
            </motion.div>
        </>
    )
}

export default AnimalRequest