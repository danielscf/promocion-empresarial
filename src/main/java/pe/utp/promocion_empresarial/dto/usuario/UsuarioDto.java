package pe.utp.promocion_empresarial.dto.usuario;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.time.Instant;
import java.time.LocalDate;

@JsonDeserialize(as = UsuarioDtoImpl.class)
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

    LocalDate getUsuarioFechaNacimiento();

    Integer getUsuarioEstado();

    Instant getUsuarioFechaCreacion();
}
