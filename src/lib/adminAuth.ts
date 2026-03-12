import { cookies } from 'next/headers';

export async function verifyAdminToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('adminToken')?.value;
  return adminToken === process.env.ADMIN_SECRET;
}

export async function setAdminToken() {
  const cookieStore = await cookies();
  cookieStore.set('adminToken', process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  });
}

export async function clearAdminToken() {
  const cookieStore = await cookies();
  cookieStore.delete('adminToken');
}
