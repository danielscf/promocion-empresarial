package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.marca.MarcaDto;
import pe.utp.promocion_empresarial.entidad.Marca;

import java.util.List;

public interface MarcaServicio {

    List<MarcaDto> findAllMarcas();

    MarcaDto findMarcaById(Long marcaId);

    Marca guardarCambiosMarca(Marca marca);

    void eliminarMarca(Long marcaId);

}
