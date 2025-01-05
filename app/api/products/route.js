import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        supplier: true, 
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

export async function POST(req) {
  try {
    const { name, price, type, supplierId } = await req.json();

    if (!name || typeof price !== 'number' || !type || typeof supplierId !== 'number') {
      return NextResponse.json(
        { error: 'Missing or invalid required fields: name, price, type, and supplierId' },
        { status: 400 }
      );
    }

    const supplierExists = await prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplierExists) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        type,
        supplierId,
        isFavorite: false,  
        isDeleted: false,   
      },
    });

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
