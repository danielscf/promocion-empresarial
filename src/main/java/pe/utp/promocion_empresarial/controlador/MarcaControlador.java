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

import pe.utp.promocion_empresarial.dto.marca.MarcaDto;
import pe.utp.promocion_empresarial.entidad.Marca;
import pe.utp.promocion_empresarial.servicio.MarcaServicio;

@RestController
@RequestMapping("/marca")
public class MarcaControlador {

    @Autowired
    MarcaServicio marcaServicio;

    @GetMapping
    public List<MarcaDto> findAllMarcas() {
        return marcaServicio.findAllMarcas();
    }

    @GetMapping("/{marcaId}")
    public ResponseEntity<MarcaDto> findMarcaById(@PathVariable Long marcaId) {
        MarcaDto marcaDto = marcaServicio.findMarcaById(marcaId);
        return ResponseEntity.ok()
                .body(marcaDto);
    }

    @PostMapping
    public ResponseEntity<Marca> guardarMarca(@RequestBody Marca marca) {
        Marca marcaGuardado = marcaServicio.guardarCambiosMarca(marca);
        return ResponseEntity.ok()
                .body(marcaGuardado);
    }

    @PutMapping
    public ResponseEntity<Marca> editarMarca(@RequestBody Marca marca) {
        Marca marcaGuardado = marcaServicio.guardarCambiosMarca(marca);
        return ResponseEntity.ok()
                .body(marcaGuardado);
    }

    @DeleteMapping("/{marcaId}")
    public ResponseEntity<Void> eliminarMarca(@PathVariable Long marcaId) {
        marcaServicio.eliminarMarca(marcaId);
        return ResponseEntity.noContent()
                .build();
    }

}
