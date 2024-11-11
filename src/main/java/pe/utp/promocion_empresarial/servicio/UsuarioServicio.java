package pe.utp.promocion_empresarial.servicio;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioLoginRequestDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioNuevoDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioRolDto;
import pe.utp.promocion_empresarial.entidad.Rol;
import pe.utp.promocion_empresarial.entidad.Usuario;
import pe.utp.promocion_empresarial.entidad.UsuarioLogin;
import pe.utp.promocion_empresarial.repositorio.UsuarioRepositorio;
import pe.utp.promocion_empresarial.utils.Estado;

@Service
public class UsuarioServicio implements UserDetailsService {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private RolServicio rolServicio;

    @Autowired
    private JWTService jwtService;

    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public List<UsuarioDto> findAllUsuarios() {
        return usuarioRepositorio.findAllBy();
    }

    public UsuarioDto findUsuarioById(Long usuarioId) {
        return usuarioRepositorio.findByUsuarioId(usuarioId);
    }

    public Usuario guardarUsuario(UsuarioNuevoDto nuevoUsuario) {
        Rol rol = rolServicio.findRolById(nuevoUsuario.getRolId());
        Set<Rol> roles = new HashSet<>();
        roles.add(rol);

        Usuario informacionUsuario = new Usuario();

        informacionUsuario.setUsuarioUsuario(nuevoUsuario.getUsuarioUsuario());
        informacionUsuario.setUsuarioContrasena(encoder.encode(nuevoUsuario.getUsuarioContrasena()));
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

    public Usuario guardarCambiosUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    public Usuario recuperarContrasena(Long usuarioId, String nuevaContrasena) {
        // TODO: recover password
        return null;
    }

    public Usuario actualizarEstadoUsuario(Long usuarioId, Integer usuarioEstado) {
        Usuario informacionUsuario = usuarioRepositorio.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        informacionUsuario.setUsuarioEstado(usuarioEstado);

        return usuarioRepositorio.save(informacionUsuario);
    }

    public Usuario habilitarUsuario(Long usuarioId) {
        Usuario usuarioHabilitado = actualizarEstadoUsuario(usuarioId, Estado.ACTIVO.getValor());
        return usuarioRepositorio.save(usuarioHabilitado);
    }

    public Usuario inhabilitarUsuario(Long usuarioId) {
        Usuario usuarioInhabilitado = actualizarEstadoUsuario(usuarioId, Estado.INACTIVO.getValor());
        return usuarioRepositorio.save(usuarioInhabilitado);
    }

    public Usuario eliminarUsuario(Long usuarioId) {
        Usuario usuarioEliminado = actualizarEstadoUsuario(usuarioId, Estado.ELIMINADO.getValor());
        return usuarioRepositorio.save(usuarioEliminado);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = usuarioRepositorio.findUsuarioByUsuarioUsuario(username);
        if (user == null) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }

        return new UsuarioLogin(user);
    }


    public String verificarUsuario(UsuarioLoginRequestDto credenciales) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        credenciales.getUsuarioUsuario(),
                        credenciales.getUsuarioContrasena()
                )
        );
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(credenciales.getUsuarioUsuario());
        } else {
            return "Error";
        }
    }

}
