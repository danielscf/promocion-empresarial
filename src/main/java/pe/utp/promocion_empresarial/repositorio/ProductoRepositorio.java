package pe.utp.promocion_empresarial.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import pe.utp.promocion_empresarial.dto.producto.ProductoDto;
import pe.utp.promocion_empresarial.dto.producto.ProductoSinImagenesDto;
import pe.utp.promocion_empresarial.entidad.Producto;
import pe.utp.promocion_empresarial.entidad.TipoProducto;

@Repository
public interface ProductoRepositorio extends JpaRepository<Producto, Long> {

    List<ProductoDto> findAllBy();

    ProductoDto findByProductoId(Long productoId);


    List<ProductoDto> findByEmprendedores_EmprendedorId(Long emprendedorId);

    ProductoSinImagenesDto findProductoWithoutImagesByProductoId(Long productoId);


}
