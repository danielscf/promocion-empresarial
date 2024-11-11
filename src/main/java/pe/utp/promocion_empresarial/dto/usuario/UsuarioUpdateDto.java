package pe.utp.promocion_empresarial.dto.usuario;

import java.time.LocalDate;

public interface UsuarioUpdateDto {

    Long getUsuarioId();

    String getUsuarioUsuario();

    String getUsuarioDni();

    String getUsuarioNombre();

    String getUsuarioApellidoPaterno();

    String getUsuarioApellidoMaterno();

    String getUsuarioCorreo();

    String getUsuarioTelefono();

}
