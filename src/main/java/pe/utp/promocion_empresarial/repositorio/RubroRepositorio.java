package pe.utp.promocion_empresarial.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.utp.promocion_empresarial.dto.rubro.RubroDto;
import pe.utp.promocion_empresarial.entidad.Rubro;

import java.util.List;

public interface RubroRepositorio extends JpaRepository<Rubro, Long> {
    List<RubroDto> findAllBy();

    RubroDto findByRubroId(Long rubroId);

}
