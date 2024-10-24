package pe.utp.promocion_empresarial.dto.usuario;

import java.time.LocalDateTime;
import java.util.Date;

public interface UsuarioDto {
    Long getUsuarioId();

    String getUsuarioUsuario();

    String getUsuarioContrasena();

    String getUsuarioDni();

    String getUsuarioNombre();

    String getUsuarioApellidoPaterno();

    String getUsuarioApellidoMaterno();

    String getUsuarioCorreo();

    String getUsuarioTelefono();

    Date getUsuarioFechaDeNacimiento();

    Integer getUsuarioEstado();

    LocalDateTime getUsuarioFechaDeCreacion();
}
