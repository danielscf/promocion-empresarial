package pe.utp.promocion_empresarial.entidad;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Entity
@Table(name = "tbl_tipo_contribuyente")
@NoArgsConstructor
@AllArgsConstructor
public class TipoContribuyente {
    @Id
    @Column(name = "tipo_cont_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipoContribuyenteId;

    @Column(name = "tipo_cont_nombre", nullable = false, length = 150)
    private String tipoContribuyenteNombre;

    @OneToMany(mappedBy = "tipoContribuyente")
    private Set<Emprendedor> emprendedores;

}
