package pe.utp.promocion_empresarial.dto.producto;

import pe.utp.promocion_empresarial.dto.imagen.ImagenDto;
import pe.utp.promocion_empresarial.dto.marca.MarcaDto;
import pe.utp.promocion_empresarial.dto.tipoProducto.TipoProductoDto;

public interface ProductoDetailsDto {

    Long getProductoId();

    String getProductoNombre();

    String getProductoDescripcion();

    TipoProductoDto getTipoProducto();

    MarcaDto getMarca();

    ImagenDto getImagenes();
}
