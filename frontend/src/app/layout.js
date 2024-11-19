'use client'

import localFont from "next/font/local";
import "./styles/globals.css";
import { Provider } from 'react-redux';
import { store } from "../store/store";
import { AuthProvider } from "../context/AuthContext";
import { EmprendedorProvider } from "../context/EmprendedorContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: '100vh' }}>
      <body style={{ height: '100vh' }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <AuthProvider>
            <EmprendedorProvider>
              {children}
            </EmprendedorProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>

  );
}
