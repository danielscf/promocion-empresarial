package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.producto.ProductoDto;
import pe.utp.promocion_empresarial.dto.producto.ProductoRequestDto;
import pe.utp.promocion_empresarial.dto.producto.ProductoSinImagenesDto;
import pe.utp.promocion_empresarial.entidad.Producto;

import java.util.List;

public interface ProductoServicio {

    List<ProductoDto> findAllProductos();

    ProductoDto findProductoById(Long productoId);

    void eliminarProducto(Long productoId);

    Producto guardarCambiosProducto(Producto producto);

    List<ProductoDto> findProductosByEmprendedorId(Long emprendedorId);

    Producto editarProducto(Long emprendedorId, Long productoId, ProductoSinImagenesDto productoDto);
}
