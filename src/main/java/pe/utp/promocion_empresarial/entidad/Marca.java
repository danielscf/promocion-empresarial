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
@Table(name = "tbl_marca")
@NoArgsConstructor
@AllArgsConstructor
public class Marca {

    @Id
    @Column(name = "marc_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long marcaId;

    @Column(name = "marc_nombre", unique = true, nullable = false, length = 50)
    private String marcaNombre;

    @Column(name = "marc_imagen", nullable = false, length = 255)
    private String marcaImagen;

    @OneToMany(mappedBy = "marca")
    private Set<Producto> productos;

}
