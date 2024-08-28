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
          backgroundImage: "url('/images/background.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          height: '100vh',
          width: '100%',
          textAlign: "center",
          paddingTop: '20vh', // Adjust the padding to move content down
       }}>
                
        
          <Typography 
          variant="h1" component="h1" gutterBottom 
          color={"common.white"}>
            <strong>Toxiscan</strong>
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom color="common.white">
          Your ultimate Guide to Healthy and Eco-Friendly Living
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 2 }}
            href="/generate"
          >
            Start Scanning
          </Button>
        
          
        </Box>
        </ThemeProvider>
    );
  
}
