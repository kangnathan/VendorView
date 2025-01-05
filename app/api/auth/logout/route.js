import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
    
    response.cookies.set('vendor-view', '', {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 0,
      secure: process.env.NODE_ENV === 'production', 
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error); 

    return NextResponse.json({ error: 'Internal server error.', success: false }, { status: 500 });
  }
}
