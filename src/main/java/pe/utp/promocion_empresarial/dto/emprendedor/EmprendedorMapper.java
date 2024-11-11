package pe.utp.promocion_empresarial.dto.emprendedor;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import pe.utp.promocion_empresarial.entidad.Emprendedor;

@Mapper
public interface EmprendedorMapper {
    EmprendedorMapper INSTANCE = Mappers.getMapper(EmprendedorMapper.class);

    EmprendedorDto toEmprendedorDto(Emprendedor emprendedor);
}
