package pe.utp.promocion_empresarial.dto.solicitud;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DatosPersonalesUsuarioDto {
    private String usuarioUsuario;
    private String usuarioContrasena;
    private String usuarioDni;
    private String usuarioNombre;
    private String usuarioApellidoPaterno;
    private String usuarioApellidoMaterno;
    private String usuarioCorreo;
    private String usuarioTelefono;
    private LocalDate usuarioFechaNacimiento;
}
