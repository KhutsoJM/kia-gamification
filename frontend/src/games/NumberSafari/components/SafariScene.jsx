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
                transition={{ delay: 1.75, duration: 1 }}
            />
            {children}
        </Box>
    )
}

export default SafariScene