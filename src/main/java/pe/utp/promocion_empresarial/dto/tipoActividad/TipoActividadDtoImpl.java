package pe.utp.promocion_empresarial.dto.tipoActividad;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TipoActividadDtoImpl implements TipoActividadDto {

    private Long tipoActividadId;
    private String tipoActividadNombre;

    public TipoActividadDtoImpl() {
    }

    public TipoActividadDtoImpl(Long tipoActividadId, String tipoActividadNombre) {
        this.tipoActividadId = tipoActividadId;
        this.tipoActividadNombre = tipoActividadNombre;
    }

    @Override
    public Long getTipoActividadId() {
        return tipoActividadId;
    }

    @Override
    public String getTipoActividadNombre() {
        return tipoActividadNombre;
    }

    public void setTipoActividadId(Long tipoActividadId) {
        this.tipoActividadId = tipoActividadId;
    }

    public void setTipoActividadNombre(String tipoActividadNombre) {
        this.tipoActividadNombre = tipoActividadNombre;
    }
}

