package pe.utp.promocion_empresarial.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.utp.promocion_empresarial.dto.rol.RolDto;
import pe.utp.promocion_empresarial.entidad.Rol;

@Repository
public interface RolRepositorio extends JpaRepository<Rol, Long> {

    List<RolDto> findAllBy();

    Rol findByRolId(Long rolId);

    Rol findByRolNombre(String rolNombre);

}
