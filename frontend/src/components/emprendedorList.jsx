import React from 'react'
import EmprendedorCard from './emprendedorCard'
import Link from 'next/link'
const EmprendedorList = ({ emprendedores }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {emprendedores.map((emprendedor) => (
        <Link
          href={`/promocion-empresarial/emprendedores/${emprendedor.emprendedorId}`}
          key={emprendedor.emprendedorId} 
        >
          <EmprendedorCard emprendedor={emprendedor} />
        </Link>
      ))}
    </div>
  )
}

export default EmprendedorList
