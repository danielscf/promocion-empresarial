package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorDto;
import pe.utp.promocion_empresarial.entidad.Emprendedor;

import java.util.List;

public interface EmprendedorServicio {

    List<EmprendedorDto> findAllEmprendedores();

    EmprendedorDto findEmprendedorById(Long empredorId);

    Emprendedor guardarCambiosEmprendedor(Emprendedor emprendedor);

    void eliminarEmprendedor(Long emprendedorId);

}
