import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(req, { params }) {
  const { id } = await params;
  const { action, ...data } = await req.json();  

  try {
    if (action === 'update') {
      const { name, email, phone, tin, location, latitude, longitude} = data;
      const updatedSupplier = await prisma.supplier.update({
        where: { id: Number(id) },
        data: {
          ...(name && { name }),
          ...(email && { email }),
          ...(phone && { phone }),
          ...(tin && { tin }),
          ...(location && { location }),
          ...(latitude && { latitude }),
          ...(longitude && { longitude }),
        },
      })
      return NextResponse.json({ supplier: updatedSupplier })
    } else if (action === 'delete') {
      const updatedSupplier = await prisma.supplier.update({
        where: { id: Number(id) },
        data: { isDeleted: true },  
      })
      await prisma.product.updateMany({
        where: { supplierId: Number(id) },
        data: { isDeleted: true },  
      })
      return NextResponse.json({ supplier: updatedSupplier });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error handling request' }, { status: 500 });
  }
}


