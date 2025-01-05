import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const cookieManager = await cookies();
    cookieManager.delete('vendor-view', { path: '/' });
    return NextResponse.redirect(new URL('/', req.url));
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
