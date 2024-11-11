package pe.utp.promocion_empresarial.dto.emprendedor;

import pe.utp.promocion_empresarial.dto.rubro.RubroDto;
import pe.utp.promocion_empresarial.dto.tipoActividad.TipoActividadDto;

public interface EmprendedorPreviewDto {
    Long getEmprendedorId();

    String getEmprendedorRuc();

    String getEmprendedorRazonSocial();

    RubroDto getRubro();

    String getEmprendedorDireccion();

    TipoActividadDto getTipoActividad();

}
