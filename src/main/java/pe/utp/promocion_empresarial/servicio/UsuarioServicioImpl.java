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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioLoginRequestDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioNuevoDto;
import pe.utp.promocion_empresarial.entidad.Rol;
import pe.utp.promocion_empresarial.entidad.Usuario;
import pe.utp.promocion_empresarial.entidad.UsuarioLogin;
import pe.utp.promocion_empresarial.repositorio.UsuarioRepositorio;
import pe.utp.promocion_empresarial.utils.Estado;

@Service
public class UsuarioServicioImpl implements UsuarioServicio, UserDetailsService {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private RolServicio rolServicio;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;

    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

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

    @Override
    public Usuario guardarCambiosUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    @Override
    public Usuario recuperarContrasena(Long usuarioId, String nuevaContrasena) {
        // TODO: recover password
        return null;
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

    @Override
    public String verificarUsuario(UsuarioLoginRequestDto credenciales) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(credenciales.getUsuarioUsuario(),
                        credenciales.getUsuarioContrasena()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(credenciales.getUsuarioUsuario());
        } else {
            // TODO: More appropriate handling of users
            return "Error";
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = usuarioRepositorio.findByUsuarioUsuario(username);
        if (user == null) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }

        return new UsuarioLogin(user);
    }
}
