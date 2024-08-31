"use client";
import React, { useRef, useState } from "react";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  ThemeProvider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NoFood as NoFoodIcon } from "@mui/icons-material";
import CustomTheme from '../components/Theme';

const ProductDisplay = ({ productData }) => {
  const [imageError, setImageError] = useState(false);
  if (!productData) return null;

  const nutritionalRef = useRef(null);
  const healthRef = useRef(null);
  const productRef = useRef(null);
  const environmentalRef = useRef(null);

  const handleError = () => {
    setImageError(true);
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const getNutriScoreColor = (grade) => {
    switch (grade.toUpperCase()) {
      case "A":
        return "darkgreen";
      case "B":
        return "lightgreen";
      case "C":
        return "gold";
      case "D":
        return "orange";
      case "E":
        return "red";
      default:
        return "black"; // default color if the grade is unknown
    }
  };
  const NutriScore = ({ nutriScoreGrade }) => {
    const nutriScoreUrl = `https://static.openfoodfacts.org/images/misc/nutriscore-${nutriScoreGrade.toLowerCase()}.svg`;

    return (
      <img
        src={nutriScoreUrl}
        alt={`Nutri-Score ${nutriScoreGrade.toUpperCase()}`}
        style={{ width: "100px", height: "auto" }} // Adjust the size as needed
      />
    );
  };

  const NovaGroup = ({ novaGroup }) => {
    const novaGroupUrl = `https://static.openfoodfacts.org/images/misc/nova-group-${novaGroup}.svg`;

    return (
      <img
        src={novaGroupUrl}
        alt={`NOVA Group ${novaGroup}`}
        style={{ width: "20px", height: "auto" }} // Adjust the size as needed
      />
    );
  };

  const EcoScore = ({ ecoScoreGrade }) => {
    const ecoScoreUrl = `https://static.openfoodfacts.org/images/misc/ecoscore/ecoscore-${ecoScoreGrade.toLowerCase()}.svg`;

    return (
      <img
        src={ecoScoreUrl}
        alt={`Eco-Score ${ecoScoreGrade.toUpperCase()}`}
        style={{ width: "40px", height: "auto" }} // Adjust the size as needed
      />
    );
  };
  const novaGroupInfo = {
    1: {
      icon: "https://static.openfoodfacts.org/images/misc/nova-group-1.svg",
      title: "Unprocessed or Minimally Processed Foods",
      description:
        "These are foods that are either unprocessed or minimally processed, such as fresh fruits, vegetables, and grains.",
    },
    2: {
      icon: "https://static.openfoodfacts.org/images/misc/nova-group-2.svg",
      title: "Processed Culinary Ingredients",
      description:
        "These include ingredients derived from minimally processed foods, such as oils, fats, sugars, and salt.",
    },
    3: {
      icon: "https://static.openfoodfacts.org/images/misc/nova-group-3.svg",
      title: "Processed Foods",
      description:
        "These are foods that have been preserved or processed with the addition of salt, sugar, or other substances.",
    },
    4: {
      icon: "https://static.openfoodfacts.org/images/misc/nova-group-4.svg",
      title: "Ultra-Processed Food and Drink Products",
      description:
        "These are industrial formulations made entirely or mostly from substances extracted from foods, with additives and preservatives.",
    },
  };

  const nutriscoreInfo = {
    a: {
      description: "Very good nutritional quality",
    },
    b: {
      description: "Good nutritional quality",
    },
    c: {
      description: "Average nutritional quality",
    },
    d: {
      description: "Poor nutritional quality",
    },
    e: {
      description: "Bad nutritional quality",
    },
  };

  const ecoscoreInfo = {
    a: {
      description: "Very low environmental impact",
    },
    b: {
      description: "Low environmental impact",
    },
    c: {
      description: "Moderate environmental impact",
    },
    d: {
      description: "High environmental impact",
    },
    e: {
      description: "Very high environmental impact",
    },
  };

  const ingredientAnalysis = {
    "en:palm-oil-free": "No ingredients containing palm oil detected",
    "en:vegan": "No non-vegan ingredients",
    "en:vegetarian": "No non-vegetarian ingredients detected",
    // Add more mappings as needed
  };
  const getNutrientLevelColor = (level) => {
    switch (level) {
      case "low":
        return "green";
      case "moderate":
        return "orange";
      case "high":
        return "red";
      default:
        return "black"; // default color if the level is unknown
    }
  };
  const AllergensList = ({ allergens }) => {
    // Function to remove 'en:' prefix from allergen names
    const cleanAllergen = (allergen) => allergen.replace('en:', '');
  
    return (
      <Typography variant="body1" mb={3}>
        <strong>Allergens</strong>:{" "}
        {allergens.map((allergen, index) => (
          <span key={index}>
            {cleanAllergen(allergen)}
            {index < allergens.length - 1 ? ', ' : ''}
          </span>
        ))}
      </Typography>
    );
  };

  return (
    <ThemeProvider theme={CustomTheme}>
    <Box
      ref={productRef}
      display={"flex"}
      sx={{ backgroundImage: "url('/images/gradient2.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '100vh', // Changed from height to minHeight
        width: '100%', }}
      textAlign={"center"}
      justifyContent={"center"}
    >
      {/* Go To Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
          position: "fixed",
          bgcolor: "primary.main",
          width: "100%",
          zIndex: 100,
        }}
      >
        <Button
          variant="contained"
          onClick={() => scrollToSection(productRef)}
          sx={{ mx: 1, borderRadius: 10, mt: 2, mb: 2, bgcolor: "#000000" }}
        >
          Product
        </Button>
        <Button
          variant="contained"
          onClick={() => scrollToSection(nutritionalRef)}
          sx={{ mx: 1, borderRadius: 10, mt: 2, mb: 2, bgcolor: "#000000" }}
        >
          Nutritional Facts
        </Button>
        <Button
          variant="contained"
          onClick={() => scrollToSection(healthRef)}
          sx={{ mx: 1, borderRadius: 10, mt: 2, mb: 2, bgcolor: "#000000" }}
        >
          Health
        </Button>
        <Button
          variant="contained"
          onClick={() => scrollToSection(environmentalRef)}
          sx={{ mx: 1, borderRadius: 10, mt: 2, mb: 2, bgcolor: "#000000" }}
        >
          Environment
        </Button>
      </Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column", // Change direction based on screen width
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          // bgcolor: "red",
          borderRadius: "50px",
          mt: 15,
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Change direction based on screen width
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            bgcolor: "white",
            borderRadius: "50px",
          }}
        >
          <Box
            sx={{
              // width: 150,
              // height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // border: "1px solid #ddd",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            {imageError ? (
              <NoFoodIcon sx={{ fontSize: 80, color: "gray" }} />
            ) : (
              <img
                src={productData.image_url}
                alt="Product"
                onError={handleError}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </Box>

          <Box
            sx={{ flex: 1, padding: "16px" }}
            justifyContent="left"
            textAlign="left"
          >
            <Typography variant="h3" mb={5}>
              {productData.product_name_en}
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
            <AllergensList allergens={productData.allergens_tags} />
          </Box>
        </Box>
        <Box
          ref={nutritionalRef}
          sx={{
            display: "flex",
            flexDirection: "column", // Change direction based on screen width
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            bgcolor: "white",
            borderRadius: "40px",
            mt: 5,
            px: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              padding: 2,
              mt: 2,
              mb: 2,
            }}
          >
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6"><strong>Nutritional Information</strong></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper} sx={{ width: "100%" }}>
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
                                .replace(/(?:^|\s)\S/g, (char) =>
                                  char.toUpperCase()
                                )}
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
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
        <Box
          ref={healthRef}
          sx={{
            display: "flex",
            flexDirection: "column", // Change direction based on screen width
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            bgcolor: "white",
            borderRadius: "40px",
            mt: 5,
            px: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              padding: 2,
              mt: 2,
              mb: 2,
              justifyContent: "left",
              textAlign: "left",
            }}
          >
            <Accordion sx={{ bgcolor: "white" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">
                  <strong>Health</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h6">
                  <strong>Nutrition</strong>
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  sx={{ ml: 2, mb: 2 }}
                  alignItems="center"
                >
                  <NutriScore nutriScoreGrade={productData.nutriscore_grade} />
                  <Box
                    alignItems="center"
                    flexDirection="column"
                    sx={{ ml: 2, mt: 2 }}
                  >
                    <Typography
                      alignItems={"center"}
                      variant="body1"
                      sx={{
                        color: getNutriScoreColor(productData.nutriscore_grade),
                      }}
                    >
                      Nutri-Score {productData.nutriscore_grade.toUpperCase()}
                    </Typography>
                    <Typography variant="body1" mb={3}>
                      {nutriscoreInfo[productData.nutriscore_grade].description}
                    </Typography>
                  </Box>
                </Box>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Typography variant="body1">Nutrient levels</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          variant="body1"
                          color={getNutrientLevelColor(
                            productData.nutrient_levels.fat
                          )}
                        >
                          Fat in {productData.nutrient_levels.fat} quantity (
                          {productData.nutriments["fat"]} %)
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2">
                          <strong>What you need to know</strong>
                          <Typography sx={{ mt: 1, ml: 1 }}>
                            - A high consumption of fat, especially saturated
                            fats, can raise cholesterol, which increases the
                            risk of heart diseases.
                          </Typography>
                          <strong>
                            Recommendation: Limit the consumption of fat and
                            saturated fat
                          </strong>
                          <Typography sx={{ mt: 1, ml: 1 }}>
                            - Choose products with lower fat and saturated fat
                            content.{" "}
                          </Typography>
                          <Typography sx={{ mt: 1, fontStyle: "italic" }}>
                            Source: National Health Service UK (NHS) - Fat: the
                            facts
                          </Typography>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          variant="body1"
                          color={getNutrientLevelColor(
                            productData.nutrient_levels["saturated-fat"]
                          )}
                        >
                          Saturated fat in{" "}
                          {productData.nutrient_levels["saturated-fat"]}{" "}
                          quantity ({productData.nutriments["saturated-fat"]} %)
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2">
                          <strong>What you need to know</strong>
                          <Typography sx={{ mt: 1, ml: 1 }}>
                            - A high consumption of saturated fats can raise
                            cholesterol, which increases the risk of heart
                            diseases.
                          </Typography>
                          <strong>
                            Recommendation: Limit the consumption of saturated
                            fat
                          </strong>
                          <Typography sx={{ mt: 1, ml: 1 }}>
                            - Choose products with lower saturated fat content.
                          </Typography>
                          <Typography sx={{ mt: 1, fontStyle: "italic" }}>
                            Source: National Health Service UK (NHS) - Fat: the
                            facts
                          </Typography>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Typography
                            variant="body1"
                            color={getNutrientLevelColor(
                              productData.nutrient_levels.sugars
                            )}
                          >
                            Sugars in {productData.nutrient_levels.sugars}{" "}
                            quantity ({productData.nutriments["sugars"]} %)
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2">
                          <strong>What you need to know</strong>
                          <Typography sx={{ mt: 1, ml: 1 }}>
                            - High sugar consumption can lead to weight gain and
                            obesity, which increases the risk of type 2 diabetes
                            and cardio-vascular diseases.
                          </Typography>
                          <strong>
                            Recommendation: Limit the consumption of sugar and
                            sugary drinks
                          </strong>
                          <Typography sx={{ mt: 1, ml: 1 }}>
                            - Sugary drinks (such as sodas, fruit beverages, and
                            fruit juices and nectars) should be limited as much
                            as possible (no more than 1 glass a day).
                            <Typography sx={{ mt: 1, ml: 1 }}>
                              - Choose products with lower sugar content and
                              reduce the consumption of products with added
                              sugars.
                            </Typography>
                          </Typography>
                          <Typography sx={{ mt: 1, fontStyle: "italic" }}>
                            Source: National Health Service UK (NHS) - Sugar:
                            the facts
                          </Typography>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          variant="body1"
                          color={getNutrientLevelColor(
                            productData.nutrient_levels.salt
                          )}
                        >
                          Salt in {productData.nutrient_levels.salt} quantity (
                          {productData.nutriments["salt"]} %)
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2">
                          <strong>What you need to know</strong>
                          <Typography sx={{ mt: 1, ml: 1 }}>
                            <Typography sx={{ mt: 1, ml: 1 }}>
                              - A high consumption of salt (or sodium) can cause
                              raised blood pressure, which can increase the risk
                              of heart disease and stroke.
                            </Typography>
                            <Typography sx={{ mt: 1, ml: 1 }}>
                              - Many people who have high blood pressure do not
                              know it, as there are often no symptoms.
                            </Typography>
                            <Typography sx={{ mt: 1, ml: 1 }}>
                              - Most people consume too much salt (on average 9
                              to 12 grams per day), around twice the recommended
                              maximum level of intake.
                            </Typography>
                          </Typography>
                          <strong>
                            Recommendation: Limit the consumption of salt
                          </strong>
                          <Typography sx={{ mt: 1, ml: 1 }}>
                            - Choose products with lower salt content and reduce
                            the consumption of products with added salt.
                          </Typography>
                          <Typography sx={{ mt: 1, fontStyle: "italic" }}>
                            Source: World Health Organization (WHO) - Fact sheet
                            - Salt reduction
                          </Typography>
                          <Typography sx={{ mt: 1, fontStyle: "italic" }}>
                            Source: National Health Service UK (NHS) - Salt: the
                            facts
                          </Typography>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </AccordionDetails>
                </Accordion>

                <Typography variant="h6" mb={3} mt={3}>
                  <strong>Food processing</strong>
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Typography variant="body1">
                        <NovaGroup novaGroup={productData.nova_group} />
                      </Typography>
                      <Typography variant="body1" sx={{ ml: 2 }}>
                        {novaGroupInfo[productData.nova_group].title}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">
                      Food products are classified into 4 groups according to
                      their degree of processing:
                      <Typography sx={{ mt: 1 }}>
                        1. Unprocessed or minimally processed foods
                      </Typography>
                      <Typography>2. Processed culinary ingredients</Typography>
                      <Typography>3. Processed foods</Typography>
                      <Typography>4. Ultra processed foods</Typography>
                      <Typography sx={{ mt: 2 }}>
                        The determination of the group is based on the category
                        of the product and on the ingredients it contains.
                      </Typography>
                      <Typography
                        sx={{ mt: 2 }}
                        component="a"
                        href="https://world.openfoodfacts.org/nova"
                        target="_blank" // This opens the link in a new tab
                        rel="noopener noreferrer" // Security measures when opening a new tab
                      >
                        Learn more about NOVA classification by Open Food Facts
                      </Typography>
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Typography variant="h6" mb={2} mt={2}>
                  <strong>Ingredient Analysis</strong>
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body1">
                      {productData.ingredients_analysis_tags[0]
                        .replace("en:", "")
                        .replace(/-/g, " ") || "No description available"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      {ingredientAnalysis[
                        productData.ingredients_analysis_tags[0]
                      ] || "No description available"}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body1">
                      {productData.ingredients_analysis_tags[1]
                        .replace("en:", "")
                        .replace(/-/g, " ") || "No description available"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      {ingredientAnalysis[
                        productData.ingredients_analysis_tags[1]
                      ] || "No description available"}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body1">
                      {productData.ingredients_analysis_tags[2]
                        .replace("en:", "")
                        .replace(/-/g, " ") || "No description available"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      {ingredientAnalysis[
                        productData.ingredients_analysis_tags[2]
                      ] || "No description available"}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
        <Box
          ref={healthRef}
          sx={{
            display: "flex",
            flexDirection: "column", // Change direction based on screen width
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            bgcolor: "white",
            borderRadius: "40px",
            mt: 5,
            px: 2,
          }}
        >
          <Box
            ref={environmentalRef}
            sx={{
              width: "100%",
              padding: 2,
              mt: 2,
              mb: 2,
              justifyContent: "left",
              textAlign: "left",
            }}
          >
            <Accordion sx={{ bgcolor: "white" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">
                  <strong>Environment</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  display="flex"
                  flexDirection="row"
                  sx={{ ml: 2, mb: 2 }}
                  alignItems="center"
                >
                  <EcoScore ecoScoreGrade={productData.ecoscore_grade} />
                  <Box
                    alignItems="center"
                    flexDirection="column"
                    sx={{ ml: 2, mt: 2 }}
                  >
                    <Typography
                      alignItems={"center"}
                      variant="body1"
                      sx={{
                        color: getNutriScoreColor(productData.ecoscore_grade),
                      }}
                    >
                      Eco-Score {productData.ecoscore_grade.toUpperCase()}{" "}
                      (Score:{productData.ecoscore_score}/100)
                    </Typography>
                    <Typography variant="body1" mb={3}>
                      {ecoscoreInfo[productData.ecoscore_grade].description}
                    </Typography>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Container>
    </Box>
    </ThemeProvider>
  );
};

export default ProductDisplay;
