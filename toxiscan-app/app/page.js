'use client'
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
    const router = useRouter();
    return (
        <div>
            <Button onClick={() => router.push('/scanner')}>Button</Button>
        </div>
    );
  
}
