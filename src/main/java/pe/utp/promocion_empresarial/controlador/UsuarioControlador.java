package pe.utp.promocion_empresarial.controlador;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.utp.promocion_empresarial.dto.rol.RolDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioNuevoDto;
import pe.utp.promocion_empresarial.entidad.Rol;
import pe.utp.promocion_empresarial.entidad.Usuario;
import pe.utp.promocion_empresarial.servicio.RolServicio;
import pe.utp.promocion_empresarial.servicio.UsuarioServicio;

@RestController
@RequestMapping("/usuario")
public class UsuarioControlador {

    @Autowired
    private UsuarioServicio usuarioServicio;

    @Autowired
    private RolServicio rolServicio;

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
    public ResponseEntity<Usuario> guardarUsuario(@RequestBody UsuarioNuevoDto nuevoUsuario) {
        Usuario informacionUsuario = new Usuario();
        Rol rol = rolServicio.findRolById(nuevoUsuario.getRolId());
        Set<Rol> roles = new HashSet<Rol>();
        roles.add(rol);

        informacionUsuario.setUsuarioUsuario(nuevoUsuario.getUsuarioUsuario());
        informacionUsuario.setUsuarioContrasena(nuevoUsuario.getUsuarioContrasena());
        informacionUsuario.setUsuarioDni(nuevoUsuario.getUsuarioDni());
        informacionUsuario.setUsuarioNombre(nuevoUsuario.getUsuarioNombre());
        informacionUsuario.setUsuarioApellidoPaterno(nuevoUsuario.getUsuarioApellidoPaterno());
        informacionUsuario.setUsuarioApellidoMaterno(nuevoUsuario.getUsuarioApellidoMaterno());
        informacionUsuario.setUsuarioCorreo(nuevoUsuario.getUsuarioCorreo());
        informacionUsuario.setUsuarioTelefono(nuevoUsuario.getUsuarioTelefono());
        informacionUsuario.setUsuarioFechaNacimiento(nuevoUsuario.getUsuarioFechaNacimiento());
        informacionUsuario.setRoles(roles);

        Usuario usuarioGuardado = usuarioServicio.guardarCambiosUsuario(informacionUsuario);
        return ResponseEntity.ok()
                .body(usuarioGuardado);
    }

    @PutMapping
    public ResponseEntity<Usuario> editarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioGuardado = usuarioServicio.guardarCambiosUsuario(usuario);
        return ResponseEntity.ok()
                .body(usuarioGuardado);
    }

    @PatchMapping("/{usuarioId}")
    public ResponseEntity<Usuario> actualizarEstadoUsuario(@PathVariable Long usuarioId,
            @RequestBody Integer usuarioEstado) {
        Usuario usuarioActualizado = usuarioServicio.actualizarEstadoUsuario(usuarioId, usuarioEstado);

        return ResponseEntity.ok().body(usuarioActualizado);
    }

}
