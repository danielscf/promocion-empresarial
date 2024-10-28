package pe.utp.promocion_empresarial.dto.solicitud;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolicitudNuevoEmprendedorDto {
    private DatosPersonalesUsuarioDto usuario;
    private DatosNuevoEmprendedorDto emprendedor;
}

