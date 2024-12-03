import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
  const { id } = await params;
  const { action, ...data } = await req.json();  

  try {
    if (action === 'update') {
      // Handle updating supplier details
      const { name, email, phone, tin, location } = data;
      const updatedSupplier = await prisma.supplier.update({
        where: { id: Number(id) },
        data: {
          ...(name && { name }),
          ...(email && { email }),
          ...(phone && { phone }),
          ...(tin && { tin }),
          ...(location && { location }),
        },
      });
      return NextResponse.json({ supplier: updatedSupplier });
    } else if (action === 'delete') {
      // Handle marking as deleted
      const updatedSupplier = await prisma.supplier.update({
        where: { id: Number(id) },
        data: { isDeleted: true },  // Mark supplier as deleted
      });
      return NextResponse.json({ supplier: updatedSupplier });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error handling request' }, { status: 500 });
  }
}

