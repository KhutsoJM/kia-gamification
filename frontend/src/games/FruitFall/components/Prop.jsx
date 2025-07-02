
import { motion } from "framer-motion";
import { Box } from "@mui/material";

const Prop = ({ img, x, y, scale = 1, zIndex = 0 }) => {
    return (<Box
        component={motion.img}
        src={img}
        alt="Scene prop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
            position: "absolute",
            left: x,
            bottom: y,
            transform: `scale(${scale})`,
            zIndex,
            pointerEvents: "none",
            width: "auto",
            height: "auto"
        }}
    />)
}

export default Prop;
