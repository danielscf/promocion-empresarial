package pe.utp.promocion_empresarial.entidad;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Entity
@Table(name = "tbl_tipo_actividad")
@NoArgsConstructor
@AllArgsConstructor
public class TipoActividad {
    @Id
    @Column(name = "tipo_acti_id")
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long TipoActividadId;

    @Column(name="tipo_acti_nombre", nullable=false, length=150)
    private String TipoActividadNombre;

    @OneToMany(mappedBy = "tipoActividad")
    private Set<Emprendedor> emprendedores;
}
