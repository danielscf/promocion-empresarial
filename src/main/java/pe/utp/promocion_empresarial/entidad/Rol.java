package pe.utp.promocion_empresarial.entidad;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tbl_rol")
@NoArgsConstructor
@AllArgsConstructor
public class Rol {

    @Id
    @Column(name = "rol_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rolId;

    @Column(name = "rol_nombre", unique = true, nullable = false, length = 50)
    private String rolNombre;

    @ManyToMany
    private Set<Usuario> usuarios;

}
