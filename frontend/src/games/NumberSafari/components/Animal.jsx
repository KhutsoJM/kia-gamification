
import { Box } from "@mui/material"
import { motion } from "framer-motion"

const Animal = ({ animal, fruit, basket, fruitCount, delay = 0 }) => {
    return (
        <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2.5, duration: 1, type: 'spring', bounce: 0.4 }}
            style={{ display: 'flex', alignItems: 'end', gap: '16px', position: 'absolute', bottom: '10%', left: '10%' }}
        >
            <img src={animal} style={{ height: '100px', }} />
            <img src={basket} style={{ height: '90px', }} />
        </motion.div>
    )
}

export default Animal