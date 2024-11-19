package pe.utp.promocion_empresarial.controlador;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
//import java.util.HashSet;
import java.util.List;
//import java.util.Set;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import pe.utp.promocion_empresarial.dto.solicitud.*;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioNuevoDto;
import pe.utp.promocion_empresarial.entidad.*;
import pe.utp.promocion_empresarial.repositorio.UsuarioRepositorio;
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
    private SolicitudServicioImpl solicitudServicioImpl;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

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

    @PostMapping(value = "/emprendedor/usuario", consumes = {"multipart/form-data"})
    public ResponseEntity<?> registrarSolicitudUsuarioEmprendedor(
            @RequestParam("foto") MultipartFile foto,
            @RequestParam("emprendedorRuc") String emprendedorRuc,
            @RequestParam("solicitud") String solicitudJson) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

            SolicitudNuevoEmprendedorDto solicitudNuevoEmprendedorDto = objectMapper.readValue(solicitudJson, SolicitudNuevoEmprendedorDto.class);

            Usuario usuarioExistente = usuarioRepositorio.findUsuarioByUsuarioUsuario(solicitudNuevoEmprendedorDto.getUsuario().getUsuarioUsuario());
            if (usuarioExistente != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El usuario con ese nombre de usuario ya existe");
            }

            UsuarioNuevoDto nuevoUsuario = solicitudServicioImpl.convertirADtoUsuario(solicitudNuevoEmprendedorDto.getUsuario());
            Usuario usuarioGuardado = usuarioServicio.guardarUsuario(nuevoUsuario);

            Emprendedor informacionEmprendedor = solicitudServicioImpl.convertirADtoEmprendedor(solicitudNuevoEmprendedorDto.getEmprendedor(), usuarioGuardado);

            if (!foto.isEmpty()) {
                String directorioFotos = "D:\\fotos";
                String nombreArchivo = emprendedorRuc + "_" + foto.getOriginalFilename();
                Path rutaFoto = Paths.get(directorioFotos).resolve(nombreArchivo).toAbsolutePath();
                Files.copy(foto.getInputStream(), rutaFoto, StandardCopyOption.REPLACE_EXISTING);
                informacionEmprendedor.setEmprendedorFoto(nombreArchivo);
            }

            Emprendedor emprendedorGuardado = emprendedorServicio.guardarCambiosEmprendedor(informacionEmprendedor);

            TipoSolicitud tipoSolicitud = tipoSolicitudServicio.findTipoSolicitudByNombre("Nuevo usuario emprendedor");
            Solicitud solicitudUsuario = new Solicitud();
            solicitudUsuario.setSolicitudDescripcion("Solicitud de nuevo usuario: " + usuarioGuardado.getUsuarioNombre() + " " + usuarioGuardado.getUsuarioApellidoPaterno() + " " + usuarioGuardado.getUsuarioApellidoMaterno());
            solicitudUsuario.setTipoSolicitud(tipoSolicitud);
            solicitudUsuario.setEmprendedor(emprendedorGuardado);
            solicitudUsuario.setUsuario(usuarioGuardado);

            Solicitud solicitudGuardada = solicitudServicio.guardarCambiosSolicitud(solicitudUsuario);

            return ResponseEntity.ok().body(solicitudGuardada);

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar: " + e.getMessage());
        }
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
