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

@Data
@Entity
@Table(name = "tbl_imagen")
@NoArgsConstructor
@AllArgsConstructor
public class Imagen {

    @Id
    @Column(name = "imag_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long imagenId;

    @Column(name = "imag_url", nullable = false, length = 255)
    private String imagenUrl;

    @ManyToOne
    @JoinColumn(name = "prod_id", nullable = false)
    private Producto producto;

}
