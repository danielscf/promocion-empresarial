package pe.utp.promocion_empresarial.dto.producto;

import pe.utp.promocion_empresarial.entidad.Marca;
import pe.utp.promocion_empresarial.entidad.TipoProducto;

public interface ProductoDto {

    Long getProductoId();

    String getProductoNombre();

    String getProductoDescripcion();

    Integer getProductoEstado();

//    TipoProducto getTipoProducto();

//    Marca getMarca();

}
