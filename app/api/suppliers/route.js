import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getAllSuppliers() {
  try {
    const suppliers = await prisma.supplier.findMany({
      where: {
        isDeleted: false,  
      },
      include: {
        products: true,
      },
    });
    return suppliers;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return { error: 'Error retrieving suppliers' };
  }
}

export async function GET() {
  const supplierData = await getAllSuppliers();

  if (supplierData.error) {
    return NextResponse.json({ error: supplierData.error }, { status: 500 });
  }

  return NextResponse.json({ suppliers: supplierData });
}

export async function POST(req) {
  try {
    const { name, email, phone, tin, location, latitude, longitude, isFavorite } = await req.json();

    if (!name || !email || !phone || !location) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, and location' },
        { status: 400 }
      );
    }

    const newSupplier = await prisma.supplier.create({
      data: {
        name,
        email,
        phone,
        tin,
        location,
        latitude,
        longitude,
        isFavorite: isFavorite ?? false, 
        isDeleted: false, 
      },
    });

    return NextResponse.json({ supplier: newSupplier }, { status: 201 });
  } catch (error) {
    console.error('Error creating supplier:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

