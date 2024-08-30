'use client';
// import 'boxicons';
import { useState, useEffect } from 'react';
import { Box,Icon, Button, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Script from 'next/script'; // Import Script from next/script
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";



const CustomAppBar = ({ defaultTitle }) => {
    
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { user } = useUser(); // Get current user details from Clerk
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Home', 'Search', 'About Us' , 'FAQ' , 'Contact Us'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => router.push(text === "Search" ? "/search" : text === "Home" ? "/"
                             : text === "About Us" ? "/about":text === "FAQ" ? "/faq":"/contact")}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom:4}}>
                                {text}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );



    return(
    <>
      <Script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js" strategy="beforeInteractive" />
    
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: 'primary.main', color: 'common.white' }}>
            <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <IconButton onClick={toggleDrawer(true)} sx={{ zIndex: 10 }}>
            <box-icon name='barcode-reader' size="lg" color = "white"></box-icon>
            </IconButton>
          </Box>

        {/* Show login and signup buttons when the user is signed out */}
        <SignedOut>
                    <Button variant="outlined" color="inherit" size="large" sx={{ margin: 2 }} href="/sign-in">
                    Sign In
                    </Button>
                    <Button variant="outlined" color="inherit" size="large" sx={{ margin: 2 }} href="/sign-up">Sign Up</Button>
        </SignedOut>

        {/* Show user button when the user is signed in */}
        <SignedIn>
        <Box sx={{ width: 56, height: 56 }}>
                                <UserButton
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: {
                                                width: '90%',
                                                height: '90%',
                                            },
                                        },
                                    }}
                                />
                            </Box>
        </SignedIn>
                
            </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={toggleDrawer(false)}
                PaperProps={{ sx: { backgroundColor: "primary.main", color: "common.white" } }}>
                {DrawerList}
            </Drawer>
        </Box>
    </>
      
    )
}

export default CustomAppBar;