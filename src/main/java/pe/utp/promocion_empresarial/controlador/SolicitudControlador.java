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

import pe.utp.promocion_empresarial.dto.solicitud.SolicitudDto;
import pe.utp.promocion_empresarial.entidad.Solicitud;
import pe.utp.promocion_empresarial.servicio.SolicitudServicio;

@RestController
@RequestMapping("/solicitud")
public class SolicitudControlador {

    @Autowired
    SolicitudServicio solicitudServicio;

    @GetMapping
    public List<SolicitudDto> findAllSolicitudes() {
        return solicitudServicio.findAllSolicitudes();
    }

    @GetMapping("/{solicitudId}")
    public ResponseEntity<SolicitudDto> findSolicitudById(@PathVariable Long solicitudId) {
        SolicitudDto solicitudDto = solicitudServicio.findSolicitudById(solicitudId);
        return ResponseEntity.ok()
                .body(solicitudDto);
    }

    @PostMapping
    public ResponseEntity<Solicitud> guardarSolicitud(@RequestBody Solicitud solicitud) {
        Solicitud solicitudGuardado = solicitudServicio.guardarCambiosSolicitud(solicitud);
        return ResponseEntity.ok()
                .body(solicitudGuardado);
    }

    @PutMapping
    public ResponseEntity<Solicitud> editarSolicitud(@RequestBody Solicitud solicitud) {
        Solicitud solicitudGuardado = solicitudServicio.guardarCambiosSolicitud(solicitud);
        return ResponseEntity.ok()
                .body(solicitudGuardado);
    }

    @DeleteMapping("/{solicitudId}")
    public ResponseEntity<Void> eliminarSolicitud(@PathVariable Long solicitudId) {
        solicitudServicio.eliminarSolicitud(solicitudId);
        return ResponseEntity.noContent()
                .build();
    }

}
