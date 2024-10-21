package pe.utp.promocion_empresarial.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_imagen")
public class Imagen {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long imag_id;

  @Column(nullable = false, length = 255)
  private String imag_url;

  @ManyToOne
  @JoinColumn(nullable = false, name = "prod_id")
  private Producto producto;

  private Imagen() {
  }

  public Imagen(Long imag_id, String imag_url, Producto producto) {
    this.imag_id = imag_id;
    this.imag_url = imag_url;
    this.producto = producto;
  }

  public Long getImag_id() {
    return imag_id;
  }

  public void setImag_id(Long imag_id) {
    this.imag_id = imag_id;
  }

  public String getImag_url() {
    return imag_url;
  }

  public void setImag_url(String imag_url) {
    this.imag_url = imag_url;
  }

  public Producto getProducto() {
    return producto;
  }

  public void setProducto(Producto producto) {
    this.producto = producto;
  }

  @Override
  public String toString() {
    return "Imagen{" +
        "imag_id=" + imag_id +
        ", imag_url='" + imag_url + '\'' +
        ", producto=" + producto +
        '}';
  }
}
