"use client";
import {
  Button,
  Box,
  Typography,
  ThemeProvider,
  useTheme,
  Toolbar,
  Divider,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CustomTheme from "./components/Theme";
import CustomAppBar from "./components/CustomAppBar";
import { useAuth } from "@clerk/nextjs";
import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Home() {
  const theme = useTheme(); // Access theme using useTheme hook
  const router = useRouter();
  const { isSignedIn } = useAuth(); // Check if user is signed in

  const handleScanClick = () => {
    if (isSignedIn) {
      router.push("/scanner");
    } else {
      router.push("/sign-in"); // Redirect to sign-in page if not signed in
    }
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <CustomAppBar />
      <Toolbar /> {/* Add Toolbar to create space for the AppBar */}
      
      {/* Main Container with Background Image */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Ensure the container takes up at least the full height of the viewport
          backgroundImage: "url('/images/gradient2.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          paddingTop: '64px', // Adjust this value according to the height of your AppBar
        }}
      >
        <Box
          sx={{
            flexGrow: 1, // Expand this area to push the footer to the bottom
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom color={"black"}>
            <strong>Toxiscan</strong>
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom color="black">
            <strong>
              Your ultimate Guide to Healthy and Eco-Friendly Living
            </strong>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 10, mr: 2, borderRadius: 10 }}
            onClick={handleScanClick} // Use onClick to handle scanning
            size="large"
            style={{
              fontSize: "25px",
            }}
          >
            <strong>Start Scanning</strong>
          </Button>

          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            color="black"
            paddingTop={10}
          >
            <strong>Scan.Search.Know</strong>
          </Typography>
        </Box>

        <Divider sx={{ mt: 10 }} /> {/* Divider with top margin */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            backgroundColor: '#9fdf9c',
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            align="left"
          >
            © 2024 Toxiscan, all rights reserved
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2, // Add some space between icons
            }}
          >
            <IconButton
              color="primary"
              href="https://www.youtube.com/@Toxiscan"
              target="_blank"
              rel="noopener"
            >
              <FaYoutube size={24} />
            </IconButton>
            <IconButton
              color="primary"
              href="https://www.instagram.com/toxiscan4"
              target="_blank"
              rel="noopener"
            >
              <FaInstagram size={24} />
            </IconButton>
            <IconButton
              color="primary"
              href="https://www.tiktok.com/@toxiscan4"
              target="_blank"
              rel="noopener"
            >
              <FaTiktok size={24} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
