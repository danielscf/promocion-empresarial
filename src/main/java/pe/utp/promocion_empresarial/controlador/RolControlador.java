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

import pe.utp.promocion_empresarial.dto.rol.RolDto;
import pe.utp.promocion_empresarial.entidad.Rol;
import pe.utp.promocion_empresarial.servicio.RolServicio;

@RestController
@RequestMapping("/rol")
public class RolControlador {

    @Autowired
    RolServicio rolServicio;

    @GetMapping
    public List<RolDto> findAllRoles() {
        return rolServicio.findAllRoles();
    }

    @GetMapping("/{rolId}")
    public ResponseEntity<Rol> findRolById(@PathVariable Long rolId) {
        Rol rolDto = rolServicio.findRolById(rolId);
        return ResponseEntity.ok()
                .body(rolDto);
    }

    @PostMapping
    public ResponseEntity<Rol> guardarRol(@RequestBody Rol rol) {
        Rol rolGuardado = rolServicio.guardarCambiosRol(rol);
        return ResponseEntity.ok()
                .body(rolGuardado);
    }

    @PutMapping
    public ResponseEntity<Rol> editarRol(@RequestBody Rol rol) {
        Rol rolGuardado = rolServicio.guardarCambiosRol(rol);
        return ResponseEntity.ok()
                .body(rolGuardado);
    }

    @DeleteMapping("/{rolId}")
    public ResponseEntity<Void> eliminarRol(@PathVariable Long rolId) {
        rolServicio.eliminarRol(rolId);
        return ResponseEntity.noContent()
                .build();
    }

}
