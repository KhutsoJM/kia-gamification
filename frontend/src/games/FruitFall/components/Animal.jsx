import { motion } from "framer-motion"
import { Box } from "@mui/material";


export default function Animal({ animalImg, animalType }) {
    return (
        <Box
            width="128px"
            height="128px"
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
            overflow="hidden"
        >
            <motion.img
                key={animalImg} // 🔑 helps Framer track image changes
                src={animalImg}
                alt={animalType}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                }}
            />
        </Box>
    )
}