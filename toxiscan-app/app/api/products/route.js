// src/app/api/products/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const baseUrl = 'https://world.openfoodfacts.org/cgi/search.pl?action=process';

  const tagType = searchParams.get('tagtype_0') || 'countries';
  const tagContains = searchParams.get('tag_contains_0') || 'contains';
  const tag = searchParams.get('tag_0') || '';
  const sortBy = searchParams.get('sort_by') || '';
  const pageSize = searchParams.get('page_size') || '50';
  const category = searchParams.get('category') || '';
  const page = searchParams.get('page') || '1'; // Get the page number

  let url = `${baseUrl}&tagtype_0=${tagType}&tag_contains_0=${tagContains}&tag_0=${tag}&sort_by=${sortBy}&page_size=${pageSize}&page=${page}&json=true`;

  if (category) {
    url += `&tagtype_1=categories&tag_contains_1=contains&tag_1=${category}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':'Toxiscan - Version 1.0 - Toxiscan.com' 
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
