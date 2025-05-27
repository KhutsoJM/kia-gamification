import { Box } from '@mui/material'
import { motion } from 'framer-motion'


// ASSETS
// environment
import safariBg from '../../../assets/numberSafari/environment/background/safari-background.jpg'
import shrub from '../../../assets/numberSafari/environment/trees/shrub-1.png'

import basket from '../../../assets/numberSafari/wooden-bucket.png'

// animals
import giraffe from '../../../assets/numberSafari/animals/Round/giraffe.png'

// fruits
import raspberry from '../../../assets/numberSafari/fruits/normal/raspberry.png'



const SafariScene = ({ children }) => {
    return (
        <Box sx={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundImage: `url(${safariBg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            {/* Intro Shrubs */}
            <motion.img
                src={shrub}
                alt="Shrub"
                style={{
                    filter: 'brightness(0) saturate(100%)',
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-100px',
                    width: '500px',
                    height: 'auto',
                    zIndex: "100"
                }}

                initial={{ x: 0 }}
                animate={{ x: '-100%' }}
                transition={{ delay: 1.5, duration: 1 }}
            // style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 5 }}
            />
            <motion.img
                src={shrub}
                alt="Shrub"
                style={{
                    filter: 'brightness(0) saturate(100%)',
                    position: 'absolute',
                    bottom: '-20px',
                    right: '-100px',
                    width: '500px',
                    height: 'auto',
                    transform: "scaleX(-1)",
                    zIndex: "100"
                }}

                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                transition={{ delay: 1.3, duration: 1 }}
            // style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 5 }}
            />

            {/* First animal */}
            <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.5, duration: 1, type: 'spring', bounce: 0.4 }}
                style={{ display: 'flex', alignItems: 'end', gap: '16px', position: 'absolute', bottom: '10%', left: '10%' }}
            >
                <img src={giraffe} style={{ height: '100px', }} />
                <img src={basket} style={{ height: '90px', }} />
            </motion.div>

            {/* Speech bubble */}
            <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 3.5, duration: 0.5 }}
                style={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '15%',
                    background: 'white',
                    borderRadius: '16px',
                    padding: '8px 20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    zIndex: 10,
                }}
            >
                <p>
                    Can I have 3 <img src={raspberry} alt='Raspberry' style={{ width: '32px' }} />, please?
                </p>
            </motion.div>
            {children}
        </Box>
    )
}

export default SafariScene