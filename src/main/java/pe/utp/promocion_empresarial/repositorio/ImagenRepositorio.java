package pe.utp.promocion_empresarial.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.utp.promocion_empresarial.dto.imagen.ImagenDto;
import pe.utp.promocion_empresarial.entidad.Imagen;

@Repository
public interface ImagenRepositorio extends JpaRepository<Imagen, Long> {

    List<ImagenDto> findAllBy();

    ImagenDto findByImagenId(Long imagenId);

}
