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
  MenuItem,
  Button, // Import Button for pagination
  GlobalStyles,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useRouter } from "next/navigation";
import CustomTheme from "../components/Theme";
import CustomAppBar from "../components/CustomAppBar";
import { useEffect, useState, useCallback } from "react";
import { BorderColor, NoFood as NoFoodIcon } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash/debounce";
import ProductDisplay from "../components/ProductDisplay";

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Define the debounced API fetch function
  const fetchProductsDebounced = useCallback(
    debounce(async (search) => {
      try {
        const query = new URLSearchParams({
          tagtype_0: "countries",
          tag_contains_0: "contains",
          tag_0: country,
          sort_by: sortBy,
          page_size: "50",
          page: page.toString(),
          category: category,
          search: search,
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
    }, 600), // 500ms delay after the user stops typing
    [country, sortBy, category, page]
  );

  useEffect(() => {
    fetchProductsDebounced(searchTerm);
  }, [searchTerm, fetchProductsDebounced]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to the first page on new search
  };

  const handleScanClick = () => {
    router.push("/scanner");
  };
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null); // Clear the selected product
  };

  const filteredProducts = products;

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <ThemeProvider theme={CustomTheme}>
      {/* Global Styles to set the background color of the whole screen */}
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: "#9fdf9c",
            margin: 0,
            padding: 0,
          },
        }}
      />
      <CustomAppBar />
      <Toolbar />

      <Box
        sx={{
          padding: theme.spacing(2),
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
            marginTop: 5,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            maxWidth: 600, // Adjust maxWidth as needed
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search Products"
            onChange={handleSearch}
            sx={{
              width: "100%",
              maxWidth: 600, // Adjust maxWidth as needed
              bgcolor: "#c6ebc3",
            }}
          />
          <Tooltip title="Use Scanner" placement="right" arrow>
            <IconButton
              color="primary"
              onClick={handleScanClick}
              sx={{ mt: 2 }} // Margin top to create space between search bar and button
            >
              <FullscreenIcon sx={{ fontSize: 100 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search" placement="right" arrow>
            <IconButton
              color="primary"
              onClick={() => fetchProductsDebounced(searchTerm)} // Handle Search Glass click
              sx={{ ml: 1 }}
            >
              <SearchIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Dropdown Menus for Queries */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: theme.spacing(2),
            mb: 3,
            flexWrap: "wrap", // Allows dropdowns to wrap to the next line on smaller screens
          }}
        >
          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            displayEmpty
            variant="outlined"
            sx={{ minWidth: 200, maxWidth: 250, bgcolor: "#c6ebc3" }}
          >
            <MenuItem value="">Countries</MenuItem>
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

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            displayEmpty
            variant="outlined"
            sx={{ minWidth: 200, maxWidth: 250, bgcolor: "#c6ebc3" }}
          >
            <MenuItem value="">Sort By</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="nutriscore_score">Nutri Score</MenuItem>
            <MenuItem value="ecoscore_score">Eco Score</MenuItem>
          </Select>

          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            variant="outlined"
            sx={{ minWidth: 200, maxWidth: 250, bgcolor: "#c6ebc3" }}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="breads">Breads</MenuItem>
            <MenuItem value="breakfasts">Breakfasts</MenuItem>
            <MenuItem value="canned foods">Canned Foods</MenuItem>
            <MenuItem value="cereals">Cereals</MenuItem>
            <MenuItem value="cheeses">Cheeses</MenuItem>
            <MenuItem value="chips">Chips</MenuItem>
            <MenuItem value="chocolates">Chocolates</MenuItem>
            <MenuItem value="dairies">Dairies</MenuItem>
            <MenuItem value="frozen foods">Frozen Foods</MenuItem>
            <MenuItem value="groceries">Groceries</MenuItem>
            <MenuItem value="juice">Juice</MenuItem>
            <MenuItem value="meats">Meats</MenuItem>
            <MenuItem value="pastas">Pastas</MenuItem>
            <MenuItem value="plant-based-foods">Plant Based Foods</MenuItem>
            <MenuItem value="seafoods">Seafoods</MenuItem>
            <MenuItem value="snacks">Snacks</MenuItem>
          </Select>
        </Box>

        <Typography variant="h4" gutterBottom>
          Products
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: theme.spacing(3),
            padding: theme.spacing(2),
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <Box
                key={index}
                sx={{
                  width: { xs: "100%", sm: "45%", md: "30%", lg: "22%" },
                  mb: 3,
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={() => handleProductClick(product)}
              >
                <Paper
                  elevation={5}
                  sx={{
                    padding: 2,
                    textAlign: "center",
                    width: "100%",
                    borderRadius: 10,
                    "&:hover": {
                      border: "5px solid",
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  }}
                >
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

        {/* Pagination Controls*/}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={() => handlePageChange(1)} // Go to the first page
          >
            First Page
          </Button>
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            sx={{ mx: 2 }}
          >
            Previous
          </Button>
          <Typography variant="body1" sx={{ mx: 2 }}>
            Page {page}
          </Typography>
          <Button
            variant="contained"
            onClick={() => handlePageChange(page + 1)}
            sx={{ mx: 2 }}
          >
            Next
          </Button>
        </Box>

        {/* Scroll to Bottom Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <IconButton
            color="primary"
            onClick={scrollToBottom}
            sx={{ position: "fixed", bottom: 16, right: 16 }}
          >
            <ArrowDownwardIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>

        {/* Scroll to Top Button */}
        {showScrollUp && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <IconButton
              color="primary"
              onClick={scrollToTop}
              sx={{ position: "fixed", bottom: 80, right: 16 }}
            >
              <ArrowUpwardIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        )}
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        sx={{
          zIndex: 1200, // Ensure it's above the Go To Bar
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              backgroundColor: "#9fdf9c",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              maxWidth: "100%",
              maxHeight: "80%",
              transform: "translate(-50%, -50%)",
              position: "absolute",
              top: "50%",
              left: "50%",
              overflowY: "auto",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            {selectedProduct && (
              <Box sx={{ mt: -4 }}>
                <ProductDisplay productData={selectedProduct} />
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}
