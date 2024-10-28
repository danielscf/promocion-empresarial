package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.tipoSolicitud.TipoSolicitudDto;
import pe.utp.promocion_empresarial.entidad.TipoSolicitud;

import java.util.List;

public interface TipoSolicitudServicio {

    List<TipoSolicitudDto> findAllTipoSolicitudes();

    TipoSolicitudDto findTipoSolicitudById(Long tipoSolicitudId);

    TipoSolicitud findTipoSolicitudByNombre(String nombre);

    TipoSolicitud guardarCambiosTipoSolicitud(TipoSolicitud tipoSolicitud);

    void eliminarTipoSolicitud(Long tipoSolicitudId);

}
