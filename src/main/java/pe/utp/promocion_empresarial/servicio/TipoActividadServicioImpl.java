package pe.utp.promocion_empresarial.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.utp.promocion_empresarial.dto.tipoActividad.TipoActividadDto;
import pe.utp.promocion_empresarial.entidad.TipoActividad;
import pe.utp.promocion_empresarial.repositorio.TipoActividadRepositorio;

import java.util.List;

@Service
public class TipoActividadServicioImpl implements TipoActividadServicio {

    @Autowired
    TipoActividadRepositorio tipoActividadRepositorio;

    @Override
    public List<TipoActividadDto> findAllTipoActividades(){return tipoActividadRepositorio.findAllBy();}

    @Override
    public TipoActividadDto findTipoActividadById(Long tipoActividadId){
        return tipoActividadRepositorio.findByTipoActividadId(tipoActividadId);
    }

    @Override
    public TipoActividad guardarCambiosTipoActividad(TipoActividad tipoActividad){
        return tipoActividadRepositorio.save(tipoActividad);
    }

    @Override
    public void eliminarTipoActividad(Long tipoActividadId){
        tipoActividadRepositorio.deleteById(tipoActividadId);
    }
}
