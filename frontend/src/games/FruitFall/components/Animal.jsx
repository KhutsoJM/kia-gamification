import { Box } from "@mui/material";


export default function Animal({ animalImg, animalType }) {
    return (
        <Box
            width="128px"
            height="128px"
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
        // overflow="hidden"
        >
            <img
                key={animalImg} // 🔑 helps Framer track image changes
                src={animalImg}
                alt={animalType}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                }}
            />
        </Box>
    )
}