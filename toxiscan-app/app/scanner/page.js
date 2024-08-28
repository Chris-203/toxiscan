"use client";
import React, { useRef, useState, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { BrowserMultiFormatReader } from "@zxing/library";
import axios from "axios";
import { Button, Box, Typography } from "@mui/material";

// const CameraCapture = () => {
//   const cameraRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [isFrontCamera, setIsFrontCamera] = useState(true);
//   const [decodedText, setDecodedText] = useState(null);
//   const [productInfo, setProductInfo] = useState(null);

//   const captureImage = async () => {
//     if (cameraRef.current) {
//       const imageSrc = await cameraRef.current.takePhoto();
//       console.log("Captured Image Source:", imageSrc);
//       setCapturedImage(imageSrc);
//     }
//   };

//   const toggleCamera = () => {
//     setIsFrontCamera((prevState) => !prevState);
//     if (cameraRef.current) {
//       cameraRef.current.switchCamera();
//     }
//   };

//   const handleDecode = async (text) => {
//     console.log("Decoded Text:", text);
//     setDecodedText(text);

//     if (text) {
//       // Fetch product information
//       try {
//         const response = await fetch(
//           `https://world.openfoodfacts.org/api/v0/product/${text}`
//         );
//         const data = await response.json();
//         if (data.product) {
//           console.log("Product Data:", data.product); // Log product data
//           setProductInfo(data.product);
//         } else {
//           console.error("Product not found");
//           setProductInfo(null);
//         }
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//         setProductInfo(null);
//       }
//     }
//   };

//   return (
//     <div>
//       {/* <CustomAppBar /> */}
//       <div
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "50vh",
//           marginTop: "70px",
//         }}
//       >
//         <Camera
//           ref={cameraRef}
//           style={{ width: "100%", height: "100%" }}
//           facingMode={isFrontCamera ? "user" : "environment"}
//         />
//         <div
//           style={{
//             position: "absolute",
//             bottom: 0,
//             width: "100%",
//             padding: "10px",
//             boxSizing: "border-box",
//           }}
//         >
//           <button onClick={captureImage}>Capture Image</button>
//           <button onClick={toggleCamera} style={{ marginLeft: "10px" }}>
//             Switch Camera
//           </button>
//           {capturedImage && (
//             <div>
//               <h3>Captured Image:</h3>
//               <img
//                 src={capturedImage}
//                 alt="Captured"
//                 style={{ width: "100%", height: "auto" }}
//               />
//               {/* <BarcodeDecoder
//                 imageSrc={capturedImage}
//                 onDecode={handleDecode}
//               /> */}
//             </div>
//           )}
//           {decodedText && <p>Decoded Text: {decodedText}</p>}
//           {productInfo && (
//             <div>
//               <h3>Product Information:</h3>
//               <p>Name: {productInfo.product_name || "N/A"}</p>
//               <p>Brand: {productInfo.brands || "N/A"}</p>
//               <p>Ingredients: {productInfo.ingredients_text || "N/A"}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CameraCapture;

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState("");
  const [cameraActive, setCameraActive] = useState(true);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let selectedDeviceId;

    const startScanner = async () => {
      try {
        const devices = await codeReader.listVideoInputDevices();
        console.log('Video input devices:', devices); // Log available devices
  
        if (devices.length > 0) {
          selectedDeviceId = devices[0].deviceId;
          console.log('Selected device ID:', selectedDeviceId); // Log selected device ID
  
          codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, error) => {
            if (result) {
              console.log('Barcode detected:', result.getText()); // Log detected barcode
              setBarcode(result.getText());
              setCameraActive(false); // Stop the camera after reading a barcode
            }
            if (error && !(error instanceof ZXing.NotFoundException)) {
              setError(error.message);
              console.error('Error:', error); // Log errors during decoding
            }
          });
        }
      } catch (err) {
        setError('Error starting scanner: ' + err.message);
        console.error('Scanner error:', err); // Log scanner startup errors
      }
    };

    if (cameraActive) {
      startScanner();
    }

    return () => {
      codeReader.reset();
    };
  }, [cameraActive]);

  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Typography variant="h6">Scan a Barcode</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 300,
          backgroundColor: "#eee",
          marginBottom: 2,
          flexDirection: "column",
        }}
      >
        {cameraActive && <video id="video" style={{ width: "100%" }} />}

        <Typography variant="body1">Barcode: {barcode}</Typography>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default BarcodeScanner;
