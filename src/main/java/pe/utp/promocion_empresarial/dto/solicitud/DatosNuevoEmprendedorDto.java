package pe.utp.promocion_empresarial.dto.solicitud;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.utp.promocion_empresarial.entidad.Rubro;
import pe.utp.promocion_empresarial.entidad.TipoActividad;
import pe.utp.promocion_empresarial.entidad.TipoContribuyente;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DatosNuevoEmprendedorDto {
    private String emprendedorRuc;
    private String emprendedorDireccion;
    private String emprendedorRazonSocial;
    private String emprendedorEstadoContribuyente;
    private String emprendedorCondicionContribuyente;
    private String emprendedorFoto;
    private Rubro rubro;
    private TipoContribuyente tipoContribuyente;
    private TipoActividad tipoActividad;
}
