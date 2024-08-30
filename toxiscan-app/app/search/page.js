"use client";
import {
    Button,
    Box,
    Typography,
    ThemeProvider,
    useTheme,
    Toolbar,
    Stack,
    Paper,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomTheme from "../components/Theme";
import CustomAppBar from "../components/CustomAppBar";
import { useEffect, useState } from "react";
import { NoFood as NoFoodIcon } from "@mui/icons-material"; // Import the NoFoodIcon

export default function Home() {
    const theme = useTheme();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <ThemeProvider theme={CustomTheme}>
            <CustomAppBar />
            <Toolbar />

            <Box
                sx={{
                    backgroundColor: "common.white",
                    padding: theme.spacing(2),
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Products by Nova Score
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: theme.spacing(3),
                        padding: theme.spacing(2),
                    }}
                >
                    {products.map((product, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: { xs: '100%', sm: '45%', md: '30%', lg: '22%' },
                                mb: 3, // Margin bottom for spacing between rows
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Paper elevation={3} sx={{ padding: 2, textAlign: "center", width: '100%' }}>
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={product.product_name || "Product Image"}
                                        width={200}
                                        height={200}
                                        style={{ objectFit: "contain" }}
                                    />
                                ) : (
                                    <NoFoodIcon style={{ fontSize: 200 }} /> // Display NoFoodIcon if no image
                                )}
                                <Typography variant="h6" gutterBottom>
                                    {product.product_name || "Unknown Product"}
                                </Typography>
                            </Paper>
                        </Box>
                    ))}
                </Box>
            </Box>
        </ThemeProvider>
    );
}