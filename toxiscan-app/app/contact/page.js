'use client'
import { Button, Box, Typography,GlobalStyles, ThemeProvider, useTheme, Toolbar, Grid, TextField, Card, CardContent} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomTheme from '../components/Theme';
import CustomAppBar from '../components/CustomAppBar'; 
import React, { useState } from 'react';


export default function contactPage() {
    const theme = useTheme(); // Access theme using useTheme hook
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const googleFormURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSebR-pTAfneWEqSpycv4oqJTUJSDRHQcPORXUbc5I1tAEbinA/formResponse'; // Google Form action
        const formPayload = new FormData();

        formPayload.append('entry.87595873', formData.name); // Replace YOUR_NAME_ENTRY_ID with the actual entry ID for the 'Name' field
        formPayload.append('entry.49423479', formData.email); // Replace YOUR_EMAIL_ENTRY_ID with the actual entry ID for the 'Email' field
        formPayload.append('entry.121354589', formData.message); // Replace YOUR_MESSAGE_ENTRY_ID with the actual entry ID for the 'Message' field

        try {
            const response = await fetch(googleFormURL, {
                method: 'POST',
                mode: 'no-cors',
                body: formPayload
            });

            if (response) {
                alert('Thank you for your message! We will get back to you soon.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was a problem submitting your form.');
        }
    };


    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
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
        <Toolbar/> {/* Ensure enough space for the AppBar */}
        <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: 'background.paper',
        boxShadow: 3,
        borderRadius: 2,
        marginTop: '50px', // Added margin to push the form down
        bgcolor: '#c6ebc3',
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom textAlign="center">
              Fill out the form and our team will get back to you.
      </Typography> 
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            id="message"
            name="message"
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ padding: 2, fontSize: '16px' }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
      );
    }
    
