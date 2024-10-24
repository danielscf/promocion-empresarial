package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;
import pe.utp.promocion_empresarial.entidad.Rol;
import pe.utp.promocion_empresarial.entidad.Usuario;

import java.util.List;

public interface UsuarioServicio {

    List<UsuarioDto> findAllUsuarios();

    UsuarioDto findUsuarioById(Long usuarioId);

    Usuario guardarCambiosUsuario(Usuario usuario);

    void eliminarUsuario(Long usuarioId);

}
