package pe.utp.promocion_empresarial.dto.emprendedor;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import pe.utp.promocion_empresarial.dto.rubro.RubroDto;
import pe.utp.promocion_empresarial.dto.tipoActividad.TipoActividadDto;
import pe.utp.promocion_empresarial.dto.tipoContribuyente.TipoContribuyenteDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;

@JsonDeserialize(as = EmprendedorDtoImpl.class)
public interface EmprendedorDto {
    Long getEmprendedorId();

    String getEmprendedorRuc();

    String getEmprendedorDireccion();

    String getEmprendedorRazonSocial();

    String getEmprendedorEstadoContribuyente();

    String getEmprendedorCondicionContribuyente();

    String getEmprendedorFoto();

    UsuarioDto getUsuario();

    RubroDto getRubro();

    TipoContribuyenteDto getTipoContribuyente();

    TipoActividadDto getTipoActividad();

}
