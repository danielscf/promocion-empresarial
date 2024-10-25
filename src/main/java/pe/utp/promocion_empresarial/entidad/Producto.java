package pe.utp.promocion_empresarial.entidad;

import java.util.Set;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tbl_producto")
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    @Id
    @Column(name = "prod_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productoId;

    @Column(name = "prod_nombre", nullable = false, length = 100)
    private String productoNombre;

    @Column(name = "prod_descripcion", nullable = false, length = 255)
    private String productoDescripcion;

    @Column(name = "prod_estado", nullable = false)
    @ColumnDefault(value = "0")
    private Integer productoEstado;

    @ManyToOne
    @JoinColumn(name = "tipo_prod_id", nullable = false)
    private TipoProducto tipoProducto;

    @ManyToOne
    @JoinColumn(name = "marc_id", nullable = false)
    private Marca marca;

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private Set<Imagen> imagenes;

}
