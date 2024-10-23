package pe.utp.promocion_empresarial.entidad;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_usuario")
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long usua_id;

  @Column(nullable = false, length = 50)
  private String usua_usuario;

  @Column(nullable = false, length = 50)
  private String usua_contrasena;

  @Column(nullable = false, length = 8)
  private String usua_dni;

  @Column(nullable = false, length = 50)
  private String usua_nombre;

  @Column(nullable = false, length = 50)
  private String usua_apellido_paterno;

  @Column(nullable = false, length = 50)
  private String usua_apellido_materno;

  @Column(nullable = false, length = 100)
  private String usua_correo;

  @Column(nullable = false, length = 9)
  private String usua_telefono;

  @Column(nullable = false)
  private Date usua_fecha_de_nacimiento;

  @Column(nullable = false)
  @ColumnDefault(value = "0")
  private Integer usua_estado;

  // TODO: Default date time
  @Column(nullable = false)
  private LocalDateTime usua_fecha_de_creacion;

  @ManyToMany
  @JoinTable(name = "tbl_usuario_rol", joinColumns = @JoinColumn(name = "usua_id"), inverseJoinColumns = @JoinColumn(name = "rol_id"))
  private Set<Rol> roles;

  private Usuario() {
  }

  public Usuario(Long usua_id, String usua_usuario, String usua_contrasena, String usua_dni, String usua_nombre,
      String usua_apellido_paterno, String usua_apellido_materno, String usua_correo, String usua_telefono,
      Date usua_fecha_de_nacimiento, Integer usua_estado, LocalDateTime usua_fecha_de_creacion, Set<Rol> roles) {
    this.usua_id = usua_id;
    this.usua_usuario = usua_usuario;
    this.usua_contrasena = usua_contrasena;
    this.usua_dni = usua_dni;
    this.usua_nombre = usua_nombre;
    this.usua_apellido_paterno = usua_apellido_paterno;
    this.usua_apellido_materno = usua_apellido_materno;
    this.usua_correo = usua_correo;
    this.usua_telefono = usua_telefono;
    this.usua_fecha_de_nacimiento = usua_fecha_de_nacimiento;
    this.usua_estado = usua_estado;
    this.usua_fecha_de_creacion = usua_fecha_de_creacion;
    this.roles = roles;
  }

  public Long getUsua_id() {
    return usua_id;
  }

  public void setUsua_id(Long usua_id) {
    this.usua_id = usua_id;
  }

  public String getUsua_usuario() {
    return usua_usuario;
  }

  public void setUsua_usuario(String usua_usuario) {
    this.usua_usuario = usua_usuario;
  }

  public String getUsua_contrasena() {
    return usua_contrasena;
  }

  public void setUsua_contrasena(String usua_contrasena) {
    this.usua_contrasena = usua_contrasena;
  }

  public String getUsua_dni() {
    return usua_dni;
  }

  public void setUsua_dni(String usua_dni) {
    this.usua_dni = usua_dni;
  }

  public String getUsua_nombre() {
    return usua_nombre;
  }

  public void setUsua_nombre(String usua_nombre) {
    this.usua_nombre = usua_nombre;
  }

  public String getUsua_apellido_paterno() {
    return usua_apellido_paterno;
  }

  public void setUsua_apellido_paterno(String usua_apellido_paterno) {
    this.usua_apellido_paterno = usua_apellido_paterno;
  }

  public String getUsua_apellido_materno() {
    return usua_apellido_materno;
  }

  public void setUsua_apellido_materno(String usua_apellido_materno) {
    this.usua_apellido_materno = usua_apellido_materno;
  }

  public String getUsua_correo() {
    return usua_correo;
  }

  public void setUsua_correo(String usua_correo) {
    this.usua_correo = usua_correo;
  }

  public String getUsua_telefono() {
    return usua_telefono;
  }

  public void setUsua_telefono(String usua_telefono) {
    this.usua_telefono = usua_telefono;
  }

  public Date getUsua_fecha_de_nacimiento() {
    return usua_fecha_de_nacimiento;
  }

  public void setUsua_fecha_de_nacimiento(Date usua_fecha_de_nacimiento) {
    this.usua_fecha_de_nacimiento = usua_fecha_de_nacimiento;
  }

  public Integer getUsua_estado() {
    return usua_estado;
  }

  public void setUsua_estado(Integer usua_estado) {
    this.usua_estado = usua_estado;
  }

  public LocalDateTime getUsua_fecha_de_creacion() {
    return usua_fecha_de_creacion;
  }

  public void setUsua_fecha_de_creacion(LocalDateTime usua_fecha_de_creacion) {
    this.usua_fecha_de_creacion = usua_fecha_de_creacion;
  }

  public Set<Rol> getRoles() {
    return roles;
  }

  public void setRoles(Set<Rol> roles) {
    this.roles = roles;
  }

  @Override
  public String toString() {
    return "Usuario{" +
        "usua_id=" + usua_id +
        ", usua_usuario='" + usua_usuario + '\'' +
        ", usua_contrasena='" + usua_contrasena + '\'' +
        ", usua_dni='" + usua_dni + '\'' +
        ", usua_nombre='" + usua_nombre + '\'' +
        ", usua_apellido_paterno='" + usua_apellido_paterno + '\'' +
        ", usua_apellido_materno='" + usua_apellido_materno + '\'' +
        ", usua_correo='" + usua_correo + '\'' +
        ", usua_telefono='" + usua_telefono + '\'' +
        ", usua_fecha_de_nacimiento=" + usua_fecha_de_nacimiento +
        ", usua_estado=" + usua_estado +
        ", usua_fecha_de_creacion=" + usua_fecha_de_creacion +
        ", roles=" + roles +
        '}';
  }
}
