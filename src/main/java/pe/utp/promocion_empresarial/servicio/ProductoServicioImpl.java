package pe.utp.promocion_empresarial.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.producto.ProductoDto;
import pe.utp.promocion_empresarial.entidad.Producto;
import pe.utp.promocion_empresarial.repositorio.ProductoRepositorio;

@Service
public class ProductoServicioImpl implements ProductoServicio {

    @Autowired
    ProductoRepositorio productoRepositorio;

    @Override
    public List<ProductoDto> findAllProductos() {
        return productoRepositorio.findAllBy();
    }

    @Override
    public ProductoDto findProductoById(Long productoId) {
        return productoRepositorio.findByProductoId(productoId);
    }

    @Override
    public Producto guardarCambiosProducto(Producto producto) {
        return productoRepositorio.save(producto);
    }

    @Override
    public void eliminarProducto(Long productoId) {
        productoRepositorio.deleteById(productoId);
    }

}
