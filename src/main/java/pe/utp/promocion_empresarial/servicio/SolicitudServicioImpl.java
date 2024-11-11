package pe.utp.promocion_empresarial.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.solicitud.DatosNuevoEmprendedorDto;
import pe.utp.promocion_empresarial.dto.solicitud.DatosPersonalesUsuarioDto;
import pe.utp.promocion_empresarial.dto.solicitud.SolicitudDto;
import pe.utp.promocion_empresarial.dto.solicitud.SolicitudPendienteDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioNuevoDto;
import pe.utp.promocion_empresarial.entidad.Emprendedor;
import pe.utp.promocion_empresarial.entidad.Rol;
import pe.utp.promocion_empresarial.entidad.Solicitud;
import pe.utp.promocion_empresarial.entidad.Usuario;
import pe.utp.promocion_empresarial.repositorio.RolRepositorio;
import pe.utp.promocion_empresarial.repositorio.SolicitudRepositorio;
import pe.utp.promocion_empresarial.utils.Estado;

@Service
public class SolicitudServicioImpl implements SolicitudServicio {

    @Autowired
    SolicitudRepositorio solicitudRepositorio;

    @Autowired
    RolRepositorio rolRepositorio;

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
        return solicitudRepositorio.findAllBySolicitudEstado(Estado.PENDIENTE.getValor());
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

    public UsuarioNuevoDto convertirADtoUsuario(DatosPersonalesUsuarioDto datosUsuario) {
        UsuarioNuevoDto nuevoUsuario = new UsuarioNuevoDto();
        nuevoUsuario.setUsuarioUsuario(datosUsuario.getUsuarioUsuario());
        nuevoUsuario.setUsuarioContrasena(datosUsuario.getUsuarioContrasena());
        nuevoUsuario.setUsuarioDni(datosUsuario.getUsuarioDni());
        nuevoUsuario.setUsuarioNombre(datosUsuario.getUsuarioNombre());
        nuevoUsuario.setUsuarioApellidoPaterno(datosUsuario.getUsuarioApellidoPaterno());
        nuevoUsuario.setUsuarioApellidoMaterno(datosUsuario.getUsuarioApellidoMaterno());
        nuevoUsuario.setUsuarioCorreo(datosUsuario.getUsuarioCorreo());
        nuevoUsuario.setUsuarioTelefono(datosUsuario.getUsuarioTelefono());
        nuevoUsuario.setUsuarioFechaNacimiento(datosUsuario.getUsuarioFechaNacimiento());
        Rol rol = rolRepositorio.findByRolNombre("Emprendedor");
        nuevoUsuario.setRolId(rol.getRolId());
        return nuevoUsuario;
    }


    public Emprendedor convertirADtoEmprendedor(DatosNuevoEmprendedorDto datosEmprendedor, Usuario usuarioGuardado) {
        Emprendedor informacionEmprendedor = new Emprendedor();
        informacionEmprendedor.setEmprendedorRuc(datosEmprendedor.getEmprendedorRuc());
        informacionEmprendedor.setEmprendedorDireccion(datosEmprendedor.getEmprendedorDireccion());
        informacionEmprendedor.setEmprendedorRazonSocial(datosEmprendedor.getEmprendedorRazonSocial());
        informacionEmprendedor.setEmprendedorEstadoContribuyente(datosEmprendedor.getEmprendedorEstadoContribuyente());
        informacionEmprendedor.setEmprendedorCondicionContribuyente(datosEmprendedor.getEmprendedorCondicionContribuyente());
        informacionEmprendedor.setEmprendedorFoto(datosEmprendedor.getEmprendedorFoto());
        informacionEmprendedor.setUsuario(usuarioGuardado);
        informacionEmprendedor.setRubro(datosEmprendedor.getRubro());
        informacionEmprendedor.setTipoContribuyente(datosEmprendedor.getTipoContribuyente());
        informacionEmprendedor.setTipoActividad(datosEmprendedor.getTipoActividad());
        return informacionEmprendedor;
    }
}
