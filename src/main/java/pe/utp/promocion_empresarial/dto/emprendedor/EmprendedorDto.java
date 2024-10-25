package pe.utp.promocion_empresarial.dto.emprendedor;

import pe.utp.promocion_empresarial.entidad.Rubro;
import pe.utp.promocion_empresarial.entidad.TipoActividad;
import pe.utp.promocion_empresarial.entidad.TipoContribuyente;
import pe.utp.promocion_empresarial.entidad.Usuario;

public interface EmprendedorDto {
    Long getEmprendedorId();

    String getEmprendedorRuc();

    String getEmprendedorDireccion();

    String getEmprendedorRazonSocial();

    Integer getEmprendedorEstadoContribuyente();

    Integer getEmprendedorCondicionContribuyente();

    String getEmprendedorFoto();

    Usuario getUsuario();

    Rubro getRubro();

    TipoContribuyente getTipoContribuyente();

    TipoActividad getTipoActividad();

}
