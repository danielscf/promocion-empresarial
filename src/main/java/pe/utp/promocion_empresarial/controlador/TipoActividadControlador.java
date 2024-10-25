package pe.utp.promocion_empresarial.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.utp.promocion_empresarial.dto.tipoActividad.TipoActividadDto;
import pe.utp.promocion_empresarial.entidad.Marca;
import pe.utp.promocion_empresarial.entidad.TipoActividad;
import pe.utp.promocion_empresarial.servicio.TipoActividadServicio;

import java.util.List;

@RestController
@RequestMapping("/tipoActividad")
public class TipoActividadControlador {
    @Autowired
    TipoActividadServicio tipoActividadServicio;

    @GetMapping
    public List<TipoActividadDto> findAllTipoActividades() {
        return tipoActividadServicio.findAllTipoActividades();
    }

    @GetMapping("/{tipoActividadId}")
    public ResponseEntity<TipoActividadDto> findTipoActividadesId(@PathVariable Long tipoActividadesId) {
        TipoActividadDto tipoActividadDto = tipoActividadServicio.findTipoActividadById(tipoActividadesId);
        return ResponseEntity.ok()
                .body(tipoActividadDto);
    }
    @PostMapping
    public ResponseEntity<TipoActividad> guardarTipoActividades(@RequestBody TipoActividad tipoActividad ) {
        TipoActividad tipoActividadGuardado = tipoActividadServicio.guardarCambiosTipoActividad(tipoActividad);
        return ResponseEntity.ok()
                .body(tipoActividadGuardado);
    }

    @PutMapping
    public ResponseEntity<TipoActividad> editarTipoActividades(@RequestBody TipoActividad tipoActividad) {
        TipoActividad tipoActividadGuardado = tipoActividadServicio.guardarCambiosTipoActividad(tipoActividad);
        return ResponseEntity.ok()
                .body(tipoActividadGuardado);
    }

    @DeleteMapping("/tipoActividad")
    public ResponseEntity<Void> eliminarTipoActividad(@RequestBody Long tipoActividadId) {
        tipoActividadServicio.eliminarTipoActividad(tipoActividadId);
        return ResponseEntity.noContent()
                .build();

    }
}
