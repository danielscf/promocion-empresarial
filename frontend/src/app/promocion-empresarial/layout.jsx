'use client'
import Navbar from "@/src/components/Navbar";
import { AuthProvider } from "@/src/context/AuthContext";

export default function PromocionEmpresarialLayout({ children }) {
    return (
        <>

            <Navbar />
            {children}

        </>

    );
}
