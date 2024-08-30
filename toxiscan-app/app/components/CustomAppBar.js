'use client';
// import 'boxicons';
import { useState, useEffect } from 'react';
import { Box,Icon, Button, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Script from 'next/script'; // Import Script from next/script



const CustomAppBar = ({ defaultTitle }) => {
    
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Home', 'Search', 'About Us' , 'FAQ' , 'Contact Us'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => router.push(text === "Search" ? "/scanner" : text === "Home" ? "/"
                             : text === "About Us" ? "/about":text === "FAQ" ? "/faq":"/contact")}>
                            <ListItemText primary={text} />
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
            <IconButton onClick={toggleDrawer(true)}>
            <box-icon name='barcode-reader' size="lg" color = "white"></box-icon>
            </IconButton>
          </Box>
                    <Button variant="outlined" color="inherit" size="large" sx={{ margin: 2 }} href="">
                        Login
                    </Button>
                    <Button variant="outlined" color="inherit" size="large" sx={{ margin: 2 }} href="">Sign Up</Button>
                
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