package pe.utp.promocion_empresarial.controlador;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import pe.utp.promocion_empresarial.dto.imagen.ImagenDto;
import pe.utp.promocion_empresarial.entidad.Imagen;
import pe.utp.promocion_empresarial.entidad.Producto;
import pe.utp.promocion_empresarial.repositorio.ProductoRepositorio;
import pe.utp.promocion_empresarial.servicio.ImagenServicio;

@RestController
@RequestMapping("/imagen")
public class ImagenControlador {

    @Autowired
    ImagenServicio imagenServicio;
    @Autowired
    ProductoRepositorio productoRepositorio;

    private static final String DIRECTORIO_IMAGENES = "D:\\imagenes";
    private static final long MAX_SIZE = 5 * 1024 * 1024; // 5 MB

    private boolean isValidImageType(String contentType) {
        return contentType != null &&
                (contentType.equals("image/jpeg") || contentType.equals("image/png") || contentType.equals("image/gif"));
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> guardarImagen(
            @RequestParam("imagen") MultipartFile imagen,
            @RequestParam("productoId") Long productoId) {
        try {
            if (imagen.isEmpty() || imagen.getSize() > MAX_SIZE || !isValidImageType(imagen.getContentType())) {
                return ResponseEntity.badRequest().body("Archivo no válido.");
            }

            Producto producto = productoRepositorio.findById(productoId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Producto no encontrado"));

            String nombreArchivo = UUID.randomUUID() + "_" + imagen.getOriginalFilename();
            Path rutaImagen = Paths.get(DIRECTORIO_IMAGENES).resolve(nombreArchivo).toAbsolutePath();
            Files.copy(imagen.getInputStream(), rutaImagen, StandardCopyOption.REPLACE_EXISTING);

            Imagen imagenNueva = new Imagen();
            imagenNueva.setImagenUrl(nombreArchivo);
            imagenNueva.setProducto(producto);

            Imagen imagenGuardada = imagenServicio.guardarCambiosImagen(imagenNueva);

            return ResponseEntity.ok().body(imagenGuardada);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar la imagen: " + e.getMessage());
        }
    }

    @GetMapping
    public List<ImagenDto> findAllImagenes() {
        return imagenServicio.findAllImagenes();
    }

    @GetMapping("/{imagenId}")
    public ResponseEntity<ImagenDto> findImagenById(@PathVariable Long imagenId) {
        ImagenDto imagenDto = imagenServicio.findImagenById(imagenId);
        return ResponseEntity.ok()
                .body(imagenDto);
    }

    @PutMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> editarImagen(
            @RequestParam("imagenId") Long imagenId,
            @RequestParam("imagen") MultipartFile imagen,
            @RequestParam("productoId") Long productoId) {
        try {
            ImagenDto imagenDtoExistente = imagenServicio.findImagenById(imagenId);
            if (imagenDtoExistente == null) {
                return ResponseEntity.notFound().build();
            }

            Producto producto = productoRepositorio.findById(productoId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Producto no encontrado"));

            if (!imagen.isEmpty()) {
                if (imagen.getSize() > MAX_SIZE || !isValidImageType(imagen.getContentType())) {
                    return ResponseEntity.badRequest().body("Archivo no válido.");
                }

                Path rutaAnterior = Paths.get(DIRECTORIO_IMAGENES).resolve(imagenDtoExistente.getImagenUrl());
                Files.deleteIfExists(rutaAnterior);

                String nuevoNombreArchivo = UUID.randomUUID() + "_" + imagen.getOriginalFilename();
                Path nuevaRutaImagen = Paths.get(DIRECTORIO_IMAGENES).resolve(nuevoNombreArchivo).toAbsolutePath();
                Files.copy(imagen.getInputStream(), nuevaRutaImagen, StandardCopyOption.REPLACE_EXISTING);

                Imagen imagenEditada = new Imagen();
                imagenEditada.setImagenId(imagenId);
                imagenEditada.setImagenUrl(nuevoNombreArchivo);
                imagenEditada.setProducto(producto);

                Imagen imagenGuardada = imagenServicio.guardarCambiosImagen(imagenEditada);

                return ResponseEntity.ok().body(imagenGuardada);
            }

            return ResponseEntity.badRequest().body("La imagen no puede estar vacía.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la imagen: " + e.getMessage());
        }
    }

    @GetMapping("/{imagenId}/foto")
    public ResponseEntity<Resource> verImagen(@PathVariable Long imagenId) {
        try {
            ImagenDto imagenDto = imagenServicio.findImagenById(imagenId);
            if (imagenDto == null) {
                return ResponseEntity.notFound().build();
            }

            Path rutaImagen = Paths.get(DIRECTORIO_IMAGENES).resolve(imagenDto.getImagenUrl()).toAbsolutePath();

            if (!Files.exists(rutaImagen)) {
                return ResponseEntity.notFound().build();
            }

            Resource recurso = new UrlResource(rutaImagen.toUri());

            if (!recurso.exists() || !recurso.isReadable()) {
                throw new RuntimeException("No se puede leer el archivo: " + imagenDto.getImagenUrl());
            }

            String contentType = Files.probeContentType(rutaImagen);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(recurso);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/{imagenId}")
    public ResponseEntity<Void> eliminarImagen(@PathVariable Long imagenId) {
        try {
            ImagenDto imagenDto = imagenServicio.findImagenById(imagenId);
            if (imagenDto == null) {
                return ResponseEntity.notFound().build();
            }

            Path rutaImagen = Paths.get(DIRECTORIO_IMAGENES).resolve(imagenDto.getImagenUrl());
            Files.deleteIfExists(rutaImagen);
            imagenServicio.eliminarImagen(imagenId);

            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
