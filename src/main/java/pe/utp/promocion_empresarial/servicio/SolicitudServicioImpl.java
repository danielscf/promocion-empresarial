package pe.utp.promocion_empresarial.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.solicitud.SolicitudDto;
import pe.utp.promocion_empresarial.entidad.Solicitud;
import pe.utp.promocion_empresarial.repositorio.SolicitudRepositorio;

@Service
public class SolicitudServicioImpl implements SolicitudServicio {

    @Autowired
    SolicitudRepositorio solicitudRepositorio;

    @Override
    public List<SolicitudDto> findAllSolicitudes() {
        return solicitudRepositorio.findAllBy();
    }

    @Override
    public SolicitudDto findSolicitudById(Long solicitudId) {
        return solicitudRepositorio.findBySolicitudId(solicitudId);
    }

    @Override
    public Solicitud guardarCambiosSolicitud(Solicitud solicitud) {
        return solicitudRepositorio.save(solicitud);
    }

    @Override
    public void eliminarSolicitud(Long solicitudId) {
        solicitudRepositorio.deleteById(solicitudId);
    }

}