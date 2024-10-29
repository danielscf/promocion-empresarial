package pe.utp.promocion_empresarial.repositorio;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.utp.promocion_empresarial.dto.solicitud.SolicitudDto;
import pe.utp.promocion_empresarial.dto.solicitud.SolicitudPendienteDto;
import pe.utp.promocion_empresarial.entidad.Solicitud;

@Repository
public interface SolicitudRepositorio extends JpaRepository<Solicitud, Long> {

    List<SolicitudDto> findAllBy();

    SolicitudDto findBySolicitudId(Long solicitudId);

    List<SolicitudPendienteDto> findAllBySolicitudEstado(Integer solicitudEstado);

}
