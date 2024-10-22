package pe.utp.promocion_empresarial.entidad;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_tipo_producto")
public class Tipo_producto {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long tipo_prod_id;

  @Column(nullable = false, length = 50)
  private String tipo_prod_nombre;

  @OneToMany(mappedBy = "tipo_producto")
  private Set<Producto> producto;

  private Tipo_producto() {
  }

  public Tipo_producto(Long tipo_prod_id, String tipo_prod_nombre) {
    this.tipo_prod_id = tipo_prod_id;
    this.tipo_prod_nombre = tipo_prod_nombre;
  }

  public Long getTipo_prod_id() {
    return tipo_prod_id;
  }

  public void setTipo_prod_id(Long tipo_prod_id) {
    this.tipo_prod_id = tipo_prod_id;
  }

  public String getTipo_prod_nombre() {
    return tipo_prod_nombre;
  }

  public void setTipo_prod_nombre(String tipo_prod_nombre) {
    this.tipo_prod_nombre = tipo_prod_nombre;
  }

  @Override
  public String toString() {
    return "Tipo_producto{" +
        "tipo_prod_id=" + tipo_prod_id +
        ", tipo_prod_nombre='" + tipo_prod_nombre + '\'' +
        '}';
  }
}
