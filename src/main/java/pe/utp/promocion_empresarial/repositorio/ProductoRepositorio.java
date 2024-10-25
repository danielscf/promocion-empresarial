package pe.utp.promocion_empresarial.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.utp.promocion_empresarial.dto.producto.ProductoDto;
import pe.utp.promocion_empresarial.entidad.Producto;

@Repository
public interface ProductoRepositorio extends JpaRepository<Producto, Long> {

    List<ProductoDto> findAllBy();

    ProductoDto findByProductoId(Long productoId);

}
