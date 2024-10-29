package pe.utp.promocion_empresarial.entidad;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Entity
@Table(name = "tbl_tipo_solicitud")
@NoArgsConstructor
@AllArgsConstructor
public class TipoSolicitud {

    @Id
    @Column(name = "tipo_soli_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipoSolicitudId;

    @Column(name = "tipo_soli_nombre", unique = true, nullable = false, length = 50)
    private String tipoSolicitudNombre;

    @OneToMany(mappedBy = "tipoSolicitud")
    private Set<Solicitud> solicitudes;
}
