package pe.utp.promocion_empresarial.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.imagen.ImagenDto;
import pe.utp.promocion_empresarial.entidad.Imagen;
import pe.utp.promocion_empresarial.repositorio.ImagenRepositorio;

@Service
public class ImagenServicioImpl implements ImagenServicio {

    @Autowired
    ImagenRepositorio imagenRepositorio;

    @Override
    public List<ImagenDto> findAllImagenes() {
        return imagenRepositorio.findAllBy();
    }

    @Override
    public ImagenDto findImagenById(Long imagenId) {
        return imagenRepositorio.findByImagenId(imagenId);
    }

    @Override
    public Imagen guardarCambiosImagen(Imagen imagen) {
        return imagenRepositorio.save(imagen);
    }

    @Override
    public void eliminarImagen(Long imagenId) {
        imagenRepositorio.deleteById(imagenId);
    }

}
