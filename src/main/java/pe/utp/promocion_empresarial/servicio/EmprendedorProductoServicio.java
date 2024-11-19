package pe.utp.promocion_empresarial.servicio;

import pe.utp.promocion_empresarial.entidad.EmprendedorProducto;

public interface EmprendedorProductoServicio {
    EmprendedorProducto asociarProductoAEmprendedor(Long emprendedorId, Long productoId);

    void eliminarRelacion(Long emprendedorId, Long productoId);
}
