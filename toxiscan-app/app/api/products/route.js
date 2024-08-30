// src/app/api/products/route.js
import { NextResponse } from 'next/server';

export async function GET() {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?action=process&sort_by=nutriscore_score&page_size=50&json=true`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'YourAppName - Version 1.0', // Replace with your app name
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    const data = await response.json();
    return NextResponse.json(data.products);
  } catch (error) {
    return NextResponse.error(new Error('Failed to fetch data'));
  }
}
