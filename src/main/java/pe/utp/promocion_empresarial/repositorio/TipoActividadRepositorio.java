package pe.utp.promocion_empresarial.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.utp.promocion_empresarial.dto.tipoActividad.TipoActividadDto;
import pe.utp.promocion_empresarial.entidad.TipoActividad;



@Repository
public interface TipoActividadRepositorio extends JpaRepository<TipoActividad, Long> {

    List<TipoActividadDto> findAllBy();

    TipoActividadDto findByTipoActividadId(Long tipoActividadId);

}
