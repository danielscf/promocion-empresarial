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

import pe.utp.promocion_empresarial.dto.producto.ProductoDto;
import pe.utp.promocion_empresarial.entidad.Producto;
import pe.utp.promocion_empresarial.servicio.ProductoServicio;

@RestController
@RequestMapping("/producto")
public class ProductoControlador {

    @Autowired
    ProductoServicio productoServicio;

    @GetMapping
    public List<ProductoDto> findAllProductoes() {
        return productoServicio.findAllProductos();
    }

    @GetMapping("/{productoId}")
    public ResponseEntity<ProductoDto> findProductoById(@PathVariable Long productoId) {
        ProductoDto productoDto = productoServicio.findProductoById(productoId);
        return ResponseEntity.ok()
                .body(productoDto);
    }

    @PostMapping
    public ResponseEntity<Producto> guardarProducto(@RequestBody Producto producto) {
        Producto productoGuardado = productoServicio.guardarCambiosProducto(producto);
        return ResponseEntity.ok()
                .body(productoGuardado);
    }

    @PutMapping
    public ResponseEntity<Producto> editarProducto(@RequestBody Producto producto) {
        Producto productoGuardado = productoServicio.guardarCambiosProducto(producto);
        return ResponseEntity.ok()
                .body(productoGuardado);
    }

    @DeleteMapping("/{productoId}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long productoId) {
        productoServicio.eliminarProducto(productoId);
        return ResponseEntity.noContent()
                .build();
    }

}
