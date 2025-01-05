import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import JWTService from '@/lib/jwtService';

export async function POST(req) {
  const formData = await req.json();
  const { email, password } = formData;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.', success: false }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password.', success: false }, { status: 400 });
    }

    const token = JWTService.sign({ userId: user.id, email: user.email });

    const response = NextResponse.json({ success: true });
    response.cookies.set('vendor-view', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,  
      secure: process.env.NODE_ENV === 'production', 
    });

    return response;
  } catch (error) {
    console.error('Signin error:', error); 

    return NextResponse.json({ error: 'Internal server error.', success: false }, { status: 500 });
  }
}
