package pe.utp.promocion_empresarial.dto.tipoProducto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import pe.utp.promocion_empresarial.dto.producto.ProductoDtoImpl;

@JsonDeserialize(as = TipoProductoDtoImpl.class)
public interface TipoProductoDto {

    Long getTipoProductoId();

    String getTipoProductoNombre();

}
