import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('access-token')?.value;
  const signinURL = new URL('/auth/signin', request.url);

  if (!token) {
    return NextResponse.redirect(signinURL);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
