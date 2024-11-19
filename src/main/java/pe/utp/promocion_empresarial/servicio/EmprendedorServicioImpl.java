package pe.utp.promocion_empresarial.servicio;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorDto;
import pe.utp.promocion_empresarial.entidad.Emprendedor;
import pe.utp.promocion_empresarial.repositorio.EmprendedorRepositorio;

import java.util.List;
import java.util.Optional;


@Service
public class EmprendedorServicioImpl implements EmprendedorServicio {

    @Autowired
    EmprendedorRepositorio emprendedorRepositorio;

    @Override
    public List<EmprendedorDto> findAllEmprendedores() {
        return emprendedorRepositorio.findAllBy();
    }

    @Override
    public EmprendedorDto findEmprendedorById(Long emprendedorId) {
        return emprendedorRepositorio.findByEmprendedorId(emprendedorId);
    }

    @Override
    public Optional<EmprendedorDto> findByUsuarioUsername(String usuarioUsuario) {
        return emprendedorRepositorio.findByUsuarioUsuarioUsuario(usuarioUsuario)
                .map(this::convertToDto);
    }

    private EmprendedorDto convertToDto(Emprendedor emprendedor) {

        return emprendedorRepositorio.findByEmprendedorId(emprendedor.getEmprendedorId());
    }

    public Emprendedor convertToEntity(EmprendedorDto emprendedorDto) {
        Emprendedor emprendedor = new Emprendedor();
        emprendedor.setEmprendedorId(emprendedorDto.getEmprendedorId());
        return emprendedor;
    }
    @Override
    public Emprendedor guardarCambiosEmprendedor(Emprendedor emprendedor) {
        return emprendedorRepositorio.save(emprendedor);
    }
    @Override
    public void eliminarEmprendedor(Long emprendedorId ){
        emprendedorRepositorio.deleteById(emprendedorId);
    }

    @Override
    public EmprendedorDto findEmprendedorByRuc(String ruc) {
        Emprendedor emprendedor = emprendedorRepositorio.findByEmprendedorRuc(ruc);
        if (emprendedor != null) {
            return convertToDto(emprendedor);
        }
        return null;
    }
    @Override
    public Optional<EmprendedorDto> findByUsuarioDni(String dni) {
        return emprendedorRepositorio.findByUsuarioUsuarioDni(dni)
                .map(this::convertToDto);
    }


}
