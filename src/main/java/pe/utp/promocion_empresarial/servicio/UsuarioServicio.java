package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioLoginResponseDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioNuevoDto;
import pe.utp.promocion_empresarial.entidad.Usuario;

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

    UsuarioLoginResponseDto loginUsuario(String usuarioUsuario, String usuarioContrasena);

}
