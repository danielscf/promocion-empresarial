package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.solicitud.SolicitudDto;
import pe.utp.promocion_empresarial.dto.solicitud.SolicitudPendienteDto;
import pe.utp.promocion_empresarial.entidad.Solicitud;

import java.util.List;

public interface SolicitudServicio {

    List<SolicitudDto> findAllSolicitudes();

    SolicitudDto findSolicitudById(Long solicitudId);

    List<SolicitudPendienteDto> findSolicitudPendiente();

    Solicitud guardarCambiosSolicitud(Solicitud solicitud);

    void eliminarSolicitud(Long solicitudId);

}
