package pe.utp.promocion_empresarial.entidad;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Entity
@Table(name = "tbl_rubro")
@NoArgsConstructor
@AllArgsConstructor
public class Rubro {

    @Id
    @Column(name = "rubr_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rubroId;

    @Column(name = "rubr_nombre", unique = true, nullable = false, length = 100)
    private String rubroNombre;

    @OneToMany(mappedBy = "rubro")
    private Set<Emprendedor> emprendedores;

}
