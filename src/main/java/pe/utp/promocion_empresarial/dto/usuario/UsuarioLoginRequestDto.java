package pe.utp.promocion_empresarial.dto.usuario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioLoginRequestDto {
    String usuarioUsuario;
    String usuarioContrasena;
}
