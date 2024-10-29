package pe.utp.promocion_empresarial.entidad;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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

    @OneToMany(mappedBy = "tipoProducto")
    private Set<Producto> productos;

}
