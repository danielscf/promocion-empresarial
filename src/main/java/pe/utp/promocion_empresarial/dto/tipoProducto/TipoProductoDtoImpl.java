package pe.utp.promocion_empresarial.dto.tipoProducto;

public class TipoProductoDtoImpl implements  TipoProductoDto{

    private Long tipoProductoId;
    private String tipoProductoNombre;

    public TipoProductoDtoImpl() {
    }

    public TipoProductoDtoImpl(Long tipoProductoId, String tipoProductoNombre) {
        this.tipoProductoId = tipoProductoId;
        this.tipoProductoNombre = tipoProductoNombre;
    }

    public Long getTipoProductoId() {
        return tipoProductoId;
    }

    public void setTipoProductoId(Long tipoProductoId) {
        this.tipoProductoId = tipoProductoId;
    }

    public String getTipoProductoNombre() {
        return tipoProductoNombre;
    }

    public void setTipoProductoNombre(String tipoProductoNombre) {
        this.tipoProductoNombre = tipoProductoNombre;
    }
}
