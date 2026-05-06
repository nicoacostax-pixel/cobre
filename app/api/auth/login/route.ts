import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', process.env.ADMIN_SECRET!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return Response.json({ ok: true })
  }

  return Response.json({ error: 'Credenciales incorrectas' }, { status: 401 })
}
