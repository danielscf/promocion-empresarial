package pe.utp.promocion_empresarial.servicio;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioLoginResponseDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioNuevoDto;
import pe.utp.promocion_empresarial.entidad.Rol;
import pe.utp.promocion_empresarial.entidad.Usuario;
import pe.utp.promocion_empresarial.repositorio.UsuarioRepositorio;
import pe.utp.promocion_empresarial.utils.Estado;

@Service
public class UsuarioServicioImpl implements UsuarioServicio {

    @Autowired
    UsuarioRepositorio usuarioRepositorio;

    @Autowired
    RolServicio rolServicio;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public List<UsuarioDto> findAllUsuarios() {
        return usuarioRepositorio.findAllBy();
    }

    @Override
    public UsuarioDto findUsuarioById(Long usuarioId) {
        return usuarioRepositorio.findByUsuarioId(usuarioId);
    }

    @Override
    public Usuario guardarUsuario(UsuarioNuevoDto nuevoUsuario) {
        Rol rol = rolServicio.findRolById(nuevoUsuario.getRolId());
        Set<Rol> roles = new HashSet<>();
        roles.add(rol);

        Usuario informacionUsuario = new Usuario();

        informacionUsuario.setUsuarioUsuario(nuevoUsuario.getUsuarioUsuario());
        informacionUsuario.setUsuarioContrasena(passwordEncoder.encode(nuevoUsuario.getUsuarioContrasena()));
        informacionUsuario.setUsuarioDni(nuevoUsuario.getUsuarioDni());
        informacionUsuario.setUsuarioNombre(nuevoUsuario.getUsuarioNombre());
        informacionUsuario.setUsuarioApellidoPaterno(nuevoUsuario.getUsuarioApellidoPaterno());
        informacionUsuario.setUsuarioApellidoMaterno(nuevoUsuario.getUsuarioApellidoMaterno());
        informacionUsuario.setUsuarioCorreo(nuevoUsuario.getUsuarioCorreo());
        informacionUsuario.setUsuarioTelefono(nuevoUsuario.getUsuarioTelefono());
        informacionUsuario.setUsuarioFechaNacimiento(nuevoUsuario.getUsuarioFechaNacimiento());
        informacionUsuario.setRoles(roles);

        // TODO: Mapper

        return usuarioRepositorio.save(informacionUsuario);
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
