import Link from 'next/link'
import React from 'react'

const navbarEmprendedor = () => {
  return (
    <div className='flex flex-col justify-center bg-gray-500 h-vh p-5 w-56 text-white'>
      <Link className='my-3 p-2 text-center rounded-lg  hover:bg-gray-600 transition duration-300' href="/promocion-empresarial/emprendedor/datos-emprendedor">
        Datos Emprendedor
      </Link>
      <Link className='my-3 p-2 text-center rounded-lg hover:bg-gray-600 transition duration-300' href="/promocion-empresarial/emprendedor/datos-personales">
        Datos Personales
      </Link>
      <Link className='my-3 p-2 text-center rounded-lg hover:bg-gray-600 transition duration-300' href="/promocion-empresarial/emprendedor/productos">
        Productos
      </Link>
      <Link className='my-3 p-2 text-center rounded-lg  hover:bg-gray-600 transition duration-300' href="#">
        Cambiar Contraseña
      </Link>
    </div>

  )
}

export default navbarEmprendedor