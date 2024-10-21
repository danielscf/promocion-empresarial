package pe.utp.promocion_empresarial.modelo;

import java.util.Set;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_producto")
public class Producto {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long prod_id;

  @Column(nullable = false, length = 100)
  private String prod_nombre;

  @Column(nullable = false, length = 255)
  private String prod_descripcion;

  @Column(nullable = false)
  @ColumnDefault(value = "0")
  private Integer prod_estado;

  @ManyToOne
  @JoinColumn(nullable = false, name = "tipo_prod_id")
  private Tipo_producto tipo_producto;

  @ManyToOne
  @JoinColumn(nullable = false, name = "marc_id")
  private Marca marca;

  @OneToMany(mappedBy = "producto")
  private Set<Imagen> imagen;

  private Producto() {
  }

  public Producto(Long prod_id, String prod_nombre, String prod_descripcion, Integer prod_estado,
      Tipo_producto tipo_producto, Marca marca, Set<Imagen> imagen) {
    this.prod_id = prod_id;
    this.prod_nombre = prod_nombre;
    this.prod_descripcion = prod_descripcion;
    this.prod_estado = prod_estado;
    this.tipo_producto = tipo_producto;
    this.marca = marca;
    this.imagen = imagen;
  }

  public Long getProd_id() {
    return prod_id;
  }

  public void setProd_id(Long prod_id) {
    this.prod_id = prod_id;
  }

  public String getProd_nombre() {
    return prod_nombre;
  }

  public void setProd_nombre(String prod_nombre) {
    this.prod_nombre = prod_nombre;
  }

  public String getProd_descripcion() {
    return prod_descripcion;
  }

  public void setProd_descripcion(String prod_descripcion) {
    this.prod_descripcion = prod_descripcion;
  }

  public Integer getProd_estado() {
    return prod_estado;
  }

  public void setProd_estado(Integer prod_estado) {
    this.prod_estado = prod_estado;
  }

  public Tipo_producto getTipo_producto() {
    return tipo_producto;
  }

  public void setTipo_producto(Tipo_producto tipo_producto) {
    this.tipo_producto = tipo_producto;
  }

  public Marca getMarca() {
    return marca;
  }

  public void setMarca(Marca marca) {
    this.marca = marca;
  }

  public Set<Imagen> getImagen() {
    return imagen;
  }

  public void setImagen(Set<Imagen> imagen) {
    this.imagen = imagen;
  }

  @Override
  public String toString() {
    return "Producto{" +
        "prod_id=" + prod_id +
        ", prod_nombre='" + prod_nombre + '\'' +
        ", prod_descripcion='" + prod_descripcion + '\'' +
        ", prod_estado=" + prod_estado +
        ", tipo_producto=" + tipo_producto +
        ", marca=" + marca +
        ", imagen=" + imagen +
        '}';
  }
}
