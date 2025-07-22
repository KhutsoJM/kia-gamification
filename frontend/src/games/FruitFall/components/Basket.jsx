import { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";

export default function Basket({ basketImg }) {

    return (
        <Box
            width="96px"
            height="auto"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                transition: "0.2s ease-out",
            }}
        >
            <img
                src={basketImg}
                alt="Animal's basket"
                style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                }}
            />
        </Box>
    )
}