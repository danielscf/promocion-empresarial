package pe.utp.promocion_empresarial.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.utp.promocion_empresarial.dto.tipoSolicitud.TipoSolicitudDto;
import pe.utp.promocion_empresarial.entidad.TipoSolicitud;

@Repository
public interface TipoSolicitudRepositorio extends JpaRepository<TipoSolicitud, Long> {

    List<TipoSolicitudDto> findAllBy();

    TipoSolicitudDto findByTipoSolicitudId(Long tipoSolicitudId);

    TipoSolicitud findByTipoSolicitudNombre(String tipoSolicitudNombre);

}
