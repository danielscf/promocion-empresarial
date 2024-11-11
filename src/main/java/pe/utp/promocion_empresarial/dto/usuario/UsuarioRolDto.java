package pe.utp.promocion_empresarial.dto.usuario;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;

public interface UsuarioRolDto {

    Long getUsuarioId();

    String getUsuarioUsuario();

    String getUsuarioContrasena();

    String getUsuarioDni();

    String getUsuarioNombre();

    String getUsuarioApellidoPaterno();

    String getUsuarioApellidoMaterno();

    String getUsuarioCorreo();

    String getUsuarioTelefono();

    LocalDate getUsuarioFechaNacimiento();

    Integer getUsuarioEstado();

    Instant getUsuarioFechaCreacion();

    // Proyección del rol asociado
    Set<RolInfo> getRoles();

    interface RolInfo {
        Long getRolId();
        String getRolNombre();
    }

}
