import Navbar from "@/src/components/Navbar";  

export default function PromocionEmpresarialLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-300" style={{height:'100vh'}}>
                <Navbar /> 
                {children}
            </body>
        </html>
    );
}
