package pe.utp.promocion_empresarial.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.tipoProducto.TipoProductoDto;
import pe.utp.promocion_empresarial.entidad.TipoProducto;
import pe.utp.promocion_empresarial.repositorio.TipoProductoRepositorio;

@Service
public class TipoProductoServicioImpl implements TipoProductoServicio {

    @Autowired
    TipoProductoRepositorio tipoProductoRepositorio;

    @Override
    public List<TipoProductoDto> findAllTipoProducto() {
        return tipoProductoRepositorio.findAllBy();
    }

    @Override
    public TipoProductoDto findTipoProductoById(Long tipoProductoId) {
        return tipoProductoRepositorio.findByTipoProductoId(tipoProductoId);
    }

    @Override
    public TipoProducto guardarCambiosTipoProducto(TipoProducto tipoProducto) {
        return tipoProductoRepositorio.save(tipoProducto);
    }

    @Override
    public void eliminarTipoProducto(Long tipoProductoId) {
        tipoProductoRepositorio.deleteById(tipoProductoId);
    }

}
