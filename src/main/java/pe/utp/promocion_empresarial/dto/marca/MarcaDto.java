package pe.utp.promocion_empresarial.dto.marca;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorDto;

@JsonDeserialize(as = MarcaDtoImpl.class)
public interface MarcaDto {

    Long getMarcaId();

    String getMarcaNombre();

    String getMarcaImagen();

    EmprendedorDto getEmprendedor();
}
