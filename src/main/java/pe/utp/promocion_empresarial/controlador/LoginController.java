package pe.utp.promocion_empresarial.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorDto;
import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorMapper;
import pe.utp.promocion_empresarial.dto.login.AuthenticatedUserDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioLoginRequestDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioMapper;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioNoContrasenaDto;
import pe.utp.promocion_empresarial.entidad.Emprendedor;
import pe.utp.promocion_empresarial.entidad.Usuario;
import pe.utp.promocion_empresarial.repositorio.EmprendedorRepositorio;
import pe.utp.promocion_empresarial.servicio.UsuarioServicio;

@RestController
@RequestMapping("/auth")
public class LoginController {
    @Autowired
    private UsuarioServicio usuarioServicio;

    @Autowired
    private UsuarioMapper usuarioMapper;

    @Autowired
    private EmprendedorRepositorio emprendedorRepositorio;

    @Autowired
    private EmprendedorMapper emprendedorMapper;

    @PostMapping("/administrador")
    public ResponseEntity<UsuarioNoContrasenaDto> loginAdministrador(@RequestBody UsuarioLoginRequestDto credenciales) {
        AuthenticatedUserDto usuarioAutenticado = usuarioServicio.verificarUsuario(credenciales);
        String token = usuarioAutenticado.getToken();
        Usuario usuario = usuarioAutenticado.getUsuario();
        UsuarioNoContrasenaDto response = usuarioMapper.toUsuarioNoContrasenaDto(usuario);
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .body(response);
    }

    @PostMapping("/emprendedor")
    public ResponseEntity<EmprendedorDto> loginEmprendedor(@RequestBody UsuarioLoginRequestDto credenciales) {
        AuthenticatedUserDto usuarioAutenticado = usuarioServicio.verificarUsuario(credenciales);
        String token = usuarioAutenticado.getToken();
        Usuario usuario = usuarioAutenticado.getUsuario();
        Emprendedor emprendedor = emprendedorRepositorio.findByUsuario(usuario);
        EmprendedorDto response = emprendedorMapper.toEmprendedorDto(emprendedor);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .body(response);
    }
}
