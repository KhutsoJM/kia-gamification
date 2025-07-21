import { Box } from "@mui/material";

export default function Basket({ basketImg }) {
    return (
        <Box
            width="96px"
            height="auto"
        >
            <img
                src={basketImg}
                alt="Animal's basket"
                style={{
                    width: "100%",
                    height: "auto"
                }}
            />
        </Box>
    )
}