package pe.utp.promocion_empresarial.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.tipoSolicitud.TipoSolicitudDto;
import pe.utp.promocion_empresarial.entidad.TipoSolicitud;
import pe.utp.promocion_empresarial.repositorio.TipoSolicitudRepositorio;

@Service
public class TipoSolicitudServicioImpl implements TipoSolicitudServicio {

    @Autowired
    TipoSolicitudRepositorio tipoSolicitudRepositorio;

    @Override
    public List<TipoSolicitudDto> findAllTipoSolicitudes() {
        return tipoSolicitudRepositorio.findAllBy();
    }

    @Override
    public TipoSolicitudDto findTipoSolicitudById(Long tipoSolicitudId) {
        return tipoSolicitudRepositorio.findByTipoSolicitudId(tipoSolicitudId);
    }

    @Override
    public TipoSolicitud findTipoSolicitudByNombre(String tipoSolicitudNombre) {
        return tipoSolicitudRepositorio.findByTipoSolicitudNombre(tipoSolicitudNombre);
    }

    @Override
    public TipoSolicitud guardarCambiosTipoSolicitud(TipoSolicitud tipoSolicitud) {
        return tipoSolicitudRepositorio.save(tipoSolicitud);
    }

    @Override
    public void eliminarTipoSolicitud(Long tipoSolicitudId) {
        tipoSolicitudRepositorio.deleteById(tipoSolicitudId);
    }

}
