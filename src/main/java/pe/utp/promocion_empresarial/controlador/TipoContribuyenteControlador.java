package pe.utp.promocion_empresarial.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.utp.promocion_empresarial.dto.tipoContribuyente.TipoContribuyenteDto;
import pe.utp.promocion_empresarial.entidad.TipoContribuyente;
import pe.utp.promocion_empresarial.servicio.TipoContribuyenteServicio;

import java.util.List;

@RestController
@RequestMapping("/tipoContribuyente")
public class TipoContribuyenteControlador {

    @Autowired
    TipoContribuyenteServicio tipoContribuyenteServicio;

    @GetMapping
    public List<TipoContribuyenteDto> findAllTipoContribuyentes() {
        return tipoContribuyenteServicio.findAllTipoContribuyentes();
    }

    @GetMapping("/{tipoContribuyenteId}")
    public ResponseEntity<TipoContribuyenteDto> findTipoContribuyentesId(@PathVariable Long tipoContribuyenteId) {
        TipoContribuyenteDto tipoContribuyenteDto = tipoContribuyenteServicio.findTipoContribuyenteById(tipoContribuyenteId);
        return ResponseEntity.ok()
                .body(tipoContribuyenteDto);
    }

    @PostMapping
    public ResponseEntity<TipoContribuyente> guardarTipoContribuyentes(@RequestBody TipoContribuyente tipoContribuyente) {
        TipoContribuyente tipoContribuyenteGuardado = tipoContribuyenteServicio.guardarCambiosTipoContribuyente(tipoContribuyente);
        return ResponseEntity.ok()
                .body(tipoContribuyenteGuardado);
    }

    @PutMapping
    public ResponseEntity<TipoContribuyente> editarTipoContribuyentes(@RequestBody TipoContribuyente tipoContribuyente) {
        TipoContribuyente tipoContribuyenteGuardado = tipoContribuyenteServicio.guardarCambiosTipoContribuyente(tipoContribuyente);
        return ResponseEntity.ok()
                .body(tipoContribuyenteGuardado);
    }

    @DeleteMapping("/tipoContribuyente")
    public ResponseEntity<Void> eliminarTipoContribuyente(@RequestBody Long tipoContribuyenteId) {
        tipoContribuyenteServicio.eliminarTipoContribuyente(tipoContribuyenteId);
        return ResponseEntity.noContent()
                .build();
    }

}
