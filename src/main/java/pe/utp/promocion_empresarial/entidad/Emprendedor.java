package pe.utp.promocion_empresarial.entidad;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.util.Objects;
import java.util.Set;

@Data
@Entity
@Table(name = "tbl_emprendedor")
@NoArgsConstructor
@AllArgsConstructor

public class Emprendedor {
    @Id
    @Column(name = "empr_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emprendedorId;

    @Column(name = "empr_ruc", unique = true, nullable = false, length = 11)
    private String emprendedorRuc;

    @Column(name = "empr_direccion", nullable = false, length = 255)
    private String emprendedorDireccion;

    @Column(name = "empr_razon_social", nullable = false, length = 150)
    private String emprendedorRazonSocial;

    @Column(name = "empr_estado_contribuyente", nullable = false)
    private String emprendedorEstadoContribuyente;

    @Column(name = "empr_condicion_contribuyente", nullable = false)
    private String emprendedorCondicionContribuyente;

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



    public Emprendedor(Long emprendedorId) {
        this.emprendedorId = emprendedorId;
    }

}
