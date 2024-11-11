package pe.utp.promocion_empresarial.dto.usuario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.utp.promocion_empresarial.dto.rol.RolDto;

import java.time.Instant;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioNoContrasenaDto {
    String usuarioUsuario;
    String usuarioDni;
    String usuarioNombre;
    String usuarioApellidoPaterno;
    String usuarioApellidoMaterno;
    String usuarioCorreo;
    String usuarioTelefono;
    LocalDate usuarioFechaNacimiento;
    Integer usuarioEstado;
    Instant usuarioFechaCreacion;

    RolDto rol;
}
