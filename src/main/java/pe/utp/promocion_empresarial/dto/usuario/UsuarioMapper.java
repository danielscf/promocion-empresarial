package pe.utp.promocion_empresarial.dto.usuario;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import pe.utp.promocion_empresarial.entidad.Usuario;

@Mapper
public interface UsuarioMapper {
    UsuarioMapper INSTANCE = Mappers.getMapper(UsuarioMapper.class);

    UsuarioDto toUsuarioDto(Usuario usuario);
    Usuario toUsuario(UsuarioDto usuarioDto);

    UsuarioNoContrasenaDto toUsuarioNoContrasenaDto(Usuario usuario);
}
