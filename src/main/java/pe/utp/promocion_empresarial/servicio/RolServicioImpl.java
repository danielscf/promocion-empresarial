package pe.utp.promocion_empresarial.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.utp.promocion_empresarial.dto.rol.RolDto;
import pe.utp.promocion_empresarial.entidad.Rol;
import pe.utp.promocion_empresarial.repositorio.RolRepositorio;

@Service
public class RolServicioImpl implements RolServicio {

    @Autowired
    RolRepositorio rolRepositorio;

    @Override
    public List<RolDto> findAllRoles() {
        return rolRepositorio.findAllBy();
    }

    @Override
    public Rol findRolById(Long rolId) {
        return rolRepositorio.findByRolId(rolId);
    }

    @Override
    public Rol findRolByNombre(String rolNombre) {
        return rolRepositorio.findByRolNombre(rolNombre);
    }

    @Override
    public Rol guardarCambiosRol(Rol rol) {
        return rolRepositorio.save(rol);
    }

    @Override
    public void eliminarRol(Long rolId) {
        rolRepositorio.deleteById(rolId);
    }

}
