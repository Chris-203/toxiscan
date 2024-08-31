import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const baseUrl = 'https://world.openfoodfacts.org/cgi/search.pl?action=process';

  // Get query parameters
  const tagType = searchParams.get('tagtype_0') || 'countries';
  const tagContains = searchParams.get('tag_contains_0') || 'contains';
  const tag = searchParams.get('tag_0') || 'united states';
  const sortBy = searchParams.get('sort_by') || 'popularity';
  const pageSize = searchParams.get('page_size') || '50';
  const category = searchParams.get('category') || ''; // Default to empty string if not provided

  // Construct the URL with optional category filter
  let url = `${baseUrl}&tagtype_0=${tagType}&tag_contains_0=${tagContains}&tag_0=${tag}&sort_by=${sortBy}&page_size=${pageSize}&json=true`;

  // Add category filter if provided
  if (category) {
    url += `&tagtype_1=categories&tag_contains_1=contains&tag_1=${category}`;
  }

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
