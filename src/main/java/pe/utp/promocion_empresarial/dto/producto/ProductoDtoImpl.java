package pe.utp.promocion_empresarial.dto.producto;

import pe.utp.promocion_empresarial.dto.imagen.ImagenDto;
import pe.utp.promocion_empresarial.dto.tipoProducto.TipoProductoDto;

import java.util.List;

public class ProductoDtoImpl implements ProductoDto {

    private Long productoId;
    private String productoNombre;
    private String productoDescripcion;
    private TipoProductoDto tipoProducto;
    private List<ImagenDto> imagenes;

    public ProductoDtoImpl() {}

    public ProductoDtoImpl(Long productoId, String productoNombre, String productoDescripcion, TipoProductoDto tipoProducto, List<ImagenDto> imagenes) {
        this.productoId = productoId;
        this.productoNombre = productoNombre;
        this.productoDescripcion = productoDescripcion;
        this.tipoProducto = tipoProducto;
        this.imagenes = imagenes;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public String getProductoNombre() {
        return productoNombre;
    }

    public void setProductoNombre(String productoNombre) {
        this.productoNombre = productoNombre;
    }

    public String getProductoDescripcion() {
        return productoDescripcion;
    }

    public void setProductoDescripcion(String productoDescripcion) {
        this.productoDescripcion = productoDescripcion;
    }

    public TipoProductoDto getTipoProducto() {
        return tipoProducto;
    }

    public void setTipoProducto(TipoProductoDto tipoProducto) {
        this.tipoProducto = tipoProducto;
    }

    public List<ImagenDto> getImagenes() {
        return imagenes;
    }

    public void setImagenes(List<ImagenDto> imagenes) {
        this.imagenes = imagenes;
    }
}
