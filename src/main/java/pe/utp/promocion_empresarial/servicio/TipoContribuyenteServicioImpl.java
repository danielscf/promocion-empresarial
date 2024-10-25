package pe.utp.promocion_empresarial.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.utp.promocion_empresarial.dto.tipoContribuyente.TipoContribuyenteDto;

import pe.utp.promocion_empresarial.entidad.TipoContribuyente;
import pe.utp.promocion_empresarial.repositorio.TipoContribuyenteRepositorio;

import java.util.List;

@Service
public class TipoContribuyenteServicioImpl implements TipoContribuyenteServicio {

    @Autowired
    TipoContribuyenteRepositorio tipoContribuyenteRepositorio;

    @Override
    public List<TipoContribuyenteDto> findAllTipoContribuyentes(){
        return tipoContribuyenteRepositorio.findAllBy();

    }

    @Override
    public TipoContribuyenteDto findTipoContribuyenteById(Long tipoContribuyenteId){
        return tipoContribuyenteRepositorio.findByTipoContribuyenteId(tipoContribuyenteId);
    }

    @Override
    public TipoContribuyente guardarCambiosTipoContribuyente(TipoContribuyente tipoContribuyente){
        return tipoContribuyenteRepositorio.save(tipoContribuyente);
    }

    @Override
    public void eliminarTipoContribuyente(Long tipoContribuyenteId){
        tipoContribuyenteRepositorio.deleteById(tipoContribuyenteId);
    }
}
