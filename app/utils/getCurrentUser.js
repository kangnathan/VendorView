import { cookies } from 'next/headers'
import JWTService from '@/lib/jwtService'

export async function getCurrentUser(req) {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('vendor-view')
  const token = cookie ? cookie.value : null

  if (!token) {
    return
  }

  try {
    const decoded = JWTService.verify(token);
    return { userId: decoded.userId }
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}
