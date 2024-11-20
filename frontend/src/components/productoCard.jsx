import React from 'react'

const ProductoCard = ({producto}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center w-40">
            <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/imagen/${producto?.imagenes?.[0]?.imagenId}/foto`}
                alt={'Imagen del producto'}
                className="rounded mx-auto mb-4 h-40"
            />
            <div className="text-sm">
                <p><strong>{producto.productoNombre}</strong></p>
                <p>{producto.productoDescripcion}</p>
            </div>
        </div>
  )
}

export default ProductoCard
