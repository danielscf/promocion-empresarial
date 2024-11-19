package pe.utp.promocion_empresarial.entidad;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class EmprendedorProductoId implements Serializable {

    @Column(name = "empr_id")
    private Long emprendedorId;

    @Column(name = "prod_id")
    private Long productoId;

    public EmprendedorProductoId() {
    }

    // Constructor
    public EmprendedorProductoId(Long emprendedorId, Long productoId) {
        this.emprendedorId = emprendedorId;
        this.productoId = productoId;
    }

    // Getters y Setters
    public Long getEmprendedorId() {
        return emprendedorId;
    }

    public void setEmprendedorId(Long emprendedorId) {
        this.emprendedorId = emprendedorId;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmprendedorProductoId that = (EmprendedorProductoId) o;
        return Objects.equals(emprendedorId, that.emprendedorId) &&
                Objects.equals(productoId, that.productoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(emprendedorId, productoId);
    }
}
