package pe.utp.promocion_empresarial.servicio;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioLoginRequestDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioNuevoDto;
import pe.utp.promocion_empresarial.entidad.Usuario;
import pe.utp.promocion_empresarial.entidad.UsuarioLogin;

import java.util.List;

public interface UsuarioServicio {

    List<UsuarioDto> findAllUsuarios();

    UsuarioDto findUsuarioById(Long usuarioId);

    Usuario guardarUsuario(UsuarioNuevoDto nuevoUsuario);

    Usuario guardarCambiosUsuario(Usuario usuario);

    Usuario actualizarEstadoUsuario(Long usuarioId, Integer usuarioEstado);

    Usuario habilitarUsuario(Long usuarioId);

    Usuario inhabilitarUsuario(Long usuarioId);

    Usuario eliminarUsuario(Long usuarioId);

    UserDetails loadUserByUsername(String username);

    String verificarUsuario(UsuarioLoginRequestDto credenciales);

    Usuario recuperarContrasena(Long usuarioId, String nuevaContrasena);

}
