package pe.utp.promocion_empresarial.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.utp.promocion_empresarial.dto.tipoProducto.TipoProductoDto;
import pe.utp.promocion_empresarial.entidad.TipoProducto;
import pe.utp.promocion_empresarial.servicio.TipoProductoServicio;

@RestController
@RequestMapping("/tipoProducto")
public class TipoProductoControlador {

    @Autowired
    TipoProductoServicio tipoProductoServicio;

    @GetMapping
    public List<TipoProductoDto> findAllTipoProducto() {
        return tipoProductoServicio.findAllTipoProducto();
    }

    @GetMapping("/{tipoProductoId}")
    public ResponseEntity<TipoProductoDto> findTipoProductoById(@PathVariable Long tipoProductoId) {
        TipoProductoDto tipoProductoDto = tipoProductoServicio.findTipoProductoById(tipoProductoId);
        return ResponseEntity.ok()
                .body(tipoProductoDto);
    }

    @PostMapping
    public ResponseEntity<TipoProducto> guardarTipoProducto(@RequestBody TipoProducto tipoProducto) {
        TipoProducto tipoProductoGuardado = tipoProductoServicio.guardarCambiosTipoProducto(tipoProducto);
        return ResponseEntity.ok()
                .body(tipoProductoGuardado);
    }

    @PutMapping
    public ResponseEntity<TipoProducto> editarTipoProducto(@RequestBody TipoProducto tipoProducto) {
        TipoProducto tipoProductoGuardado = tipoProductoServicio.guardarCambiosTipoProducto(tipoProducto);
        return ResponseEntity.ok()
                .body(tipoProductoGuardado);
    }

    @DeleteMapping("/{tipoProductoId}")
    public ResponseEntity<Void> eliminarTipoProducto(@PathVariable Long tipoProductoId) {
        tipoProductoServicio.eliminarTipoProducto(tipoProductoId);
        return ResponseEntity.noContent()
                .build();
    }

}
