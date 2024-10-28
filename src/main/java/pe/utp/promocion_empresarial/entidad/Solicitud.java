package pe.utp.promocion_empresarial.entidad;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tbl_solicitud")
@NoArgsConstructor
@AllArgsConstructor
public class Solicitud {

    @Id
    @Column(name = "soli_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long solicitudId;

    @Column(name = "soli_descripcion", nullable = false, length = 255)
    private String solicitudDescripcion;

    @Column(name = "soli_estado", nullable = false)
    private Integer solicitudEstado;

    @Column(name = "soli_fecha_creacion", nullable = false)
    private LocalDateTime solicitudFechaCreacion;

    @Column(name = "soli_fecha_revision", nullable = false)
    private LocalDateTime solicitudFechaRevision;

    @ManyToOne
    @JoinColumn(name = "tipo_soli_id", nullable = false)
    private TipoSolicitud tipoSolicitud;

    @ManyToOne
    @JoinColumn(name = "empr_id", nullable = false)
    private Emprendedor emprendedor;

    @ManyToOne
    @JoinColumn(name = "usua_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "prod_id", nullable = true)
    private Producto producto;

}
