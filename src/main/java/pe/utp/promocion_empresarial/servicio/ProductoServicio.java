package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.producto.ProductoDto;
import pe.utp.promocion_empresarial.entidad.Producto;

import java.util.List;

public interface ProductoServicio {

    List<ProductoDto> findAllProductos();

    ProductoDto findProductoById(Long productoId);

    Producto guardarCambiosProducto(Producto producto);

    void eliminarProducto(Long productoId);

}
