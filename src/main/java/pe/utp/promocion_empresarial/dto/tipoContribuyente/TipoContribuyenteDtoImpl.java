package pe.utp.promocion_empresarial.dto.tipoContribuyente;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TipoContribuyenteDtoImpl implements TipoContribuyenteDto {

    private Long tipoContribuyenteId;
    private String tipoContribuyenteNombre;


    public TipoContribuyenteDtoImpl() {
    }

    public TipoContribuyenteDtoImpl(Long tipoContribuyenteId, String tipoContribuyenteNombre) {
        this.tipoContribuyenteId = tipoContribuyenteId;
        this.tipoContribuyenteNombre = tipoContribuyenteNombre;
    }

    @Override
    public Long getTipoContribuyenteId() {
        return tipoContribuyenteId;
    }

    @Override
    public String getTipoContribuyenteNombre() {
        return tipoContribuyenteNombre;
    }

    public void setTipoContribuyenteId(Long tipoContribuyenteId) {
        this.tipoContribuyenteId = tipoContribuyenteId;
    }

    public void setTipoContribuyenteNombre(String tipoContribuyenteNombre) {
        this.tipoContribuyenteNombre = tipoContribuyenteNombre;
    }
}
