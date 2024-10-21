package pe.utp.promocion_empresarial.modelo;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_marca")
public class Marca {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long marc_id;

  @Column(nullable = false, length = 50)
  private String marc_nombre;

  @Column(nullable = false, length = 255)
  private String marc_imagen;

  @OneToMany(mappedBy = "marca")
  private Set<Producto> producto;

  private Marca() {
  }

  public Marca(Long marc_id, String marc_nombre, String marc_imagen, Set<Producto> producto) {
    this.marc_id = marc_id;
    this.marc_nombre = marc_nombre;
    this.marc_imagen = marc_imagen;
    this.producto = producto;
  }

  public Long getMarc_id() {
    return marc_id;
  }

  public void setMarc_id(Long marc_id) {
    this.marc_id = marc_id;
  }

  public String getMarc_nombre() {
    return marc_nombre;
  }

  public void setMarc_nombre(String marc_nombre) {
    this.marc_nombre = marc_nombre;
  }

  public String getMarc_imagen() {
    return marc_imagen;
  }

  public void setMarc_imagen(String marc_imagen) {
    this.marc_imagen = marc_imagen;
  }

  public Set<Producto> getProducto() {
    return producto;
  }

  public void setProducto(Set<Producto> producto) {
    this.producto = producto;
  }

  @Override
  public String toString() {
    return "Marca{" +
        "marc_id=" + marc_id +
        ", marc_nombre='" + marc_nombre + '\'' +
        ", marc_imagen='" + marc_imagen + '\'' +
        ", producto=" + producto +
        '}';
  }
}
