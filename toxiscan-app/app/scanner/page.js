"use client";
import React, { useRef, useState, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { BrowserMultiFormatReader } from "@zxing/library";
import axios from "axios";
import { Button, Box, Typography } from "@mui/material";
import { BarcodeDetector } from 'barcode-detector'

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
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
        console.error('Error accessing camera: ', err);
        setError('Error accessing camera.');
      }
    };

    const detectBarcode = async () => {
      if (!videoRef.current || !isSearching) return;

      try {
        const barcodeDetector = new BarcodeDetector({ formats: ['qr_code', 'ean_13'] });
        const detect = async () => {
          try {
            const barcodes = await barcodeDetector.detect(videoRef.current);
            if (barcodes.length > 0) {
              setBarcode(barcodes[0].rawValue);
              setIsScanning(true);
              setIsSearching(false);
              stopCamera(); // Stop the camera once a barcode is detected
              return; // Stop scanning once a barcode is detected
            } else {
              setBarcode(null);
            }
          } catch (err) {
            console.error('Error detecting barcode: ', err);
            setError('Error detecting barcode.');
          }
          if (isSearching) {
            requestAnimationFrame(detect); // Continue scanning if still searching
          }
        };
        detect();
      } catch (err) {
        console.error('Barcode Detector API is not supported or failed:', err);
        setError('Barcode Detection API is not supported.');
        setIsSearching(false);
      }
    };

    const stopCamera = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null; // Clear the srcObject
      }
    };

    startCamera();

    return () => {
      stopCamera(); // Ensure the camera stops when the component is unmounted
    };
  }, [isSearching]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <video
        ref={videoRef}
        width="300"
        height="200"
        style={{
          border: '1px solid black',
          display: 'block',
        }}
      />
      {isSearching && !isScanning && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'yellow',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            zIndex: 1,
          }}
        >
          Searching for Barcode...
        </div>
      )}
      {isScanning && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'green',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            zIndex: 1,
          }}
        >
          Scanning Barcode...
        </div>
      )}
      <div
        style={{
          marginTop: '10px',
          color: barcode ? 'green' : 'red',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        Detected Barcode: {barcode || 'None'}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default BarcodeScanner;
