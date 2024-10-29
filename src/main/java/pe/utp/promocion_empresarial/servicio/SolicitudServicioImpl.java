package pe.utp.promocion_empresarial.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.solicitud.SolicitudDto;
import pe.utp.promocion_empresarial.dto.solicitud.SolicitudPendienteDto;
import pe.utp.promocion_empresarial.entidad.Solicitud;
import pe.utp.promocion_empresarial.entidad.Usuario;
import pe.utp.promocion_empresarial.repositorio.SolicitudRepositorio;
import pe.utp.promocion_empresarial.utils.Estado;

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
    public List<SolicitudPendienteDto> findSolicitudPendiente() {
        return solicitudRepositorio.findAllBySolicitudEstado(0);
    }

    @Override
    public Solicitud guardarCambiosSolicitud(Solicitud solicitud) {
        return solicitudRepositorio.save(solicitud);
    }

    @Override
    public Solicitud actualizarEstadoSolicitud(Long solicitudId, Integer solicitudEstado) {
        Solicitud informacionSolicitud = solicitudRepositorio.findById(solicitudId)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));
        informacionSolicitud.setSolicitudEstado(solicitudEstado);
        return solicitudRepositorio.save(informacionSolicitud);
    }

    @Override
    public Solicitud aprobarSolicitud(Long solicitudId) {
        Solicitud informacionSolicitud = actualizarEstadoSolicitud(solicitudId, Estado.ACTIVO.getValor());
        return solicitudRepositorio.save(informacionSolicitud);
    }

    @Override
    public Solicitud rechazarSolicitud(Long solicitudId) {
        Solicitud informacionSolicitud = actualizarEstadoSolicitud(solicitudId, Estado.INACTIVO.getValor());
        return solicitudRepositorio.save(informacionSolicitud);
    }

    @Override
    public Solicitud eliminarSolicitud(Long solicitudId) {
        Solicitud informacionSolicitud = actualizarEstadoSolicitud(solicitudId, Estado.ELIMINADO.getValor());
        return solicitudRepositorio.save(informacionSolicitud);
    }

}
