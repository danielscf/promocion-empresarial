package pe.utp.promocion_empresarial.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioLoginRequestDto;
import pe.utp.promocion_empresarial.servicio.UsuarioServicio;

@RestController
@RequestMapping("/")
public class LoginController {
    @Autowired
    private UsuarioServicio usuarioServicio;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UsuarioLoginRequestDto credenciales) {
        String token = usuarioServicio.verificarUsuario(credenciales);

        return ResponseEntity.ok().body(token);
    }
}
