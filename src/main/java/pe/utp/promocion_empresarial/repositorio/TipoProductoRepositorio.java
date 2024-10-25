package pe.utp.promocion_empresarial.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.utp.promocion_empresarial.dto.tipoProducto.TipoProductoDto;
import pe.utp.promocion_empresarial.entidad.TipoProducto;

@Repository
public interface TipoProductoRepositorio extends JpaRepository<TipoProducto, Long> {

    List<TipoProductoDto> findAllBy();

    TipoProductoDto findByTipoProductoId(Long tipoProductoId);

}
