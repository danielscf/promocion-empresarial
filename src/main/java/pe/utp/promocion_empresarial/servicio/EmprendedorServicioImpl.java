package pe.utp.promocion_empresarial.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorDto;
import pe.utp.promocion_empresarial.entidad.Emprendedor;
import pe.utp.promocion_empresarial.repositorio.EmprendedorRepositorio;

import java.util.List;

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
    public Emprendedor guardarCambiosEmprendedor(Emprendedor emprendedor) {
        return emprendedorRepositorio.save(emprendedor);
    }
    @Override
    public void eliminarEmprendedor(Long emprendedorId ){
        emprendedorRepositorio.deleteById(emprendedorId);
    }

}
