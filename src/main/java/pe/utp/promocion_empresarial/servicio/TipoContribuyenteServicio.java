package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.tipoContribuyente.TipoContribuyenteDto;
import pe.utp.promocion_empresarial.entidad.TipoContribuyente;

import java.util.List;

public interface TipoContribuyenteServicio {

    List<TipoContribuyenteDto> findAllTipoContribuyentes();

    TipoContribuyenteDto findTipoContribuyenteById(Long tipoContribuyenteId);

    TipoContribuyente guardarCambiosTipoContribuyente(TipoContribuyente tipoContribuyente);

    void eliminarTipoContribuyente(Long tipoContribuyenteId);
}
