import { NextResponse } from 'next/server';

export function middleware(request) {
  // Obtener el token de las cookies
  const token = request.cookies.get('token'); 

  //console.log('Token:', token);  
  if (!token) {
    //console.log('No token found, redirecting...');  
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// Configuración del middleware
export const config = {
  matcher: ['/promocion-empresarial/:path*'],
};
