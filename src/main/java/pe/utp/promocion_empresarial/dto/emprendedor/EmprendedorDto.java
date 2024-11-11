package pe.utp.promocion_empresarial.dto.emprendedor;

import pe.utp.promocion_empresarial.dto.rubro.RubroDto;
import pe.utp.promocion_empresarial.dto.tipoActividad.TipoActividadDto;
import pe.utp.promocion_empresarial.dto.tipoContribuyente.TipoContribuyenteDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;


public interface EmprendedorDto {
    Long getEmprendedorId();

    String getEmprendedorRuc();

    String getEmprendedorDireccion();

    String getEmprendedorRazonSocial();

    Integer getEmprendedorEstadoContribuyente();

    Integer getEmprendedorCondicionContribuyente();

    String getEmprendedorFoto();

    UsuarioDto getUsuario();

    RubroDto getRubro();

    TipoContribuyenteDto getTipoContribuyente();

    TipoActividadDto getTipoActividad();

}
