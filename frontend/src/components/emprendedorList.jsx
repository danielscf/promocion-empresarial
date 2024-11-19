import React from 'react'
import EmprendedorCard from './emprendedorCard'
const EmprendedorList = ({emprendedores}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
       {emprendedores.map(emprendedor => (
         <EmprendedorCard key={emprendedor.emprendedorId} emprendedor={emprendedor} />
       ))}
    </div>
  )
}

export default EmprendedorList
