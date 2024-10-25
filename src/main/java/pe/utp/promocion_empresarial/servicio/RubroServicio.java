package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.rubro.RubroDto;
import pe.utp.promocion_empresarial.entidad.Rubro;

import java.util.List;

public interface RubroServicio {

    List<RubroDto> findAllRubros();

    RubroDto findRubroById(Long rubroId);

    Rubro guardarCambiosRubro(Rubro rubro);

    void eliminarRubro(Long rubroId);

}
