import NavbarEmprendedor from "@/src/components/navbarEmprendedor";

export default function EmprendedorLayout({ children }) {
    return (
        <>
            <div className="flex flex-row justify-between">
                <NavbarEmprendedor />
                {children}
            </div>


        </>
    )


}
