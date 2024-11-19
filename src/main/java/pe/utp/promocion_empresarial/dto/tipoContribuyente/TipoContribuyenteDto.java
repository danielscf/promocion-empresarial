package pe.utp.promocion_empresarial.dto.tipoContribuyente;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;


@JsonDeserialize(as = TipoContribuyenteDtoImpl.class)
public interface TipoContribuyenteDto {

    Long getTipoContribuyenteId();

    String getTipoContribuyenteNombre();
}
