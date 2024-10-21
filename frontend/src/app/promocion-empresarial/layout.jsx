import Navbar from "@/src/components/Navbar";  

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body style={{height:'100vh'}}>
                <Navbar /> 
                {children}
            </body>
        </html>
    );
}
