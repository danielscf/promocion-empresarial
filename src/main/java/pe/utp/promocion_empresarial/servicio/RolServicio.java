package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.dto.rol.RolDto;
import pe.utp.promocion_empresarial.entidad.Rol;

import java.util.List;

public interface RolServicio {

    List<RolDto> findAllRoles();

    Rol findRolById(Long rolId);

    Rol findRolByNombre(String rolNombre);

    Rol guardarCambiosRol(Rol rol);

    void eliminarRol(Long rolId);

}
