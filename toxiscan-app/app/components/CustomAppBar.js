// CustomAppBar.js
'use client';
import { useState, useEffect } from 'react';
import { Box, Button, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';


const CustomAppBar = ({ defaultTitle }) => {
    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: 'primary.main', color: 'common.white' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Toxiscan Icon
                </Typography>
                    <Button variant="outlined" color="white" size="large" sx={{ margin: 2 }} href="">
                        Login
                    </Button>
                
            </Toolbar>
        </AppBar>
        </Box>
    )
}

export default CustomAppBar;