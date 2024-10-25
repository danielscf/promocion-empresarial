package pe.utp.promocion_empresarial.entidad;

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

@Data
@Entity
@Table(name = "tbl_emprendedor")
@NoArgsConstructor
@AllArgsConstructor
public class Emprendedor {
    @Id
    @Column(name = "empr_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long emprendedorId;

    @Column(name = "empr_ruc", nullable = false, length = 11)
    private String emprendedorRuc;

    @Column(name = "empr_direccion", nullable = false, length = 255)
    private String emprendedorDireccion;

    @Column(name = "empr_razon_social", nullable = false, length = 150)
    private String emprendedorRazonSocial;

    @Column(name = "empr_estado_contribuyente", nullable = false)
    @ColumnDefault(value = "0")
    private Integer emprendedorEstadoContribuyente;

    @Column(name = "empr_condicion_contribuyente", nullable = false)
    @ColumnDefault(value = "0")
    private Integer emprendedorCondicionContribuyente;

    @Column(name = "empr_foto", nullable = false, length = 255)
    private String emprendedorFoto;

    @ManyToOne
    @JoinColumn(name = "usua_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "rubr_id", nullable = false)
    private Rubro rubro;

    @ManyToOne
    @JoinColumn(name = "tipo_cont_id", nullable = false)
    private TipoContribuyente tipoContribuyente;

    @ManyToOne
    @JoinColumn(name = "tipo_acti_id", nullable = false)
    private TipoActividad tipoActividad;
}
