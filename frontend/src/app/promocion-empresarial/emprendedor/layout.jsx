import NavbarUser from "@/src/components/navbarUser"
import Link from 'next/link'

export default function EmprendedorLayout({ children }) {
    return (
      
        <div className="flex flex-row justify-between">
            <NavbarUser>
                <div className="flex flex-col">
                    <Link className='my-3 p-2 text-start rounded-lg  hover:bg-blue-600 transition duration-300' href="/promocion-empresarial/emprendedor/datos-emprendedor">
                        Datos Emprendedor
                    </Link>
                    <Link className='my-3 p-2 text-start rounded-lg hover:bg-blue-600 transition duration-300' href="/promocion-empresarial/emprendedor/datos-personales">
                        Datos Personales
                    </Link>
                    <Link className='my-3 p-2 text-start rounded-lg hover:bg-blue-600 transition duration-300' href="/promocion-empresarial/emprendedor/productos">
                        Productos
                    </Link>
                    <Link className='my-3 p-2 text-start rounded-lg hover:bg-blue-600 transition duration-300' href="/promocion-empresarial/emprendedor/marcas">
                        Marcas
                    </Link>
                    <Link className='my-3 p-2 text-start rounded-lg  hover:bg-blue-600 transition duration-300' href="#">
                        Cambiar Contraseña
                    </Link>
                </div>
            </NavbarUser >
          
           {children}
           
        </div >

    )


}
