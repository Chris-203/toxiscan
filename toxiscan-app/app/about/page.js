'use client';
import { Box, Typography, Toolbar, ThemeProvider, useTheme, GlobalStyles} from "@mui/material";
import Image from "next/image";
import CustomAppBar from '../components/CustomAppBar'; 
import CustomTheme from '../components/Theme'; 

export default function AboutUs() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={CustomTheme}>
                  {/* Global Styles to set the background color of the whole screen */}
                  <GlobalStyles
        styles={{
          body: {
            backgroundColor: '#94a187', // Set your desired background color here
          },
        }}
      />
      <CustomAppBar /> {/* Custom AppBar at the top */}
      <Toolbar/> {/* Toolbar to create space for the AppBar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          padding: 4,
          paddingTop: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(1)})`, // Adjust padding-top to account for AppBar and Toolbar
          overflow: 'hidden',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          About Us
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            maxWidth: '1200px',
            gap: 4,
            marginTop: 4,
          }}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: 'left',
              maxWidth: { xs: '100%', sm: '50%' },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Welcome to our Toxiscan app!
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', marginBottom: 2 }}>
              We are a team of three passionate and dedicated software engineering students united by our passion for technology and innovation. Our mission is to revolutionize food safety and chemical understanding through technology, so we created this Toxiscan app. Through this app, our goal is to develop cutting-edge solutions that address real-world challenges and make a meaningful impact.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.25rem' }}>
              The Toxiscan app is designed to empower users with crucial information about the chemicals in their food. By offering an intuitive and user-friendly platform, we aim to help people make informed decisions about their diet and health. Our app enables users to easily scan their food and understand the presence of potentially harmful chemicals, promoting a safer and more conscious approach to food consumption. Sign into Toxiscan today to start exploring the chemicals in your food and make smarter, healthier choices. Thank you for joining us on this journey toward safer and healthier living!
            </Typography>
          </Box>
          
          <Box
            sx={{
              flex: 1,
              textAlign: 'center',
              maxWidth: { xs: '100%', sm: '50%' },
              marginLeft: { xs: 0, sm: 'auto' }, // Adjust marginLeft to position the image
              transform: { xs: 'none', sm: 'translateX(50px)' }, // Optional: Use transform to nudge image further to the right
            }}
          
          >
            <Image
              src="/images/Toxiscanlogo.png"
              alt="About Us"
              layout="responsive"
              width={600}
              height={400}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
