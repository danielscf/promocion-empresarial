package pe.utp.promocion_empresarial.entidad;

import java.time.Instant;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@Entity
@Table(name = "tbl_solicitud")
@NoArgsConstructor
@AllArgsConstructor
public class Solicitud {
    @Id
    @Column(name = "soli_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long solicitudId;

    @Column(name = "soli_descripcion", nullable = false, length = 255)
    private String solicitudDescripcion;

    @ColumnDefault(value = "0")
    @Column(name = "soli_estado", nullable = false)
    private Integer solicitudEstado = 0;

    @CreationTimestamp
    @Column(name = "soli_fecha_creacion", nullable = false)
    private Instant solicitudFechaCreacion;

    @UpdateTimestamp
    @Column(name = "soli_fecha_revision", nullable = false)
    private Instant solicitudFechaRevision;

    @ManyToOne
    @JoinColumn(name = "tipo_soli_id", nullable = false)
    private TipoSolicitud tipoSolicitud;

    @ManyToOne
    @JoinColumn(name = "empr_id", nullable = false)
    private Emprendedor emprendedor;

    @ManyToOne
    @JoinColumn(name = "usua_operador_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "prod_id", nullable = true)
    @JsonIgnore
    private Producto producto;

}
