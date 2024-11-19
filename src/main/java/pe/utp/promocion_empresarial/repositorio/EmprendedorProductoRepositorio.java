package pe.utp.promocion_empresarial.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.utp.promocion_empresarial.entidad.EmprendedorProducto;
import pe.utp.promocion_empresarial.entidad.EmprendedorProductoId;

import java.util.Optional;

public interface EmprendedorProductoRepositorio extends JpaRepository<EmprendedorProducto, EmprendedorProductoId> {

    Optional<EmprendedorProducto> findByEmprendedorEmprendedorIdAndProducto_ProductoId(Long emprendedorId, Long productoId);
}
