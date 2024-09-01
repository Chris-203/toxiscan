"use client";
import React from "react";
import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
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
          Sign Up
        </Typography>
        <SignUp />
      </Box>
    </Box>
  );
}
