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
import org.springframework.web.bind.annotation.CrossOrigin;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioLoginDto;
import pe.utp.promocion_empresarial.entidad.Usuario;
import pe.utp.promocion_empresarial.servicio.UsuarioServicio;

@RestController
@RequestMapping("/usuario")
public class UsuarioControlador {

    @Autowired
    UsuarioServicio usuarioServicio;

    @GetMapping
    public List<UsuarioDto> findAllUsuarioes() {
        return usuarioServicio.findAllUsuarios();
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<UsuarioDto> findUsuarioById(@PathVariable Long usuarioId) {
        UsuarioDto usuarioDto = usuarioServicio.findUsuarioById(usuarioId);
        return ResponseEntity.ok()
                .body(usuarioDto);
    }

    @PostMapping
    public ResponseEntity<Usuario> guardarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioGuardado = usuarioServicio.guardarCambiosUsuario(usuario);
        return ResponseEntity.ok()
                .body(usuarioGuardado);
    }

    @PutMapping
    public ResponseEntity<Usuario> editarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioGuardado = usuarioServicio.guardarCambiosUsuario(usuario);
        return ResponseEntity.ok()
                .body(usuarioGuardado);
    }

    @DeleteMapping("/{usuarioId}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long usuarioId) {
        // TODO: Delete updates `usua_estado`
        usuarioServicio.eliminarUsuario(usuarioId);
        return ResponseEntity.noContent()
                .build();
    }

    @PostMapping("/login/{usuarioUsuario}/{usuarioContrasena}")
    public ResponseEntity<UsuarioLoginDto> loginUsuario(
            @PathVariable String usuarioUsuario,
            @PathVariable String usuarioContrasena) {
        UsuarioLoginDto informacionUsuario = usuarioServicio.loginUsuario(usuarioUsuario, usuarioContrasena);
        return ResponseEntity.ok()
                .body(informacionUsuario);
    }

}
