package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.tipoProducto.TipoProductoDto;
import pe.utp.promocion_empresarial.entidad.TipoProducto;

import java.util.List;

public interface TipoProductoServicio {

    List<TipoProductoDto> findAllTipoProducto();

    TipoProductoDto findTipoProductoById(Long tipoProductoId);

    TipoProducto guardarCambiosTipoProducto(TipoProducto tipoProducto);

    void eliminarTipoProducto(Long tipoProductoId);

}
