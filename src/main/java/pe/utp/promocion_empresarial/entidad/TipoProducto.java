package pe.utp.promocion_empresarial.entidad;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tbl_tipo_producto")
@NoArgsConstructor
@AllArgsConstructor
public class TipoProducto {

    @Id
    @Column(name = "tipo_prod_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipoProductoId;

    @Column(name = "tipo_prod_nombre", unique = true, nullable = false, length = 50)
    private String tipoProductoNombre;

    @OneToMany(mappedBy = "tipoProducto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Producto> productos;


}
