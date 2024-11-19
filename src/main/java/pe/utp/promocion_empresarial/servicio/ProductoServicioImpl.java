package pe.utp.promocion_empresarial.servicio;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.imagen.ImagenDto;
import pe.utp.promocion_empresarial.dto.producto.ProductoDto;
import pe.utp.promocion_empresarial.dto.producto.ProductoRequestDto;
import pe.utp.promocion_empresarial.dto.producto.ProductoSinImagenesDto;
import pe.utp.promocion_empresarial.entidad.*;
import pe.utp.promocion_empresarial.repositorio.EmprendedorProductoRepositorio;
import pe.utp.promocion_empresarial.repositorio.ProductoRepositorio;
import pe.utp.promocion_empresarial.repositorio.TipoProductoRepositorio;

@Service
public class ProductoServicioImpl implements ProductoServicio {

    @Autowired
    ProductoRepositorio productoRepositorio;

    @Autowired
    TipoProductoRepositorio tipoProductoRepositorio;

    @Autowired
    EmprendedorProductoRepositorio emprendedorProductoRepositorio;

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
        try {

            TipoProducto tipoProducto = tipoProductoRepositorio.findById(producto.getTipoProducto().getTipoProductoId())
                    .orElseThrow(() -> new IllegalArgumentException("TipoProducto no encontrado"));
            producto.setTipoProducto(tipoProducto);

            return productoRepositorio.save(producto);
        } catch (Exception e) {
            throw new RuntimeException("Error al guardar el producto: " + e.getMessage(), e);
        }
    }


    @Override
    public Producto editarProducto(Long emprendedorId, Long productoId, ProductoSinImagenesDto productoDto) {
        Producto productoExistente = productoRepositorio.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + productoId));

        productoExistente.setProductoNombre(productoDto.getProductoNombre());
        productoExistente.setProductoDescripcion(productoDto.getProductoDescripcion());

        if (productoDto.getTipoProducto() != null) {
            TipoProducto tipoProducto = tipoProductoRepositorio.findById(productoDto.getTipoProducto().getTipoProductoId())
                    .orElseThrow(() -> new IllegalArgumentException("TipoProducto no encontrado"));
            productoExistente.setTipoProducto(tipoProducto);
        }

        return productoRepositorio.save(productoExistente);
    }

    @Override
    public void eliminarProducto(Long productoId) {
        productoRepositorio.deleteById(productoId);
    }

    @Override
    public List<ProductoDto> findProductosByEmprendedorId(Long emprendedorId) {
        return productoRepositorio.findByEmprendedores_EmprendedorId(emprendedorId);
    }

}
