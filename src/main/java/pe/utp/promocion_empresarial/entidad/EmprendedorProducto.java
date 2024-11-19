package pe.utp.promocion_empresarial.entidad;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "tbl_emprendedor_producto")
public class EmprendedorProducto {

    @EmbeddedId
    private EmprendedorProductoId id;


    @ManyToOne
    @MapsId("emprendedorId")
    @JoinColumn(name = "empr_id")
    private Emprendedor emprendedor;


    @ManyToOne
    @MapsId("productoId")
    @JoinColumn(name = "prod_id")
    private Producto producto;


    public EmprendedorProducto() {
    }

    public EmprendedorProducto(Emprendedor emprendedor, Producto producto) {
        this.id = new EmprendedorProductoId(emprendedor.getEmprendedorId(), producto.getProductoId());
        this.emprendedor = emprendedor;
        this.producto = producto;
    }

    public EmprendedorProductoId getId() {
        return id;
    }

    public void setId(EmprendedorProductoId id) {
        this.id = id;
    }
    public Emprendedor getEmprendedor() {
        return emprendedor;
    }
    public void setEmprendedor(Emprendedor emprendedor) {
        this.emprendedor = emprendedor;
    }
    public Producto getProducto() {
        return producto;
    }
    public void setProducto(Producto producto) {
        this.producto = producto;
    }
}
