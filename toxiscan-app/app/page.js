'use client'
import { Button, Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
    const router = useRouter();
    return (
        <Box sx={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          height: '100vh',
          width: '100%',
       }}>
          
        </Box>
    );
  
}
