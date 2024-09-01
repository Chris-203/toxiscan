"use client";
import React from "react";
import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: "center", my: 4, mt: 10 }}
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <SignIn />
      </Box>
    </Box>
  );
}
