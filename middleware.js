import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import * as jose from 'jose'

const jwtSecret = process.env.JWT_SECRET

export async function middleware(request) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('vendor-view');

  if (!cookie) {
    return NextResponse.redirect(
      new URL('/', request.url)
    );
  }

  try {
    const decoded = jose.decodeJwt(cookie.value);
    
    await jose.jwtVerify(cookie.value, new TextEncoder().encode(jwtSecret));

    const userId = decoded.userId;  

    if (!userId) {
      return NextResponse.redirect(new URL('/', request.url))
    }

  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/home',
    '/suppliers',
    '/products',
    '/supplier-create-page',
    '/product-create-page',
    '/supplier-edit-page/',
    '/product-edit-page/',
    '/supplier-page',
    '/location',
    '/security',
  ]
}
