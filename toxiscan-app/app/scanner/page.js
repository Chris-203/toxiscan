'use client'
import React, { useRef, useState, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { BrowserMultiFormatReader } from '@zxing/library';
import axios from 'axios';

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
  const cameraRef = useRef(null);
  const [barcode, setBarcode] = useState(null);
  const [lastScannedBarcode, setLastScannedBarcode] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [cameraSupported, setCameraSupported] = useState(false);

  const baseURL = 'https://world.openfoodfacts.org/api/v0/product/';
  const userAgent = 'MyApp - Web - Version 1.0 - https://myappwebsite.com';
  const reader = new BrowserMultiFormatReader();

  useEffect(() => {
    // Check if the Media Devices API is supported
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      setCameraSupported(true);
    } else {
      setErrorMessage('Camera access is not supported by your device or browser.');
      setCameraSupported(false);
    }
  }, []);

  useEffect(() => {
    if (cameraSupported) {
      const scanBarcode = async () => {
        if (cameraRef.current) {
          try {
            const video = cameraRef.current.video;
            const result = await reader.decodeFromVideoDevice(null, video);
            if (result && result.text !== lastScannedBarcode) {
              setBarcode(result.text);
              setLastScannedBarcode(result.text);
              fetchProductData(result.text);
            }
          } catch (error) {
            console.error('Error scanning barcode:', error);
            setErrorMessage('Error scanning barcode. Please try again.');
          }
        }
      };

      const interval = setInterval(scanBarcode, 1000); // Scan every second
      return () => clearInterval(interval);
    }
  }, [reader, lastScannedBarcode, cameraSupported]);

  const fetchProductData = async (barcode) => {
    setLoading(true);
    setFeedbackMessage('');
    setErrorMessage('');
    try {
      const response = await axios.get(`${baseURL}${barcode}.json`, {
        headers: {
          'User-Agent': userAgent,
        },
      });

      const productData = response.data;

      if (productData.status === 1) {
        setFeedbackMessage(`Product found: ${productData.product.product_name}`);
      } else {
        setFeedbackMessage('Product not found.');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      setErrorMessage('Error fetching product data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCameraError = (error) => {
    console.error('Camera error:', error);
    setErrorMessage('Camera access denied or unavailable.');
  };

  return (
    <div>
      {cameraSupported ? (
        <>
          <Camera 
            ref={cameraRef} 
            aspectRatio={16 / 9} 
            facingMode="environment" 
            onError={handleCameraError}
          />
          <p>Point your camera at a barcode to scan.</p>
        </>
      ) : (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
      {loading && <p>Loading product data...</p>}
      {feedbackMessage && <p>{feedbackMessage}</p>}
      {errorMessage && !loading && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {barcode && <p>Last scanned barcode: {barcode}</p>}
    </div>
  );
};

export default BarcodeScanner;
