package pe.utp.promocion_empresarial.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.utp.promocion_empresarial.dto.tipoContribuyente.TipoContribuyenteDto;
import pe.utp.promocion_empresarial.entidad.TipoContribuyente;

import java.util.List;

@Repository
public interface TipoContribuyenteRepositorio extends JpaRepository<TipoContribuyente, Long> {

    List<TipoContribuyenteDto> findAllBy();

    TipoContribuyenteDto findByTipoContribuyenteId(Long tipoContribuyenteId);

}
