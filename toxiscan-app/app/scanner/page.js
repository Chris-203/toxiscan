"use client";
import React, { useRef, useState, useEffect, theme } from "react";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { BarcodeDetector } from "barcode-detector";
import Image from "next/image";
import ProductDisplay from "../components/ProductDisplay";
import CustomTheme from "../components/Theme";
import CustomAppBar from "../components/CustomAppBar";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [waitingToStopCamera, setWaitingToStopCamera] = useState(false); // New variable
  const [productData, setProductData] = useState(null); // New state for product data
  const [TryAgain, setTryAgain] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        videoRef.current.onplaying = () => {
          setIsSearching(true);
          detectBarcode();
        };

        videoRef.current.onloadedmetadata = () => {
          videoRef.current.width = videoRef.current.videoWidth;
          videoRef.current.height = videoRef.current.videoHeight;
        };
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError("Error accessing camera.");
      }
    };

    const detectBarcode = async () => {
      if (!videoRef.current || !isSearching || waitingToStopCamera) return; // Add condition for waitingToStopCamera

      try {
        const barcodeDetector = new BarcodeDetector({
          formats: ["qr_code", "ean_13", "upc_a"],
        });
        const detect = async () => {
          try {
            const barcodes = await barcodeDetector.detect(videoRef.current);
            if (barcodes.length > 0) {
              const detectedBarcode = barcodes[0].rawValue;
              setBarcode(detectedBarcode);
              setIsScanning(true);
              setIsSearching(false); // Stop searching
              setWaitingToStopCamera(true); // Indicate we're waiting to stop the camera

              // Fetch product data
              fetchProductDetails(detectedBarcode);

              // If not product data found, stop camera and set try again to true
              if (!productData) {
                setCameraActive(false);
                setTryAgain(true);
              }

              // Disable scanning and stop camera after 1 second
              setTimeout(() => {
                setCameraActive(false);
                setIsScanning(false);
                setWaitingToStopCamera(false); // Reset after stopping the camera
                setIsSearching(false); // Reset after stopping the camera
              }, 1000);
              return; // Stop scanning once a barcode is detected
            }
          } catch (err) {
            console.error("Error detecting barcode: ", err);
            setError("Error detecting barcode.");
          }
          if (isSearching) {
            requestAnimationFrame(detect); // Continue scanning if still searching
          }
        };
        detect();
      } catch (err) {
        console.error("Barcode Detector API is not supported or failed:", err);
        setError("Barcode Detection API is not supported.");
        setIsSearching(false);
      }
    };

    const stopCamera = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null; // Clear the srcObject
      }
    };

    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera(); // Ensure the camera stops when the component is unmounted
    };
  }, [cameraActive, isSearching, waitingToStopCamera]); // Add waitingToStopCamera as a dependency

  const fetchProductDetails = async (barcode) => {
    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(`/api/fetchProduct?barcode=${barcode}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      setProductData(data);
    } catch (err) {
      console.error("Error fetching product data:", err);
      setError("Failed to fetch product data.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleStartScan = () => {
    setCameraActive(true);
    setBarcode(null);
    setProductData(null); // Reset product data
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <CustomAppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // mt: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Change direction based on screen width
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Box>
            <video
              ref={videoRef}
              style={{
                width: "100%",
                height: "100%",
                display: cameraActive ? "block" : "none",
              }}
            />
          </Box>

          {productData && (
            <Box>
              <CustomAppBar />
              <Toolbar />
              <ProductDisplay productData={productData} />
            </Box>
          )}
          {TryAgain && !productData && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography variant="body1" align="center">
                No product data found for the barcode.
              </Typography>
              <Typography variant="body1" align="center">
                Please Try Again
              </Typography>
            </Box>
          )}
        </Box>

        {isSearching && !isScanning && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, 90%)",
              color: "lightblue",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: "10px",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              zIndex: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="body1">Searching for Barcode...</Typography>
            <Box sx={{ marginTop: "10px" }}>
              <CircularProgress color="inherit" size={24} />
            </Box>
          </Box>
        )}
        {isScanning && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, 90%)",
              color: "green",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: "10px",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              zIndex: 1,
            }}
          >
            <Typography variant="body1">Scanning Barcode...</Typography>
          </Box>
        )}
        <Box
          sx={{
            marginTop: "10px",
            color: barcode ? "green" : "red",
            fontSize: "18px",
            fontWeight: "bold",
            mt: 12,
          }}
        >
          <Typography variant="body1">
            Detected Barcode: {barcode || "None"}
          </Typography>
        </Box>
        {error && (
          <Box sx={{ color: "red", marginTop: "10px" }}>
            <Typography variant="body1">{error}</Typography>
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartScan}
          disabled={cameraActive}
          sx={{ marginTop: "10px", mb: 3 }}
        >
          Start Scanning
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default BarcodeScanner;
