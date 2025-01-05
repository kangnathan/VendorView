import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import JWTService from '@/lib/jwtService';
import { validateSignup } from '@/app/utils/validateSignUp';

export async function POST(req) {
  const formData = await req.json();
  const { name, email, password } = formData;

  const errors = await validateSignup({ name, email, password });
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors, success: false }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email is already in use.', success: false }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = JWTService.sign({ userId: newUser.id, email: newUser.email });

    const response = NextResponse.json({ success: true });
    response.cookies.set('vendor-view', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,  
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error); 

    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email is already in use.', success: false }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error.', success: false }, { status: 500 });
  }
}
