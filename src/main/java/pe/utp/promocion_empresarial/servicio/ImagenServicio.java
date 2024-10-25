package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.imagen.ImagenDto;
import pe.utp.promocion_empresarial.entidad.Imagen;

import java.util.List;

public interface ImagenServicio {

    List<ImagenDto> findAllImagenes();

    ImagenDto findImagenById(Long imagenId);

    Imagen guardarCambiosImagen(Imagen imagen);

    void eliminarImagen(Long imagenId);

}
