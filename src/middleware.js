import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  // If token is missing and route is protected, redirect
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');

  if (!token && isAdminPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const user = jwt.verify(token, secret);

    // If not admin, prevent access to admin routes
    if (isAdminPage && !user.isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow access
    return NextResponse.next();
  } catch (error) {
    console.error('JWT validation failed:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Apply only to these routes:
export const config = {
  matcher: ['/admin/:path*'],
};
