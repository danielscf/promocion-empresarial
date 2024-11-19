package pe.utp.promocion_empresarial.dto.producto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import pe.utp.promocion_empresarial.dto.tipoProducto.TipoProductoDto;

@JsonDeserialize(as = ProductoSinImagenesDtoImpl.class)
public interface ProductoSinImagenesDto {
    Long getProductoId();
    String getProductoNombre();
    String getProductoDescripcion();
    TipoProductoDto getTipoProducto();
}
