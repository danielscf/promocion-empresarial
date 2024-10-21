package pe.utp.promocion_empresarial.modelo;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_rol")
public class Rol {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long rol_id;

  @Column(nullable = false, length = 50)
  private String rol_nombre;

  @ManyToMany
  private Set<Usuario> usuarios;

  private Rol() {
  }

  public Rol(Long rol_id, String rol_nombre, Set<Usuario> usuarios) {
    this.rol_id = rol_id;
    this.rol_nombre = rol_nombre;
    this.usuarios = usuarios;
  }

  public Long getRol_id() {
    return rol_id;
  }

  public void setRol_id(Long rol_id) {
    this.rol_id = rol_id;
  }

  public String getRol_nombre() {
    return rol_nombre;
  }

  public void setRol_nombre(String rol_nombre) {
    this.rol_nombre = rol_nombre;
  }

  public Set<Usuario> getUsuarios() {
    return usuarios;
  }

  public void setUsuarios(Set<Usuario> usuarios) {
    this.usuarios = usuarios;
  }

  @Override
  public String toString() {
    return "Rol{" +
        "rol_id=" + rol_id +
        ", rol_nombre='" + rol_nombre + '\'' +
        ", usuarios=" + usuarios +
        '}';
  }
}
