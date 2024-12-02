import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        supplier: true, // Include supplier information for each product
      },
    });
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { error: 'Error retrieving products' };
  }
}

export async function GET() {
  const productData = await getAllProducts();

  if (productData.error) {
    return NextResponse.json({ error: productData.error }, { status: 500 });
  }

  return NextResponse.json({ products: productData });
}
