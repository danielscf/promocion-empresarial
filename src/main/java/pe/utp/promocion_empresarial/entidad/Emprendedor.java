package pe.utp.promocion_empresarial.entidad;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Data
@Entity
@Table(name = "tbl_emprededor")
@NoArgsConstructor
@AllArgsConstructor
public class Emprendedor {
    @Id
    @Column(name = "empr_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long emprendedorId;

    @Column(name = "empr_ruc", nullable = false, length = 11)
    private String emprededorRuc;

    @Column(name = "empr_direccion", nullable = false, length = 255)
    private String emprededorDireccion;

    @Column(name = "empr_razon_social",nullable = false,length = 150)
    private String emprededorRazonSocial;

    @Column(name = "empr_estado_contribuyente", nullable = false)
    @ColumnDefault(value = "0")
    private Integer emprededorEstadoContribuyente;

    @Column(name = "empr_condicion_contribuyente", nullable = false)
    @ColumnDefault(value = "0")
    private Integer emprededorCondicionContribuyente;

    @Column(name = "empr_foto", nullable = false, length = 255)
    private String emprededorFoto;

    @ManyToOne
    @Column(name = "usua_id",nullable = false)
    private Usuario usuarioId;

    @ManyToOne
    @Column(name="rubr_id",nullable = false)
    private Rubro rubroId;

    @ManyToOne
    @Column(name = "tipo_cont_id",nullable = false)
    private TipoContribuyente tipoContribuyenteId;

    @ManyToOne
    @Column(name = "tipo_acti_id",nullable = false)
    private TipoActividad tipoActividadId;
}
