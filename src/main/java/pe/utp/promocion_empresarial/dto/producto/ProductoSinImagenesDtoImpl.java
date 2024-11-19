package pe.utp.promocion_empresarial.dto.producto;

import pe.utp.promocion_empresarial.dto.tipoProducto.TipoProductoDto;

public class ProductoSinImagenesDtoImpl implements  ProductoSinImagenesDto {

    private Long productoId;
    private String productoNombre;
    private String productoDescripcion;
    private TipoProductoDto tipoProducto;

    public ProductoSinImagenesDtoImpl() {}

    public ProductoSinImagenesDtoImpl(Long productoId, String productoNombre, String productoDescripcion, TipoProductoDto tipoProducto) {
        this.productoId = productoId;
        this.productoNombre = productoNombre;
        this.productoDescripcion = productoDescripcion;
        this.tipoProducto = tipoProducto;
    }

    @Override
    public Long getProductoId() {
        return productoId;
    }

    @Override
    public String getProductoNombre() {
        return productoNombre;
    }

    @Override
    public String getProductoDescripcion() {
        return productoDescripcion;
    }

    @Override
    public TipoProductoDto getTipoProducto() {
        return tipoProducto;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public void setProductoNombre(String productoNombre) {
        this.productoNombre = productoNombre;
    }

    public void setProductoDescripcion(String productoDescripcion) {
        this.productoDescripcion = productoDescripcion;
    }

    public void setTipoProducto(TipoProductoDto tipoProducto) {
        this.tipoProducto = tipoProducto;
    }
}
