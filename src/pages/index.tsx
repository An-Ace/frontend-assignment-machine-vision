import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Auth } from "@/components/Auth/Auth";

export default function Home() {
    return (
        <Box
            sx={{
                my: 4,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="h4" component="h1" sx={{mb: 2}}>
                <Auth/>
            </Typography>
        </Box>
    );
} 
