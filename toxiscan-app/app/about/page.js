// Import any necessary modules or libraries here

// Define your default page function

    // Add your code for the default page here

'use client';

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function AboutUs() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 4,
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom  sx={{fontWeight: 'bold'}}>
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
        ><Typography variant="body1" sx={{fontWeight: 'bold', marginBottom: 2}}>
        Welcome to our Toxiscan app! 
      </Typography>
          <Typography variant="body1" sx={{marginBottom: 2}}>
             We are a team of three passionate and dedicated software engineering students united by our passion for technology and innovation.Our mission to revolutionize food safety and chemical understanding through technology so we craeted this Toxiscan app.Through this app, our goal is to develop cutting-edge solutions that address real-world challenges and make a meaningful impact.
          </Typography>

          <Typography variant="body1" >
          The Toxiscan app is designed to empower users with crucial information about the chemicals in their food.By offering an intuitive and user-friendly platform, we aim to help people make informed decisions about their diet and health. Our app enables users to easily scan their food and understand the presence of potentially harmful chemicals, promoting a safer and more conscious approach to food consumption.Sign into Toxiscan today to start exploring the chemicals in your food and make smarter, healthier choices. Thank you for joining us on this journey toward safer and healthier living!
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            maxWidth: { xs: '100%', sm: '50%' },
          }}
        >
          <Image
            src="/images/Toxiscanlogo.jpg"
            alt="About Us"
            layout="responsive"
            width={600}
            height={400}
            style={{ borderRadius: '8px' }}
          />
        </Box>
      </Box>
    </Box>
  );
}
