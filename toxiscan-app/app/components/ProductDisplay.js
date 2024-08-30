"use client";
import React from "react";
import {
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ProductDisplay = ({ productData }) => {
  if (!productData) return null;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column", // Change direction based on screen width
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        bgcolor: "red",
        borderRadius: "50px",
        mt: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Change direction based on screen width
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          bgcolor: "cyan",
          borderRadius: "50px",
        }}
      >
        <Box sx={{ marginTop: "10px", ml: 5 }}>
          <img
            src={productData.image_url}
            alt="Product Image"
            width={200}
            height={600}
            style={{ borderRadius: "8px" }} // Add this line to apply rounded corners
          />
        </Box>

        <Box sx={{ flex: 1, padding: "16px" }}>
          <Typography variant="h3" mb={5}>
            {productData.product_name}
          </Typography>
          <Typography variant="body1" mb={3}>
            <strong>Barcode</strong>: {productData.code}
          </Typography>
          <Typography variant="body1" mb={3}>
            {" "}
            <strong>Common Name</strong>: {productData.generic_name}
          </Typography>
          <Typography variant="body1" mb={3}>
            <strong>Quantity</strong>:{productData.quantity}
          </Typography>
          <Typography variant="body1" mb={3}>
            <strong>Brand</strong>: {productData.brands}
          </Typography>
          <Typography variant="body1" mb={3}>
            <strong>Categories</strong>: {productData.categories}
          </Typography>
          <Typography variant="body1" mb={3}>
            <strong>Packaging</strong>:{" "}
            {productData.packaging ||
              "Missing packaging information for this product"}
          </Typography>
          <Typography variant="body1" mb={3}>
            <strong>Ingredients</strong>: {productData.ingredients_text_en}
          </Typography>
          <Typography variant="body1" mb={3}>
            <strong>Allergens</strong>:{" "}
            {productData.allergens.replace("en:", "")}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Change direction based on screen width
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          bgcolor: "cyan",
          borderRadius: "50px",
          mt: 5,
          px: 2,
        }}
      >
        <Typography variant="h6" gutterBottom mb={3} mt={3}>
          Nutritional Information
        </Typography>
        <TableContainer component={Paper} sx={{ width: "90%", mb: 5 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nutrition facts</TableCell>
                <TableCell>
                  <Typography variant="subtitle2" display="block">
                    As sold
                  </Typography>
                  <Typography variant="body2" display="block">
                    for 100 g / 100 ml
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Serving Size</TableCell>
                <TableCell>{productData.serving_size}</TableCell>
              </TableRow>
              {Object.keys(productData.nutriments)
                .filter((key) => key.endsWith("_100g"))
                .map((key) => (
                  <TableRow key={key}>
                    <TableCell>
                      {key
                        .replace("_100g", "")
                        .replace(/_/g, " ")
                        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())}
                    </TableCell>
                    <TableCell>
                      {productData.nutriments[key]}{" "}
                      {productData.nutriments[`${key}_unit`]}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Change direction based on screen width
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          bgcolor: "cyan",
          borderRadius: "50px",
          mt: 5,
          px: 2,
        }}
      >
        <Typography variant="h6" gutterBottom mb={3} mt={3}>
          Food processing{" "}
        </Typography>
        <Typography variant="body1" mb={3}>
          <strong>Nova Group</strong>:{" "}
          {productData.nova_groups_tags[0].replace("en:", "")}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProductDisplay;
