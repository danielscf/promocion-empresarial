package pe.utp.promocion_empresarial.dto.rubro;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RubroDtoImpl implements RubroDto {

    private Long rubroId;
    private String rubroNombre;

    public RubroDtoImpl() {
    }

    public RubroDtoImpl(Long rubroId, String rubroNombre) {
        this.rubroId = rubroId;
        this.rubroNombre = rubroNombre;
    }

    @Override
    public Long getRubroId() {
        return rubroId;
    }

    @Override
    public String getRubroNombre() {
        return rubroNombre;
    }

    public void setRubroId(Long rubroId) {
        this.rubroId = rubroId;
    }

    public void setRubroNombre(String rubroNombre) {
        this.rubroNombre = rubroNombre;
    }
}
