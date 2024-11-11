package pe.utp.promocion_empresarial.controlador;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioLoginRequestDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioRolDto;
import pe.utp.promocion_empresarial.repositorio.UsuarioRepositorio;
import pe.utp.promocion_empresarial.servicio.JWTService;
import pe.utp.promocion_empresarial.servicio.UsuarioServicio;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class LoginController {
    @Autowired
    private UsuarioServicio usuarioServicio;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    @Autowired
    private JWTService jwtService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UsuarioLoginRequestDto credenciales, HttpServletResponse response) {

        String token = usuarioServicio.verificarUsuario(credenciales);

        UsuarioRolDto usuario = usuarioRepositorio.findUsuarioConRolByUsuarioUsuario(credenciales.getUsuarioUsuario());

        long expirationTime = jwtService.getExpirationTime();
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);

        ResponseCookie tokenCookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(expirationTime / 1000)
                .build();

        ResponseCookie expirationCookie = ResponseCookie.from("tokenExpiration", String.valueOf(expirationDate.getTime()))
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(expirationTime / 1000)
                .build();

        response.addHeader("Set-Cookie", tokenCookie.toString());
        response.addHeader("Set-Cookie", expirationCookie.toString());


        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("token", token);
        responseMap.put("expiration", expirationDate.getTime());
        responseMap.put("usuario", usuario);

        return ResponseEntity.ok(responseMap);
    }


}
