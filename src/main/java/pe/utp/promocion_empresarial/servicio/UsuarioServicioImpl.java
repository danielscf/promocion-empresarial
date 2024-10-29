package pe.utp.promocion_empresarial.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioLoginResponseDto;
import pe.utp.promocion_empresarial.entidad.Usuario;
import pe.utp.promocion_empresarial.repositorio.UsuarioRepositorio;
import pe.utp.promocion_empresarial.utils.Estado;

@Service
public class UsuarioServicioImpl implements UsuarioServicio {

    @Autowired
    UsuarioRepositorio usuarioRepositorio;

    @Override
    public List<UsuarioDto> findAllUsuarios() {
        return usuarioRepositorio.findAllBy();
    }

    @Override
    public UsuarioDto findUsuarioById(Long usuarioId) {
        return usuarioRepositorio.findByUsuarioId(usuarioId);
    }

    @Override
    public Usuario guardarCambiosUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    @Override
    public UsuarioLoginResponseDto loginUsuario(String usuarioUsuario, String usuarioContrasena) {
        return usuarioRepositorio.findByUsuarioUsuarioAndUsuarioContrasena(usuarioUsuario, usuarioContrasena);
    }

    @Override
    public Usuario actualizarEstadoUsuario(Long usuarioId, Integer usuarioEstado) {
        Usuario informacionUsuario = usuarioRepositorio.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        informacionUsuario.setUsuarioEstado(usuarioEstado);

        return usuarioRepositorio.save(informacionUsuario);
    }

    @Override
    public Usuario habilitarUsuario(Long usuarioId) {
        Usuario usuarioHabilitado = actualizarEstadoUsuario(usuarioId, Estado.ACTIVO.getValor());
        return usuarioRepositorio.save(usuarioHabilitado);
    }

    @Override
    public Usuario inhabilitarUsuario(Long usuarioId) {
        Usuario usuarioInhabilitado = actualizarEstadoUsuario(usuarioId, Estado.INACTIVO.getValor());
        return usuarioRepositorio.save(usuarioInhabilitado);
    }

    @Override
    public Usuario eliminarUsuario(Long usuarioId) {
        Usuario usuarioEliminado = actualizarEstadoUsuario(usuarioId, Estado.ELIMINADO.getValor());
        return usuarioRepositorio.save(usuarioEliminado);
    }
}
