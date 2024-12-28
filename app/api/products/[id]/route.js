import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
  const { id } = await params;
  const { action, ...data } = await req.json();  

  try {
    if (action === 'update') {
      const { name, price, type } = data;
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          ...(name && { name }),
          ...(price && { price }),
          ...(type && { type }),
        },
      });
      return NextResponse.json({ product: updatedProduct });
    } else if (action === 'delete') {
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: { isDeleted: true },  
      });
      return NextResponse.json({ product: updatedProduct });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error handling request' }, { status: 500 });
  }
}

