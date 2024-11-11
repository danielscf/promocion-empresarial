package pe.utp.promocion_empresarial.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorDto;
import pe.utp.promocion_empresarial.entidad.Emprendedor;
import pe.utp.promocion_empresarial.servicio.EmprendedorServicio;


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

    @PostMapping
    public ResponseEntity<Emprendedor> guardarEmprendedor(@RequestBody Emprendedor emprendedor) {
        Emprendedor emprendedorGuardado = emprendedorServicio.guardarCambiosEmprendedor(emprendedor);
        return ResponseEntity.ok()
                .body(emprendedorGuardado);
    }

    @PostMapping("/uploadFoto")
    public ResponseEntity<String> subirFotoEmprendedor(@RequestParam("foto") MultipartFile foto,
                                                       @RequestParam("emprendedorRuc") String emprendedorRuc) {
        try {
            // Verifica si el archivo no está vacío
            if (!foto.isEmpty()) {
                // Busca el emprendedor en la base de datos
                Emprendedor emprendedor = (Emprendedor) emprendedorServicio.findEmprendedorByRuc(emprendedorRuc);

                // Define la ruta para guardar la imagen
                String directorioFotos = "D:\\fotos";

                // Si el emprendedor ya tiene una imagen, eliminarla del sistema de archivos
                if (emprendedor.getEmprendedorFoto() != null && !emprendedor.getEmprendedorFoto().isEmpty()) {
                    Path rutaFotoExistente = Paths.get(directorioFotos).resolve(emprendedor.getEmprendedorFoto()).toAbsolutePath();
                    Files.deleteIfExists(rutaFotoExistente); // Elimina la imagen existente
                }

                // Guarda la nueva imagen
                String nombreArchivo = emprendedorRuc + "_" + foto.getOriginalFilename();
                Path rutaFoto = Paths.get(directorioFotos).resolve(nombreArchivo).toAbsolutePath();
                Files.copy(foto.getInputStream(), rutaFoto, StandardCopyOption.REPLACE_EXISTING);

                // Actualiza la ruta de la imagen en el registro del emprendedor
                emprendedor.setEmprendedorFoto(nombreArchivo); // Guarda solo el nombre del archivo
                emprendedorServicio.guardarCambiosEmprendedor(emprendedor);

                return ResponseEntity.ok("Imagen subida y guardada con éxito");
            } else {
                return ResponseEntity.badRequest().body("El archivo está vacío");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen: " + e.getMessage());
        }
    }


    @PutMapping
    public ResponseEntity<Emprendedor> editarEmprendedor(@RequestBody Emprendedor emprendedor) {
        Emprendedor emprendedorGuardado = emprendedorServicio.guardarCambiosEmprendedor(emprendedor);
        return ResponseEntity.ok()
                .body(emprendedorGuardado);
    }

    @DeleteMapping("/{emprendedorId}")
    public ResponseEntity<Void> eliminarEmprendedor(@PathVariable Long emprendedorId) {
        emprendedorServicio.eliminarEmprendedor(emprendedorId);
        return ResponseEntity.noContent()
                .build();
    }
}
