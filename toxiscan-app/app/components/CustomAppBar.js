// CustomAppBar.js
'use client';
import 'boxicons';
import { useState, useEffect } from 'react';
import { Box,Icon, Button, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Script from 'next/script'; // Import Script from next/script



const CustomAppBar = ({ defaultTitle }) => {
    return(
      <>
      <Head>
      <Script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js" strategy="beforeInteractive" />
      </Head>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: 'primary.main', color: 'common.white' }}>
            <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {/* Replace Typography with Boxicons */}
            <box-icon name='barcode-reader' size="lg" color = "white"></box-icon>
            {/* Or use a different icon and adjust size/color as needed */}
          </Box>
                    <Button variant="outlined" color="" size="large" sx={{ margin: 2 }} href="">
                        Login
                    </Button>
                
            </Toolbar>
        </AppBar>
        </Box>
      </>
    )
}

export default CustomAppBar;