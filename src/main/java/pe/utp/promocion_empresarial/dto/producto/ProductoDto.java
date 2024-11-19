package pe.utp.promocion_empresarial.dto.producto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import pe.utp.promocion_empresarial.dto.imagen.ImagenDto;
import pe.utp.promocion_empresarial.dto.tipoProducto.TipoProductoDto;

import java.util.List;

@JsonDeserialize(as = ProductoDtoImpl.class)
public interface ProductoDto {

    Long getProductoId();
    String getProductoNombre();
    String getProductoDescripcion();
    TipoProductoDto getTipoProducto();
    List<ImagenDto> getImagenes();

}
