package pe.utp.promocion_empresarial.dto.imagen;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import pe.utp.promocion_empresarial.dto.producto.ProductoDto;

@JsonDeserialize(as = ImagenDtoImpl.class)
public interface ImagenDto {

    Long getImagenId();

    String getImagenUrl();

}
