package pe.utp.promocion_empresarial.dto.solicitud;

import java.time.LocalDateTime;

import pe.utp.promocion_empresarial.dto.tipoSolicitud.TipoSolicitudDto;
import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorPreviewDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioPreviewDto;
import pe.utp.promocion_empresarial.dto.producto.ProductoDetailsDto;

public interface SolicitudDto {

    Long getSolicitudId();

    String getSolicitudDescripcion();

    Integer getSolicitudEstado();

    LocalDateTime getSolicitudFechaCreacion();

    LocalDateTime getSolicitudFechaRevision();

    TipoSolicitudDto getTipoSolicitud();

    EmprendedorPreviewDto getEmprendedor();

    UsuarioPreviewDto getUsuario();

    ProductoDetailsDto getProducto();

}
