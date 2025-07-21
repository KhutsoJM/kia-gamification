import { Box } from "@mui/material"
import Fruit from "./Fruit"

export default function FruitRow({ fruits, fruitCounts, onAdd, onRemove }) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            mt={4}
            sx={{
                padding: "64px 36px",
                backgroundColor: "#155d27",
                borderRadius: "36px"
            }}
        >
            {fruits.map(({ type, img }) => (
                <Fruit
                    key={type}
                    fruitImg={img}
                    fruitType={type}
                    count={fruitCounts[type] || 0}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
            ))}
        </Box>
    )
}