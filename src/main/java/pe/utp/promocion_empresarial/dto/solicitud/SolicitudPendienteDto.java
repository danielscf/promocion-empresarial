package pe.utp.promocion_empresarial.dto.solicitud;

import pe.utp.promocion_empresarial.dto.tipoSolicitud.TipoSolicitudDto;

import java.time.Instant;

public interface SolicitudPendienteDto {
    Long getSolicitudId();
    String getSolicitudDescripcion();
    Integer getSolicitudEstado();
    Instant getSolicitudFechaCreacion();
    TipoSolicitudDto getTipoSolicitud();
}
