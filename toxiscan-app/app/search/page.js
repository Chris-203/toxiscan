"use client";
import {
    Button,
    Box,
    Typography,
    Tooltip,
    ThemeProvider,
    useTheme,
    Toolbar,
    Stack,
    Paper,
    TextField,
    IconButton, // Import IconButton component
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen"; // Correctly import the FullscreenIcon
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomTheme from "../components/Theme";
import CustomAppBar from "../components/CustomAppBar";
import { useEffect, useState } from "react";
import { NoFood as NoFoodIcon } from "@mui/icons-material";

export default function Home() {
    const theme = useTheme();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        router.push("/scanner")
       
    };

    const filteredProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                {/* Search Bar with Icon Button */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        marginTop: 5,
                        marginLeft: 10,
                    }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Search Products"
                        value={searchTerm}
                        onChange={handleSearch}
                        sx={{ width: "100%", maxWidth: 400 }}
                    />
                  <Tooltip title="Use Scanner" placement="right" arrow >
                    <IconButton
                        color="primary"
                        onClick={handleSearchClick}
                        sx={{ ml: 1 }} // Add some margin to the left of the button
                    >
                        <FullscreenIcon sx={{ fontSize: 100 }} />
                    </IconButton>
                  </Tooltip>
                </Box>

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
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: { xs: '100%', sm: '45%', md: '30%', lg: '22%' },
                                    mb: 3,
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
                                        <NoFoodIcon style={{ fontSize: 200 }} />
                                    )}
                                    <Typography variant="h6" gutterBottom>
                                        {product.product_name || "Unknown Product"}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))
                    ) : (
                        <Typography>No products found.</Typography>
                    )}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
