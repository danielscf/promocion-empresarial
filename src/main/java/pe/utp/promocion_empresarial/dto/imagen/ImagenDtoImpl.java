package pe.utp.promocion_empresarial.dto.imagen;

import pe.utp.promocion_empresarial.dto.producto.ProductoDto;

public class ImagenDtoImpl implements  ImagenDto{

    private Long imagenId;
    private String imagenUrl;

    public  ImagenDtoImpl(){

    }

    public ImagenDtoImpl(Long imagenId, String imagenUrl) {
        this.imagenId = imagenId;
        this.imagenUrl = imagenUrl;

    }

    @Override
    public Long getImagenId() {
        return imagenId;
    }

    @Override
    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenId(Long imagenId) {
        this.imagenId = imagenId;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }
}
