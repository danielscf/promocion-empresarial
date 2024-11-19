package pe.utp.promocion_empresarial.controlador;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorDto;
import pe.utp.promocion_empresarial.entidad.*;
import pe.utp.promocion_empresarial.repositorio.EmprendedorRepositorio;
import pe.utp.promocion_empresarial.servicio.EmprendedorServicio;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/emprendedor")
public class EmprendedorControlador {

    @Autowired
    EmprendedorServicio emprendedorServicio;

    @Autowired
    EmprendedorRepositorio emprendedorRepositorio;

    @GetMapping
    public List<EmprendedorDto> findAllEmprendedores() {
        return emprendedorServicio.findAllEmprendedores();
    }

    @GetMapping("/{emprendedorId}")
    public ResponseEntity<EmprendedorDto> findEmprendedorById(@PathVariable Long emprendedorId) {
        EmprendedorDto emprendedorDto = emprendedorServicio.findEmprendedorById(emprendedorId);
        return ResponseEntity.ok()
                .body(emprendedorDto);
    }

    @GetMapping("/usuario/{username}")
    public ResponseEntity<EmprendedorDto> findEmprendedorByUsername(@PathVariable String username) {
        Optional<EmprendedorDto> emprendedorDto = emprendedorServicio.findByUsuarioUsername(username);
        return emprendedorDto.map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Emprendedor no encontrado"));
    }

    @GetMapping("/{emprendedorId}/foto")
    public ResponseEntity<Resource> getFotoEmprendedor(@PathVariable Long emprendedorId) throws IOException {
        Emprendedor emprendedor = emprendedorRepositorio.findById(emprendedorId)
                .orElseThrow(() -> new RuntimeException("Emprendedor no encontrado"));

        String nombreArchivo = emprendedor.getEmprendedorFoto();
        Path rutaFoto = Paths.get("D:\\fotos").resolve(nombreArchivo).toAbsolutePath();
        Resource recurso = new UrlResource(rutaFoto.toUri());

        if (!recurso.exists() || !recurso.isReadable()) {
            throw new RuntimeException("No se puede leer el archivo: " + nombreArchivo);
        }

        // Detectar el tipo de contenido (por ejemplo, image/jpeg, image/png)
        String contentType = Files.probeContentType(rutaFoto);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))  // Establecer el tipo de contenido
                .body(recurso);
    }


    @PostMapping
    public ResponseEntity<Emprendedor> guardarEmprendedor(@RequestBody Emprendedor emprendedor) {
        Emprendedor emprendedorGuardado = emprendedorServicio.guardarCambiosEmprendedor(emprendedor);
        return ResponseEntity.ok()
                .body(emprendedorGuardado);
    }

    @PutMapping
    public ResponseEntity<Emprendedor> editarEmprendedor(@RequestBody Emprendedor emprendedor) {
        Emprendedor emprendedorGuardado = emprendedorServicio.guardarCambiosEmprendedor(emprendedor);
        return ResponseEntity.ok()
                .body(emprendedorGuardado);
    }

    @PutMapping(value = "/editar", consumes = {"multipart/form-data"})
    public ResponseEntity<Emprendedor> editarEmprendedorConFoto(
            @RequestParam("id") Long emprendedorId,
            @RequestParam(value = "foto", required = false) MultipartFile foto,
            @RequestParam("emprendedor") String emprendedorDtoJson) {

        try {

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            objectMapper.activateDefaultTyping(objectMapper.getPolymorphicTypeValidator(), ObjectMapper.DefaultTyping.JAVA_LANG_OBJECT);

            EmprendedorDto emprendedorDto = objectMapper.readValue(emprendedorDtoJson, EmprendedorDto.class);

            Emprendedor emprendedor = emprendedorRepositorio.findById(emprendedorId)
                    .orElseThrow(() -> new RuntimeException("Emprendedor no encontrado"));

            Usuario usuario = emprendedor.getUsuario();
            usuario.setUsuarioUsuario(emprendedorDto.getUsuario().getUsuarioUsuario());
            usuario.setUsuarioNombre(emprendedorDto.getUsuario().getUsuarioNombre());
            usuario.setUsuarioDni(emprendedorDto.getUsuario().getUsuarioDni());
            usuario.setUsuarioCorreo(emprendedorDto.getUsuario().getUsuarioCorreo());
            usuario.setUsuarioTelefono(emprendedorDto.getUsuario().getUsuarioTelefono());
            usuario.setUsuarioId(emprendedorDto.getUsuario().getUsuarioId());
            usuario.setUsuarioEstado(emprendedorDto.getUsuario().getUsuarioEstado());
            usuario.setUsuarioApellidoPaterno(emprendedorDto.getUsuario().getUsuarioApellidoPaterno());
            usuario.setUsuarioApellidoMaterno(emprendedorDto.getUsuario().getUsuarioApellidoMaterno());
            usuario.setUsuarioContrasena(emprendedorDto.getUsuario().getUsuarioContrasena());
            usuario.setUsuarioFechaNacimiento(emprendedorDto.getUsuario().getUsuarioFechaNacimiento());

            emprendedor.setEmprendedorId(emprendedorDto.getEmprendedorId());
            emprendedor.setEmprendedorCondicionContribuyente(emprendedorDto.getEmprendedorCondicionContribuyente());
            emprendedor.setEmprendedorEstadoContribuyente(emprendedorDto.getEmprendedorEstadoContribuyente());
            emprendedor.setEmprendedorRuc(emprendedorDto.getEmprendedorRuc());
            emprendedor.setEmprendedorDireccion(emprendedorDto.getEmprendedorDireccion());
            emprendedor.setEmprendedorRazonSocial(emprendedorDto.getEmprendedorRazonSocial());


            Rubro rubro = emprendedor.getRubro();
            rubro.setRubroId(emprendedorDto.getRubro().getRubroId());
            rubro.setRubroNombre(emprendedorDto.getRubro().getRubroNombre());

            TipoContribuyente tipoContribuyente = emprendedor.getTipoContribuyente();
            tipoContribuyente.setTipoContribuyenteId(emprendedorDto.getTipoContribuyente().getTipoContribuyenteId());
            tipoContribuyente.setTipoContribuyenteNombre(emprendedorDto.getTipoContribuyente().getTipoContribuyenteNombre());

            TipoActividad tipoActividad = emprendedor.getTipoActividad();
            tipoActividad.setTipoActividadId(emprendedorDto.getTipoActividad().getTipoActividadId());
            tipoActividad.setTipoActividadNombre(emprendedorDto.getTipoActividad().getTipoActividadNombre());

            if (foto != null && !foto.isEmpty()) {
                String directorioFotos = "D:\\fotos";
                String nombreArchivo = emprendedorDto.getEmprendedorRuc() + "_" + foto.getOriginalFilename();
                Path rutaFoto = Paths.get(directorioFotos).resolve(nombreArchivo).toAbsolutePath();
                Files.copy(foto.getInputStream(), rutaFoto, StandardCopyOption.REPLACE_EXISTING);
                emprendedor.setEmprendedorFoto(nombreArchivo);
            }

            Emprendedor emprendedorGuardado = emprendedorRepositorio.save(emprendedor);

            return ResponseEntity.ok().body(emprendedorGuardado);
        } catch (IOException e) {
            // Log detallado del error de IO
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (Exception e) {
            // Log detallado para cualquier otro error
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{emprendedorId}")
    public ResponseEntity<Void> eliminarEmprendedor(@PathVariable Long emprendedorId) {
        emprendedorServicio.eliminarEmprendedor(emprendedorId);
        return ResponseEntity.noContent()
                .build();
    }

    @GetMapping("/dni/{dni}")
    public ResponseEntity<EmprendedorDto> findEmprendedorByDni(@PathVariable String dni) {
        Optional<EmprendedorDto> emprendedorDto = emprendedorServicio.findByUsuarioDni(dni);
        return emprendedorDto.map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Emprendedor no encontrado"));
    }

    @GetMapping("/ruc/{ruc}")
    public ResponseEntity<EmprendedorDto> findEmprendedorByRuc(@PathVariable String ruc) {
        EmprendedorDto emprendedorDto = emprendedorServicio.findEmprendedorByRuc(ruc);
        if (emprendedorDto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Emprendedor no encontrado");
        }
        return ResponseEntity.ok(emprendedorDto);
    }

}
