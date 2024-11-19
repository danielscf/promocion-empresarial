package pe.utp.promocion_empresarial.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pe.utp.promocion_empresarial.entidad.EmprendedorProducto;
import pe.utp.promocion_empresarial.servicio.EmprendedorProductoServicio;

public class EmprendedorProductoControlador {

    @Autowired
    private EmprendedorProductoServicio emprendedorProductoServicio;


    @PostMapping("/asociar")
    public ResponseEntity<?> asociarProductoAEmprendedor(@RequestParam Long emprendedorId, @RequestParam Long productoId) {
        try {
            EmprendedorProducto nuevaRelacion = emprendedorProductoServicio.asociarProductoAEmprendedor(emprendedorId, productoId);
            return ResponseEntity.ok(nuevaRelacion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }


    @DeleteMapping("/eliminar")
    public ResponseEntity<?> eliminarRelacion(@RequestParam Long emprendedorId, @RequestParam Long productoId) {
        try {
            emprendedorProductoServicio.eliminarRelacion(emprendedorId, productoId);
            return ResponseEntity.ok("Relación eliminada con éxito");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
