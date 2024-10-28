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

import pe.utp.promocion_empresarial.dto.tipoSolicitud.TipoSolicitudDto;
import pe.utp.promocion_empresarial.entidad.TipoSolicitud;
import pe.utp.promocion_empresarial.servicio.TipoSolicitudServicio;

@RestController
@RequestMapping("/tipoSolicitud")
public class TipoSolicitudControlador {

    @Autowired
    TipoSolicitudServicio tipoSolicitudServicio;

    @GetMapping
    public List<TipoSolicitudDto> findAllTipoSolicitudes() {
        return tipoSolicitudServicio.findAllTipoSolicitudes();
    }

    @GetMapping("/{tipoSolicitudId}")
    public ResponseEntity<TipoSolicitudDto> findTipoSolicitudById(@PathVariable Long tipoSolicitudId) {
        TipoSolicitudDto tipoSolicitudDto = tipoSolicitudServicio.findTipoSolicitudById(tipoSolicitudId);
        return ResponseEntity.ok()
                .body(tipoSolicitudDto);
    }

    @PostMapping
    public ResponseEntity<TipoSolicitud> guardarTipoSolicitud(@RequestBody TipoSolicitud tipoSolicitud) {
        TipoSolicitud tipoSolicitudGuardado = tipoSolicitudServicio.guardarCambiosTipoSolicitud(tipoSolicitud);
        return ResponseEntity.ok()
                .body(tipoSolicitudGuardado);
    }

    @PutMapping
    public ResponseEntity<TipoSolicitud> editarTipoSolicitud(@RequestBody TipoSolicitud tipoSolicitud) {
        TipoSolicitud tipoSolicitudGuardado = tipoSolicitudServicio.guardarCambiosTipoSolicitud(tipoSolicitud);
        return ResponseEntity.ok()
                .body(tipoSolicitudGuardado);
    }

    @DeleteMapping("/{tipoSolicitudId}")
    public ResponseEntity<Void> eliminarTipoSolicitud(@PathVariable Long tipoSolicitudId) {
        tipoSolicitudServicio.eliminarTipoSolicitud(tipoSolicitudId);
        return ResponseEntity.noContent()
                .build();
    }

}
