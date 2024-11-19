package pe.utp.promocion_empresarial.entidad;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.ColumnDefault;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productoId;

    @Column(name = "prod_nombre", nullable = false, length = 100)
    private String productoNombre;

    @Column(name = "prod_descripcion", nullable = false, length = 255)
    private String productoDescripcion;

    @Column(name = "prod_estado", nullable = false)
    @ColumnDefault(value = "0")
    private Integer productoEstado = 0;

    @ManyToOne
    @JoinColumn(name = "tipo_prod_id", nullable = false)
    @EqualsAndHashCode.Exclude
    @JsonManagedReference
    private TipoProducto tipoProducto;

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @EqualsAndHashCode.Exclude
    private Set<Imagen> imagenes;

    @ManyToMany
    @JoinTable(
            name = "tbl_emprendedor_producto",
            joinColumns = @JoinColumn(name = "prod_id"),
            inverseJoinColumns = @JoinColumn(name = "empr_id")
    )

    private Set<Emprendedor> emprendedores;

}
