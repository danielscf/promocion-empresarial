package pe.utp.promocion_empresarial.dto.usuario;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.Instant;
import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UsuarioDtoImpl implements UsuarioDto {

    private Long usuarioId;
    private String usuarioUsuario;
    private String usuarioContrasena;
    private String usuarioDni;
    private String usuarioNombre;
    private String usuarioApellidoPaterno;
    private String usuarioApellidoMaterno;
    private String usuarioCorreo;
    private String usuarioTelefono;
    private LocalDate usuarioFechaNacimiento;
    private Integer usuarioEstado;
    private Instant usuarioFechaCreacion;

    public UsuarioDtoImpl() {
    }

    public UsuarioDtoImpl(Long usuarioId, String usuarioUsuario, String usuarioContrasena, String usuarioDni,
                          String usuarioNombre, String usuarioApellidoPaterno, String usuarioApellidoMaterno,
                          String usuarioCorreo, String usuarioTelefono, LocalDate usuarioFechaNacimiento,
                          Integer usuarioEstado, Instant usuarioFechaCreacion) {
        this.usuarioId = usuarioId;
        this.usuarioUsuario = usuarioUsuario;
        this.usuarioContrasena = usuarioContrasena;
        this.usuarioDni = usuarioDni;
        this.usuarioNombre = usuarioNombre;
        this.usuarioApellidoPaterno = usuarioApellidoPaterno;
        this.usuarioApellidoMaterno = usuarioApellidoMaterno;
        this.usuarioCorreo = usuarioCorreo;
        this.usuarioTelefono = usuarioTelefono;
        this.usuarioFechaNacimiento = usuarioFechaNacimiento;
        this.usuarioEstado = usuarioEstado;
        this.usuarioFechaCreacion = usuarioFechaCreacion;
    }

    @Override
    public Long getUsuarioId() {
        return usuarioId;
    }

    @Override
    public String getUsuarioUsuario() {
        return usuarioUsuario;
    }

    @Override
    public String getUsuarioContrasena() {
        return usuarioContrasena;
    }

    @Override
    public String getUsuarioDni() {
        return usuarioDni;
    }

    @Override
    public String getUsuarioNombre() {
        return usuarioNombre;
    }

    @Override
    public String getUsuarioApellidoPaterno() {
        return usuarioApellidoPaterno;
    }

    @Override
    public String getUsuarioApellidoMaterno() {
        return usuarioApellidoMaterno;
    }

    @Override
    public String getUsuarioCorreo() {
        return usuarioCorreo;
    }

    @Override
    public String getUsuarioTelefono() {
        return usuarioTelefono;
    }

    @Override
    public LocalDate getUsuarioFechaNacimiento() {
        return usuarioFechaNacimiento;
    }

    @Override
    public Integer getUsuarioEstado() {
        return usuarioEstado;
    }

    @Override
    public Instant getUsuarioFechaCreacion() {
        return usuarioFechaCreacion;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public void setUsuarioUsuario(String usuarioUsuario) {
        this.usuarioUsuario = usuarioUsuario;
    }

    public void setUsuarioContrasena(String usuarioContrasena) {
        this.usuarioContrasena = usuarioContrasena;
    }

    public void setUsuarioDni(String usuarioDni) {
        this.usuarioDni = usuarioDni;
    }

    public void setUsuarioNombre(String usuarioNombre) {
        this.usuarioNombre = usuarioNombre;
    }

    public void setUsuarioApellidoPaterno(String usuarioApellidoPaterno) {
        this.usuarioApellidoPaterno = usuarioApellidoPaterno;
    }

    public void setUsuarioApellidoMaterno(String usuarioApellidoMaterno) {
        this.usuarioApellidoMaterno = usuarioApellidoMaterno;
    }

    public void setUsuarioCorreo(String usuarioCorreo) {
        this.usuarioCorreo = usuarioCorreo;
    }

    public void setUsuarioTelefono(String usuarioTelefono) {
        this.usuarioTelefono = usuarioTelefono;
    }

    public void setUsuarioFechaNacimiento(LocalDate usuarioFechaNacimiento) {
        this.usuarioFechaNacimiento = usuarioFechaNacimiento;
    }

    public void setUsuarioEstado(Integer usuarioEstado) {
        this.usuarioEstado = usuarioEstado;
    }

    public void setUsuarioFechaCreacion(Instant usuarioFechaCreacion) {
        this.usuarioFechaCreacion = usuarioFechaCreacion;
    }
}


