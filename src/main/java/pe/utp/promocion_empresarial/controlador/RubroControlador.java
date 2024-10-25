package pe.utp.promocion_empresarial.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.utp.promocion_empresarial.dto.rubro.RubroDto;
import pe.utp.promocion_empresarial.entidad.Rubro;
import pe.utp.promocion_empresarial.servicio.RubroServicio;

import java.util.List;

@RestController
@RequestMapping("/rubro")
public class RubroControlador {

    @Autowired
    RubroServicio rubroServicio;

    @GetMapping
    public List<RubroDto> findAllRubros() {
        return rubroServicio.findAllRubros();
    }

    @GetMapping("/{rubroId}")
    public ResponseEntity<RubroDto> findRubroById(@PathVariable Long rubroId) {
        RubroDto rubroDto = rubroServicio.findRubroById(rubroId);
        return ResponseEntity.ok()
                .body(rubroDto);
    }

    @PostMapping
    public ResponseEntity<Rubro> guardarRubro(@RequestBody Rubro rubro) {
        Rubro rubroGuardado = rubroServicio.guardarCambiosRubro(rubro);
        return ResponseEntity.ok()
                .body(rubroGuardado);
    }

    @PutMapping
    public ResponseEntity<Rubro> editarRubro(@RequestBody Rubro rubro) {
        Rubro rubroGuardado = rubroServicio.guardarCambiosRubro(rubro);
        return ResponseEntity.ok()
                .body(rubroGuardado);
    }

    @DeleteMapping("/{rubroId}")
    public ResponseEntity<Void> eliminarRubro(@PathVariable Long rubroId) {
        rubroServicio.eliminarRubro(rubroId);
        return ResponseEntity.noContent()
                .build();
    }
}
