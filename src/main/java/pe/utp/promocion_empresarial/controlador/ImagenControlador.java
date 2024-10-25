package pe.utp.promocion_empresarial.controlador;

import java.util.List;

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

import pe.utp.promocion_empresarial.dto.imagen.ImagenDto;
import pe.utp.promocion_empresarial.entidad.Imagen;
import pe.utp.promocion_empresarial.servicio.ImagenServicio;

@RestController
@RequestMapping("/imagen")
public class ImagenControlador {

    @Autowired
    ImagenServicio imagenServicio;

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

    @PostMapping
    public ResponseEntity<Imagen> guardarImagen(@RequestBody Imagen imagen) {
        Imagen imagenGuardado = imagenServicio.guardarCambiosImagen(imagen);
        return ResponseEntity.ok()
                .body(imagenGuardado);
    }

    @PutMapping
    public ResponseEntity<Imagen> editarImagen(@RequestBody Imagen imagen) {
        Imagen imagenGuardado = imagenServicio.guardarCambiosImagen(imagen);
        return ResponseEntity.ok()
                .body(imagenGuardado);
    }

    @DeleteMapping("/{imagenId}")
    public ResponseEntity<Void> eliminarImagen(@PathVariable Long imagenId) {
        imagenServicio.eliminarImagen(imagenId);
        return ResponseEntity.noContent()
                .build();
    }

}
