package pe.utp.promocion_empresarial.dto.login;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.utp.promocion_empresarial.entidad.Usuario;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticatedUserDto {
    String token;
    Usuario usuario;
}
