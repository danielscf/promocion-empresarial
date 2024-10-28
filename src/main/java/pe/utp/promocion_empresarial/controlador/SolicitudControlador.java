package pe.utp.promocion_empresarial.controlador;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.utp.promocion_empresarial.dto.solicitud.DatosNuevoEmprendedorDto;
import pe.utp.promocion_empresarial.dto.solicitud.DatosPersonalesUsuarioDto;
import pe.utp.promocion_empresarial.dto.solicitud.SolicitudDto;
import pe.utp.promocion_empresarial.dto.solicitud.SolicitudNuevoEmprendedorDto;
import pe.utp.promocion_empresarial.entidad.*;
import pe.utp.promocion_empresarial.servicio.*;

@RestController
@RequestMapping("/solicitud")
public class SolicitudControlador {

    @Autowired
    private SolicitudServicio solicitudServicio;

    @Autowired
    private TipoSolicitudServicio tipoSolicitudServicio;

    @Autowired
    private RolServicio rolServicio;

    @Autowired
    private UsuarioServicio usuarioServicio;

    @Autowired
    private EmprendedorServicio emprendedorServicio;

    @GetMapping
    public List<SolicitudDto> findAllSolicitudes() {
        return solicitudServicio.findAllSolicitudes();
    }

    @GetMapping("/{solicitudId}")
    public ResponseEntity<SolicitudDto> findSolicitudById(@PathVariable Long solicitudId) {
        SolicitudDto solicitudDto = solicitudServicio.findSolicitudById(solicitudId);
        return ResponseEntity.ok()
                .body(solicitudDto);
    }

    @PostMapping
    public ResponseEntity<Solicitud> guardarSolicitud(@RequestBody Solicitud solicitud) {
        Solicitud solicitudGuardado = solicitudServicio.guardarCambiosSolicitud(solicitud);
        return ResponseEntity.ok()
                .body(solicitudGuardado);
    }

    @PostMapping("/emprendedor/usuario")
    public ResponseEntity<Solicitud> registrarSolicitudUsuarioEmprendedor(@RequestBody SolicitudNuevoEmprendedorDto solicitudNuevoEmprendedorDto) {
        Usuario informacionUsuario = new Usuario();
        Emprendedor informacionEmprendedor = new Emprendedor();
        Solicitud solicitudUsuario = new Solicitud();

        Rol rol = rolServicio.findRolByNombre("Emprendedor");
        Set<Rol> roles = new HashSet<Rol>();
        roles.add(rol);

        DatosPersonalesUsuarioDto datosUsuario = solicitudNuevoEmprendedorDto.getUsuario();
        String credencialesTemporal = "TEMP" + datosUsuario.getUsuarioDni() + datosUsuario.getUsuarioNombre();

        informacionUsuario.setUsuarioUsuario(credencialesTemporal);
        informacionUsuario.setUsuarioContrasena(credencialesTemporal);
        informacionUsuario.setUsuarioDni(datosUsuario.getUsuarioDni());
        informacionUsuario.setUsuarioNombre(datosUsuario.getUsuarioNombre());
        informacionUsuario.setUsuarioApellidoPaterno(datosUsuario.getUsuarioApellidoPaterno());
        informacionUsuario.setUsuarioApellidoMaterno(datosUsuario.getUsuarioApellidoMaterno());
        informacionUsuario.setUsuarioCorreo(datosUsuario.getUsuarioCorreo());
        informacionUsuario.setUsuarioTelefono(datosUsuario.getUsuarioTelefono());
        informacionUsuario.setUsuarioFechaNacimiento(datosUsuario.getUsuarioFechaNacimiento());
        informacionUsuario.setRoles(roles);

        Usuario usuarioGuardado = usuarioServicio.guardarCambiosUsuario(informacionUsuario);

        DatosNuevoEmprendedorDto datosEmprendedor = solicitudNuevoEmprendedorDto.getEmprendedor();
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

        Emprendedor emprendedorGuardado = emprendedorServicio.guardarCambiosEmprendedor(informacionEmprendedor);

        TipoSolicitud tipoSolicitud = tipoSolicitudServicio.findTipoSolicitudByNombre("Nuevo usuario emprendedor");
        String solicitudDescripcion = "Solicitud de nuevo usuario: " +
                informacionUsuario.getUsuarioNombre() +
                informacionUsuario.getUsuarioApellidoPaterno() +
                informacionUsuario.getUsuarioApellidoMaterno();

        solicitudUsuario.setSolicitudDescripcion(solicitudDescripcion);
        solicitudUsuario.setTipoSolicitud(tipoSolicitud);
        solicitudUsuario.setEmprendedor(emprendedorGuardado);

        Solicitud solicitudGuardada = solicitudServicio.guardarCambiosSolicitud(solicitudUsuario);

        return ResponseEntity.ok()
                .body(solicitudGuardada);
    }

    @PutMapping
    public ResponseEntity<Solicitud> editarSolicitud(@RequestBody Solicitud solicitud) {
        Solicitud solicitudGuardado = solicitudServicio.guardarCambiosSolicitud(solicitud);
        return ResponseEntity.ok()
                .body(solicitudGuardado);
    }

    @DeleteMapping("/{solicitudId}")
    public ResponseEntity<Void> eliminarSolicitud(@PathVariable Long solicitudId) {
        solicitudServicio.eliminarSolicitud(solicitudId);
        return ResponseEntity.noContent()
                .build();
    }

}
