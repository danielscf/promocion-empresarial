package pe.utp.promocion_empresarial.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioLoginResponseDto;
import pe.utp.promocion_empresarial.entidad.Usuario;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    List<UsuarioDto> findAllBy();

    UsuarioDto findByUsuarioId(Long usuarioId);

    UsuarioLoginResponseDto findByUsuarioUsuarioAndUsuarioContrasena(String usuarioUsuario, String usuarioContrasena);

}
