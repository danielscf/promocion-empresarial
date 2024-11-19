package pe.utp.promocion_empresarial.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.utp.promocion_empresarial.entidad.Emprendedor;
import pe.utp.promocion_empresarial.entidad.EmprendedorProducto;
import pe.utp.promocion_empresarial.entidad.EmprendedorProductoId;
import pe.utp.promocion_empresarial.entidad.Producto;
import pe.utp.promocion_empresarial.repositorio.EmprendedorProductoRepositorio;
import pe.utp.promocion_empresarial.repositorio.EmprendedorRepositorio;
import pe.utp.promocion_empresarial.repositorio.ProductoRepositorio;

import java.util.Optional;

@Service
public class EmprendedorProductoServicioImpl implements  EmprendedorProductoServicio{

    @Autowired
    private EmprendedorProductoRepositorio emprendedorProductoRepositorio;

    @Autowired
    EmprendedorRepositorio emprendedorRepositorio;

    @Autowired
    ProductoRepositorio productoRepositorio;

    @Override
    public EmprendedorProducto asociarProductoAEmprendedor(Long emprendedorId, Long productoId) {
        Optional<EmprendedorProducto> relacionExistente = emprendedorProductoRepositorio.findByEmprendedorEmprendedorIdAndProducto_ProductoId(emprendedorId, productoId);

        if (relacionExistente.isPresent()) {
            throw new RuntimeException("La relación entre el emprendedor y el producto ya existe");
        }

        Emprendedor emprendedor = emprendedorRepositorio.findById(emprendedorId)
                .orElseThrow(() -> new RuntimeException("Emprendedor no encontrado"));

        Producto producto = productoRepositorio.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        EmprendedorProducto nuevaRelacion = new EmprendedorProducto(emprendedor, producto);
        return emprendedorProductoRepositorio.save(nuevaRelacion);
    }

    @Override
    public void eliminarRelacion(Long emprendedorId, Long productoId) {
        EmprendedorProductoId id = new EmprendedorProductoId(emprendedorId, productoId);
        emprendedorProductoRepositorio.deleteById(id);
    }

}
