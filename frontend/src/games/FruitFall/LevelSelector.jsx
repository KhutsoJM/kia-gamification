
import { Paper, Box, Grid } from "@mui/material";


export default function LevelSelector() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                minWidth: "100vw",
                overflowX: "auto",       // ✅ Enable horizontal scrolling
                overflowY: "hidden",
                display: "block",        // ✅ Don't use flex here
                px: 2,                   // Optional horizontal padding

            }}
        >
            <Grid
                container
                direction="row"
                spacing={2}
                wrap="nowrap"           // ✅ Keep it in one line
                sx={{
                    width: "max-content", // ✅ Let it expand horizontally
                    py: 4,                // Optional vertical padding
                }}
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <Grid key={index} item>
                        <Paper

                            sx={{
                                width: "300px",
                                height: "400px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                boxShadow: 1,
                                transition: "0.4s ease-out",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            Level {index + 1}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}