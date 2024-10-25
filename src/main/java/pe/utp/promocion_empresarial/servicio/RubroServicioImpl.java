package pe.utp.promocion_empresarial.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.utp.promocion_empresarial.dto.rubro.RubroDto;
import pe.utp.promocion_empresarial.entidad.Rubro;
import pe.utp.promocion_empresarial.repositorio.RubroRepositorio;

import java.util.List;

@Service
public class RubroServicioImpl implements RubroServicio {

    @Autowired
    RubroRepositorio rubroRepositorio;

    @Override
    public List<RubroDto> findAllRubros() { return rubroRepositorio.findAllBy();}

    @Override
    public RubroDto findRubroById(Long rubroId) {return rubroRepositorio.findByRubroId(rubroId);}

    @Override
    public Rubro guardarCambiosRubro(Rubro rubro) {return rubroRepositorio.save(rubro);}

    @Override
    public void eliminarRubro(Long rubroId) { rubroRepositorio.deleteById(rubroId);}

}
