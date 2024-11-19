package pe.utp.promocion_empresarial.dto.rubro;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;


@JsonDeserialize(as = RubroDtoImpl.class)
public interface RubroDto {
    Long getRubroId();

    String getRubroNombre();


}
