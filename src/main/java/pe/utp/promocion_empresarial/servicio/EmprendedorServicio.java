package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorDto;
import pe.utp.promocion_empresarial.entidad.Emprendedor;

import java.util.List;
import java.util.Optional;


public interface EmprendedorServicio {

    List<EmprendedorDto> findAllEmprendedores();

    EmprendedorDto findEmprendedorById(Long empredorId);

    Optional<EmprendedorDto> findByUsuarioUsername(String usuarioUsuario);

    Emprendedor guardarCambiosEmprendedor(Emprendedor emprendedor);

    void eliminarEmprendedor(Long emprendedorId);

    EmprendedorDto findEmprendedorByRuc(String ruc);

    Optional<EmprendedorDto> findByUsuarioDni(String dni);


}
