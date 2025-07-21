import { Box } from "@mui/material";


export default function Animal({ animalImg, animalType }) {
    return (
        <Box>
            <img
                src={animalImg}
                alt={animalType}
                style={{ width: "128px", height: "auto" }}
            />
        </Box>
    )
}