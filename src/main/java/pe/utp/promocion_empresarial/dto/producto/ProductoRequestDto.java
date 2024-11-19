package pe.utp.promocion_empresarial.dto.producto;

import java.util.Set;

public class ProductoRequestDto {
    private Long productoId;
    private String productoNombre;
    private String productoDescripcion;
    private Integer productoEstado;
    private Long tipoProductoId;
    private Long emprendedorId;

    public Long getProductoId() { return  productoId;}
    public String getProductoNombre() { return productoNombre; }
    public String getProductoDescripcion() { return productoDescripcion; }
    public Integer getProductoEstado() { return productoEstado; }
    public Long getTipoProductoId() { return tipoProductoId; }
    public Long getEmprendedorId() { return emprendedorId; } // Getter

    public void setProductoNombre(String productoNombre) { this.productoNombre = productoNombre; }
    public void setProductoDescripcion(String productoDescripcion) { this.productoDescripcion = productoDescripcion; }
    public void setProductoEstado(Integer productoEstado) { this.productoEstado = productoEstado; }
    public void setTipoProductoId(Long tipoProductoId) { this.tipoProductoId = tipoProductoId; }
    public void setEmprendedorId(Long emprendedorId) { this.emprendedorId = emprendedorId; } // Setter
}
