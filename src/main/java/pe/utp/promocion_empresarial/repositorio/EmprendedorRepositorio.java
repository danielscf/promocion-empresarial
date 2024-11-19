package pe.utp.promocion_empresarial.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorDto;
import pe.utp.promocion_empresarial.entidad.Emprendedor;

import java.util.List;
import java.util.Optional;

public interface EmprendedorRepositorio extends JpaRepository<Emprendedor, Long> {

    List<EmprendedorDto> findAllBy();

    EmprendedorDto findByEmprendedorId(Long emprendedorId);

    Optional<Emprendedor> findByUsuarioUsuarioUsuario(String usuarioUsuario);

    Emprendedor findByEmprendedorRuc(String emprendedorRuc);

    Optional<Emprendedor> findByUsuarioUsuarioDni(String dni);

}
