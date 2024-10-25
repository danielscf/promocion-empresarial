package pe.utp.promocion_empresarial.servicio;


import pe.utp.promocion_empresarial.dto.tipoActividad.TipoActividadDto;
import pe.utp.promocion_empresarial.entidad.TipoActividad;

import java.util.List;

public interface TipoActividadServicio {
    List<TipoActividadDto> findAllTipoActividades();

    TipoActividadDto findTipoActividadById(Long TipoActividadId);

    TipoActividad guardarCambiosTipoActividad(TipoActividad TipoActividad);

    void eliminarTipoActividad(Long TipoActividadId);
}
