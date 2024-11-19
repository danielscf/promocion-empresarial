package pe.utp.promocion_empresarial.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.marca.MarcaDto;
import pe.utp.promocion_empresarial.entidad.Marca;
import pe.utp.promocion_empresarial.repositorio.MarcaRepositorio;

@Service
public class MarcaServicioImpl implements MarcaServicio {

    @Autowired
    MarcaRepositorio marcaRepositorio;

    @Override
    public List<MarcaDto> findAllMarcas() {
        return marcaRepositorio.findAllBy();
    }

    @Override
    public MarcaDto findMarcaById(Long marcaId) {
        return marcaRepositorio.findByMarcaId(marcaId);
    }
    @Override
    public Marca guardarCambiosMarca(Marca marca) {
        return marcaRepositorio.save(marca);
    }

    @Override
    public void eliminarMarca(Long marcaId) {
        marcaRepositorio.deleteById(marcaId);
    }

    @Override
    public List<MarcaDto> findMarcasByEmprendedorId(Long emprendedorId) {
        return marcaRepositorio.findByEmprendedorEmprendedorId(emprendedorId);
    }
    @Override
    public Optional<Marca> findMarcaByNombre(String marcaNombre) {

        return marcaRepositorio.findByMarcaNombre(marcaNombre);
    }

}
