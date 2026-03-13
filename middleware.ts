import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin dashboard and judge portal routes
  if (pathname.startsWith('/admin/dashboard') || pathname.startsWith('/admin/judge-portal')) {
    const adminToken = request.cookies.get('adminToken')?.value;
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminToken || adminToken !== adminSecret) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
};
