import { NextResponse } from "next/server";
import { fetchProductData } from "./fetchProductData";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const barcode = searchParams.get("barcode");

  if (!barcode) {
    return NextResponse.json(
      {
        error: "No barcode provided",
      },
      { status: 400 }
    );
  }

  try {
    const productData = await fetchProductData(barcode);
    return NextResponse.json(productData, { status: 200 });
  } catch (error) {
    console.error("Error fetching product data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch product data",
      },
      { status: 500 }
    );
  }
}
