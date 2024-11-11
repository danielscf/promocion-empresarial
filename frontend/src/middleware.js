import { NextResponse } from 'next/server';

export function middleware(request) {

const token = request.cookies.get('token');
const expiration = request.cookies.get('tokenExpiration');


if (!token || !expiration) {
  return NextResponse.redirect(new URL('/', request.url));
}

console.log("Token en middleware:", token);
const expirationDate = new Date(parseInt(expiration, 10));
const currentDate = new Date();

if (currentDate > expirationDate) {
  return NextResponse.redirect(new URL('/', request.url));
}

return NextResponse.next();
}

// Configuración del middleware
export const config = {
matcher: ['/promocion-empresarial/:path*'],
};
