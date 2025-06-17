import { Box } from "@mui/material";


const Animal = ({ animalImg, animalType }) => {
    return (
        <Box
            sx={{
                width: "96px",
                height: "auto",
                pointerEvents: "none",
            }}
            component="img"
            src={animalImg}
            alt={animalType}
        />
    )
}

export default Animal;
