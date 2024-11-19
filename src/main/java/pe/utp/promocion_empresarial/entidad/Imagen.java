package pe.utp.promocion_empresarial.entidad;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
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
    @Column(name = "imag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imagenId;

    @Column(name = "imag_url", nullable = false, length = 255)
    private String imagenUrl;

    @ManyToOne
    @JoinColumn(name = "prod_id", nullable = false)
    @JsonBackReference
    private Producto producto;
}
