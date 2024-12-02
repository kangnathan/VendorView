import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getAllSuppliers() {
  try {
    const suppliers = await prisma.supplier.findMany({
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
