package pe.utp.promocion_empresarial.controlador;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pe.utp.promocion_empresarial.dto.solicitud.*;
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

    @GetMapping("/pendientes")
    public List<SolicitudPendienteDto> findSolicitudPendiente() {
        return solicitudServicio.findSolicitudPendiente();
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
        // TODO: Hash password
        // TODO: Mapper

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

    @PatchMapping("/{solicitudId}/aprobar")
    public ResponseEntity<Solicitud> aprobarSolicitud(@PathVariable Long solicitudId) {
        Solicitud solicitudAprobada = solicitudServicio.aprobarSolicitud(solicitudId);
        return ResponseEntity.ok()
                .body(solicitudAprobada);
    }

    @PatchMapping("/{solicitudId}/rechazar")
    public ResponseEntity<Solicitud> rechazarSolicitud(@PathVariable Long solicitudId) {
        Solicitud solicitudRechazada = solicitudServicio.rechazarSolicitud(solicitudId);
        return ResponseEntity.ok()
                .body(solicitudRechazada);
    }

    @DeleteMapping("/{solicitudId}")
    public ResponseEntity<Solicitud> eliminarSolicitud(@PathVariable Long solicitudId) {
        Solicitud solicitudEliminada = solicitudServicio.eliminarSolicitud(solicitudId);
        return ResponseEntity.ok()
                .body(solicitudEliminada);
    }

}
