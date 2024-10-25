package pe.utp.promocion_empresarial.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorDto;
import pe.utp.promocion_empresarial.entidad.Emprendedor;

import java.util.List;

public interface EmprendedorRepositorio extends JpaRepository<Emprendedor, Long> {

    List<EmprendedorDto> findAllBy();

    EmprendedorDto findByEmprendedorId(Long emprendedorId);
}
