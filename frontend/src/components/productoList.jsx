import React from 'react'
import ProductoCard from './productoCard'

const ProductoList = ({ productos }) => {
    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {productos.map(producto => (
                <ProductoCard key={producto.productoId} producto={producto} />
            ))}
        </div>
    )
}

export default ProductoList
