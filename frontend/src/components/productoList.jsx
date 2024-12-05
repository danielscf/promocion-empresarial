import React from 'react'
import ProductoCard from './productoCard'

const ProductoList = ({ productos, showCheckbox = false }) => {
    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {productos.map(producto => (
                <ProductoCard 
                key={producto.productoId} 
                producto={producto} 
                showCheckbox={showCheckbox} />
            ))}
        </div>
    )
}

export default ProductoList
