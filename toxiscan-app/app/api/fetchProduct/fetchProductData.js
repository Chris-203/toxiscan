export async function fetchProductData(barcode) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
      {
        headers: {
          "User-Agent": "Toxiscan - Version 1.0 - Toxiscan.com",
        },
      }
    );
    const data = await response.json();
    if (data.status === 1) {
      return data.product; // Product found
    } else {
      console.error("Product not found");
      return null; // Product not found
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}
