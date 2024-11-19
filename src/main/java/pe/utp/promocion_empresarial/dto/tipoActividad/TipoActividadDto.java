package pe.utp.promocion_empresarial.dto.tipoActividad;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;


@JsonDeserialize(as = TipoActividadDtoImpl.class)
public interface TipoActividadDto {
    Long getTipoActividadId();

    String getTipoActividadNombre();
}
