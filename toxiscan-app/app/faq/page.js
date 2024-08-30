'use client';
import React from 'react';
import { Typography,GlobalStyles, Accordion, AccordionSummary, AccordionDetails, Container, Box, Toolbar, ThemeProvider, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomAppBar from '../components/CustomAppBar';
import CustomTheme from '../components/Theme';

const FAQ = () => {
  const theme = useTheme(); // Access theme using useTheme hook

  const faqs = [
    {
      question: "What is this app about?",
      answer: "This app allows you to scan food items to get a detailed list of ingredients and determine if any of them are harmful towards your health.",
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button and follow the instructions. You can also always sign in using Google.",
    },
    {
      question: "How do I use the app to scan food items?",
      answer: "You can scan items using the scan button on the search bar.Simply open the app, use the scan feature to capture the barcode of the food packaging, and the app will display the ingredients list along with the Nutri Score , the Nova Score , and the Eco Score if available.",
    },
    {
      question: "Can I use the app for foods without barcodes or labels?",
      answer: "Currently, the app is optimized for scanning packaged foods with barcodes. For unlabeled or homemade foods, the app may not provide ingredients information. You can also use our search feature to search products by name.",
    },
    {
      question: " Is the app accurate in identifying toxic ingredients?",
      answer: "The app is designed to provide accurate information based on a comprehensive and research-backed database. We are using a reliable and open source food database called 'Open Food Facts', however, it's always a good idea to verify with additional sources if you have specific concerns about certain ingredients.",
    },

    {
      question: "How do I contact support?",
      answer: "You can contact support by emailing your name, email, and message using the contact form on the website and our team will get back to as soon as possible.",
    },

    {
      question: "Is Toxiscan Non-profit?",
      answer: "Yes, the Toxiscan team does not gain any profit from this web app, Toxiscan is the creation of three software engineers working on it as a final project for their fellowship.",
    },
    
  ];

  return (
    <ThemeProvider theme={CustomTheme}>
            {/* Global Styles to set the background color of the whole screen */}
            <GlobalStyles
        styles={{
          body: {
            backgroundColor: '#9fdf9c', // Set your desired background color here
          },
        }}
      />
      <CustomAppBar />
      <Toolbar /> {/* Ensure enough space for the AppBar */}
      <Container sx={{ mt: 8, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Frequently Asked Questions
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ width: '100%', maxWidth: 600, mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}
              sx={{ bgcolor: '#29524a', 
                color: 'white',
                '& .MuiAccordionSummary-content': { color: 'white'}
                }}
                >
              <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails
                  sx={{ 
                    bgcolor: '#c6ebc3', // Set your desired background color here for the drop-down content
                    color: 'black', // Optional: Set text color to ensure good contrast
                  }}
              >
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FAQ;
