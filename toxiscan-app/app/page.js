'use client'
import { Button, Box, Typography, ThemeProvider, useTheme, Toolbar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomTheme from './components/Theme';
import CustomAppBar from './components/CustomAppBar';


export default function Home() {
    const theme = useTheme(); // Access theme using useTheme hook
    const router = useRouter();
    return (
      <ThemeProvider theme={CustomTheme}>
        <CustomAppBar />
        <Toolbar /> {/* Add Toolbar to create space for the AppBar */}
        <Box sx={{
          backgroundImage: "url('/images/greenbackground.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          minHeight: '100vh', // Changed from height to minHeight
          width: '100%',
          textAlign: "center",
          display: 'flex', // Added flexbox to center content vertically
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden', // Prevents scrolling issues when zoomed in
       }}>
                
          <Typography 
          variant="h1" component="h1" gutterBottom 
          color={"black"}>
            <strong>Toxiscan</strong>
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom color="black">
          <strong>Your ultimate Guide to Healthy and Eco-Friendly Living</strong>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 10, mr: 2, borderRadius: 10 }}
            href="/scanner"
            size= "large"
            style={{
              fontSize: '25px'
            }}
          >
            <strong>Start Scanning</strong>
          </Button>

          <Typography variant="h3" component="h2" gutterBottom color="black" paddingTop={10}>
          <strong>Scan.Search.Know</strong>
          </Typography>
        
        </Box>
      </ThemeProvider>
    );
}
