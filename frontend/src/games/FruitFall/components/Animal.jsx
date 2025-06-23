import { Box } from "@mui/material";


const Animal = ({ animalImg, animalType }) => {
    return (
        <Box
            component="img"
            src={animalImg}
            alt={animalType}
            draggable={false}
            sx={{
                width: "clamp(60px, 10vw, 96px)",
                height: "auto",
                pointerEvents: "none",
                userSelect: "none",
            }}
        />
    )
}

export default Animal;
