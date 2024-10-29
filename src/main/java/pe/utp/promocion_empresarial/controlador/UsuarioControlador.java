package pe.utp.promocion_empresarial.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioLoginRequestDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioNuevoDto;
import pe.utp.promocion_empresarial.entidad.Usuario;
import pe.utp.promocion_empresarial.servicio.UsuarioServicio;

@RestController
@RequestMapping("/usuario")
public class UsuarioControlador {

    @Autowired
    private UsuarioServicio usuarioServicio;

    @GetMapping
    public List<UsuarioDto> findAllUsuarios() {
        return usuarioServicio.findAllUsuarios();
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<UsuarioDto> findUsuarioById(@PathVariable Long usuarioId) {
        UsuarioDto usuarioDto = usuarioServicio.findUsuarioById(usuarioId);
        return ResponseEntity.ok()
                .body(usuarioDto);
    }

    @PostMapping("/registro")
    public ResponseEntity<Usuario> guardarUsuario(@RequestBody UsuarioNuevoDto nuevoUsuario) {
        Usuario usuarioGuardado = usuarioServicio.guardarUsuario(nuevoUsuario);
        return ResponseEntity.ok()
                .body(usuarioGuardado);
    }

    @PutMapping
    public ResponseEntity<Usuario> editarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioGuardado = usuarioServicio.guardarCambiosUsuario(usuario);
        return ResponseEntity.ok()
                .body(usuarioGuardado);
    }

    @PatchMapping("/{usuarioId}/inhabilitar")
    public ResponseEntity<Usuario> deshabilitarUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioServicio.inhabilitarUsuario(usuarioId);
        return ResponseEntity.ok().body(usuario);
    }

    @PatchMapping("/{usuarioId}/habilitar")
    public ResponseEntity<Usuario> habilitarUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioServicio.habilitarUsuario(usuarioId);
        return ResponseEntity.ok().body(usuario);
    }

    @DeleteMapping("/{usuarioId}")
    public ResponseEntity<Usuario> eliminarUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioServicio.eliminarUsuario(usuarioId);
        return ResponseEntity.ok().body(usuario);
    }

}
