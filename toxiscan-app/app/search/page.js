"use client";
import {
    Box,
    Typography,
    Tooltip,
    ThemeProvider,
    useTheme,
    Toolbar,
    Paper,
    TextField,
    IconButton,
    Select,
    MenuItem, // Import Select and MenuItem components
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
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
    const [country, setCountry] = useState("united states");
    const [sortBy, setSortBy] = useState("popularity");
    const [category, setCategory] = useState(""); // New state for category

    useEffect(() => {
        async function fetchProducts() {
            try {
                const query = new URLSearchParams({
                    tagtype_0: "countries",
                    tag_contains_0: "contains",
                    tag_0: country,
                    sort_by: sortBy,
                    page_size: "50",
                    category: category // Include category in the query
                }).toString();

                const response = await fetch(`/api/products?${query}`);
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
    }, [country, sortBy, category]); // Add category as a dependency

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        router.push("/scanner");
    };

    const filteredProducts = products.filter((product) =>
        product.product_name && product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
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
                {/* Search Bar with Custom Query Inputs */}
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
                            sx={{ ml: 1 }}
                        >
                            <FullscreenIcon sx={{ fontSize: 100 }} />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Dropdown Menus for Queries */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: theme.spacing(2),
                        mb: 3,
                    }}
                >
                    {/* Country Dropdown */}
                    <Select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem value="united states">United States</MenuItem>
                        <MenuItem value="united kingdom">United Kingdom</MenuItem>
                        <MenuItem value="bangladesh">Bangladesh</MenuItem>
                        <MenuItem value="brazil">Brazil</MenuItem>
                        <MenuItem value="canada">Canada</MenuItem>
                        <MenuItem value="china">China</MenuItem>
                        <MenuItem value="france">France</MenuItem>
                        <MenuItem value="germany">Germany</MenuItem>
                        <MenuItem value="india">India</MenuItem>
                        <MenuItem value="italy">Italy</MenuItem>
                        <MenuItem value="mexico">Mexico</MenuItem>
                        <MenuItem value="morocco">Morocco</MenuItem>
                        <MenuItem value="pakistan">Pakistan</MenuItem>
                        <MenuItem value="russia">Russia</MenuItem>
                        <MenuItem value="saudi arabia">Saudi Arabia</MenuItem>
                        <MenuItem value="south africa">South Africa</MenuItem>
                        <MenuItem value="spain">Spain</MenuItem>
                        <MenuItem value="turkey">Turkey</MenuItem>
                        
                        {/* Add more countries as needed */}
                    </Select>

                    {/* Sort By Dropdown */}
                    <Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem value="popularity">Popularity</MenuItem>
                        <MenuItem value="nutriscore_score">Nutri Score</MenuItem>
                        <MenuItem value="ecoscore_score">Eco Score</MenuItem>
                    </Select>

                    {/* Category Dropdown */}
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        <MenuItem value="breads">Breads</MenuItem>
                        <MenuItem value="canned foods">Canned Foods</MenuItem>
                        <MenuItem value="cereals">Cereals</MenuItem>
                        <MenuItem value="cheeses">Cheeses</MenuItem>
                        <MenuItem value="chips">Chips</MenuItem>
                        <MenuItem value="chocolates">Chocolates</MenuItem>
                        <MenuItem value="dairy">Dairy</MenuItem>
                        <MenuItem value="frozen foods">Frozen Foods</MenuItem>
                        <MenuItem value="juice">Juice</MenuItem>
                        <MenuItem value="meats">Meats</MenuItem>
                        <MenuItem value="pastas">Pastas</MenuItem>
                        <MenuItem value="plant-based foods">Plant Based Foods</MenuItem>
                        <MenuItem value="seafoods">Seafoods</MenuItem>
                        <MenuItem value="snacks">Snacks</MenuItem>
                    </Select>
                </Box>

                <Typography variant="h4" gutterBottom>
                    Products
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
