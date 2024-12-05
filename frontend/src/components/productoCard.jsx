import { useState } from "react";
import Image from "next/image";
import { cambiarEstadoProducto } from "@/api/productoApi";

const ProductoCard = ({ producto, showCheckbox }) => {
  const [isChecked, setIsChecked] = useState(producto.productoEstado === 2);

  const handleCheckboxChange = async () => {
    const nuevoEstado = isChecked ? 0 : 2; // 0: Pendiente, 2: Activo
    try {
      await cambiarEstadoProducto(producto.productoId, nuevoEstado);
      setIsChecked(!isChecked); 
    } catch (error) {
      console.error("Error al cambiar el estado del producto:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center w-40 flex flex-col items-center">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/imagen/${producto?.imagenes?.[0]?.imagenId}/foto`}
        alt="Imagen del producto"
        className="rounded mb-4 h-40"
        width={130}
        height={150}
      />
      <div className="text-sm text-center">
        <p className="font-bold">{producto.productoNombre}</p>
        <p>{producto.productoDescripcion}</p>
      </div>
      {showCheckbox && (
        <div className="mt-4">
          <input
            type="checkbox"
            id={`checkbox-${producto.productoId}`}
            className="mr-2"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`checkbox-${producto.productoId}`} className="text-sm">
            ¿Es esta imagen correcta?
          </label>
        </div>
      )}
    </div>
  );
};

export default ProductoCard;
