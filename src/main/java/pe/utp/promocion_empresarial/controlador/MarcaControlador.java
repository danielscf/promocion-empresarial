package pe.utp.promocion_empresarial.controlador;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import pe.utp.promocion_empresarial.dto.marca.MarcaDto;
import pe.utp.promocion_empresarial.entidad.Emprendedor;
import pe.utp.promocion_empresarial.entidad.Marca;
import pe.utp.promocion_empresarial.servicio.EmprendedorServicioImpl;
import pe.utp.promocion_empresarial.servicio.MarcaServicio;

@RestController
@RequestMapping("/marca")
public class MarcaControlador {

    @Autowired
    MarcaServicio marcaServicio;
    @Autowired
    EmprendedorServicioImpl emprendedorServicioImpl;

    @GetMapping
    public List<MarcaDto> findAllMarcas() {
        return marcaServicio.findAllMarcas();
    }

    private boolean isValidImageType(String contentType) {
        return contentType != null &&
                (contentType.equals("image/jpeg") || contentType.equals("image/png") || contentType.equals("image/gif"));
    }

    @GetMapping("/{marcaId}")
    public ResponseEntity<MarcaDto> findMarcaById(@PathVariable Long marcaId) {
        MarcaDto marcaDto = marcaServicio.findMarcaById(marcaId);
        return ResponseEntity.ok()
                .body(marcaDto);
    }

    @PostMapping(value = "", consumes = {"multipart/form-data"})
    public ResponseEntity<?> registrarMarca(
            @RequestParam("foto") MultipartFile foto,
            @RequestParam("marca") String marcaJson) {

        try {
            if (foto.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La foto no puede estar vacía.");
            }

            String contentType = foto.getContentType();
            if (!isValidImageType(contentType)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El archivo no es una imagen válida.");
            }

            if (foto.getSize() > 5 * 1024 * 1024) {  // 5MB
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La imagen es demasiado grande.");
            }

            ObjectMapper objectMapper = new ObjectMapper();
            MarcaDto marcaDto = objectMapper.readValue(marcaJson, MarcaDto.class);

            Optional<Marca> marcaExistente = marcaServicio.findMarcaByNombre(marcaDto.getMarcaNombre());

            if (marcaExistente.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La marca ya existe.");
            }

            Marca marcaNueva = new Marca();
            marcaNueva.setMarcaNombre(marcaDto.getMarcaNombre());

            Emprendedor emprendedor = emprendedorServicioImpl.convertToEntity(marcaDto.getEmprendedor());
            marcaNueva.setEmprendedor(emprendedor);

            if (!foto.isEmpty()) {
                String directorioFotos = "D:\\fotos_marca";
                String nombreArchivo = UUID.randomUUID().toString() + "_" + foto.getOriginalFilename();
                Path rutaFoto = Paths.get(directorioFotos).resolve(nombreArchivo).toAbsolutePath();

                Files.copy(foto.getInputStream(), rutaFoto, StandardCopyOption.REPLACE_EXISTING);
                marcaNueva.setMarcaImagen(nombreArchivo);
            }

            Marca marcaGuardada = marcaServicio.guardarCambiosMarca(marcaNueva);

            return ResponseEntity.ok().body(marcaGuardada);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar la marca: " + e.getMessage());
        }
    }

    @DeleteMapping("/{marcaId}")
    public ResponseEntity<Void> eliminarMarca(@PathVariable Long marcaId) {
        try {
            MarcaDto marca = marcaServicio.findMarcaById(marcaId);

            if (marca == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            if (marca.getMarcaImagen() != null) {
                Path rutaFoto = Paths.get("D:\\fotos_marca").resolve(marca.getMarcaImagen()).toAbsolutePath();
                Files.deleteIfExists(rutaFoto);
            }

            marcaServicio.eliminarMarca(marcaId);

            return ResponseEntity.noContent().build();

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("{marcaId}/foto")
    public ResponseEntity<Resource> getFotoMarca(@PathVariable Long marcaId) throws IOException {
        MarcaDto marca = marcaServicio.findMarcaById(marcaId);

        if (marca == null || marca.getMarcaImagen() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        String nombreArchivo = marca.getMarcaImagen();
        Path rutaFoto = Paths.get("D:\\fotos_marca").resolve(nombreArchivo).toAbsolutePath();
        Resource recurso = new UrlResource(rutaFoto.toUri());

        if (!recurso.exists() || !recurso.isReadable()) {
            throw new RuntimeException("No se puede leer el archivo: " + nombreArchivo);
        }

        String contentType = Files.probeContentType(rutaFoto);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(recurso);
    }

    @PutMapping(value = "", consumes = {"multipart/form-data"})
    public ResponseEntity<?> editarMarca(
            @RequestParam("id") Long marcaId,
            @RequestParam("marca") String marcaJson,
            @RequestParam(value = "foto", required = false) MultipartFile foto) {
        try {

            MarcaDto marcaDto = new ObjectMapper().readValue(marcaJson, MarcaDto.class);

            MarcaDto marcaExistenteDto = marcaServicio.findMarcaById(marcaId);
            if (marcaExistenteDto == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Marca no encontrada.");
            }

            Marca marcaExistente = new Marca();
            marcaExistente.setMarcaId(marcaId);
            marcaExistente.setMarcaNombre(marcaDto.getMarcaNombre());

            Emprendedor emprendedor = emprendedorServicioImpl.convertToEntity(marcaDto.getEmprendedor());
            marcaExistente.setEmprendedor(emprendedor);

            if (foto != null && !foto.isEmpty()) {

                if (!foto.getContentType().startsWith("image/")) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El archivo no es una imagen válida.");
                }

                if (foto.getSize() > 5000000) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El archivo es demasiado grande.");
                }

                String directorioFotos = "D:\\fotos_marca";
                String nombreArchivo = UUID.randomUUID().toString() + "_" + foto.getOriginalFilename();
                Path rutaFoto = Paths.get(directorioFotos).resolve(nombreArchivo).toAbsolutePath();
                Files.copy(foto.getInputStream(), rutaFoto, StandardCopyOption.REPLACE_EXISTING);

                marcaExistente.setMarcaImagen(nombreArchivo);
            } else {
                marcaExistente.setMarcaImagen(marcaExistenteDto.getMarcaImagen());
            }

            Marca marcaActualizada = marcaServicio.guardarCambiosMarca(marcaExistente);
            return ResponseEntity.ok().body(marcaActualizada);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar la imagen: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al editar la marca: " + e.getMessage());
        }
    }

    @GetMapping("/emprendedor/{emprendedorId}")
    public ResponseEntity<List<MarcaDto>> findMarcasByEmprendedorId(@PathVariable Long emprendedorId) {
        List<MarcaDto> marcas = marcaServicio.findMarcasByEmprendedorId(emprendedorId);
        return ResponseEntity.ok().body(marcas);
    }

}
