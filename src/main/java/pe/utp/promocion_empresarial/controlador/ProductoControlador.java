package pe.utp.promocion_empresarial.controlador;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pe.utp.promocion_empresarial.dto.producto.ProductoDto;
import pe.utp.promocion_empresarial.dto.producto.ProductoRequestDto;
import pe.utp.promocion_empresarial.dto.producto.ProductoSinImagenesDto;
import pe.utp.promocion_empresarial.entidad.Emprendedor;
import pe.utp.promocion_empresarial.entidad.Producto;
import pe.utp.promocion_empresarial.entidad.TipoProducto;
import pe.utp.promocion_empresarial.repositorio.EmprendedorProductoRepositorio;
import pe.utp.promocion_empresarial.repositorio.EmprendedorRepositorio;
import pe.utp.promocion_empresarial.repositorio.ProductoRepositorio;
import pe.utp.promocion_empresarial.repositorio.TipoProductoRepositorio;
import pe.utp.promocion_empresarial.servicio.ProductoServicio;

@RestController
@RequestMapping("/producto")
public class ProductoControlador {

    @Autowired
    ProductoServicio productoServicio;

    @Autowired
    TipoProductoRepositorio tipoProductoRepositorio;

    @Autowired
    EmprendedorRepositorio emprendedorRepositorio;

    @Autowired
    ProductoRepositorio productoRepositorio;

    @Autowired
    EmprendedorProductoRepositorio emprendedorProductoRepositorio;

    private static final String DIRECTORIO_IMAGENES = "D:\\imagenes";

    @GetMapping
    public List<ProductoDto> findAllProductoes() {
        return productoServicio.findAllProductos();
    }

    @GetMapping("/{productoId}")
    public ResponseEntity<ProductoDto> findProductoById(@PathVariable Long productoId) {
        ProductoDto productoDto = productoServicio.findProductoById(productoId);
        return ResponseEntity.ok().body(productoDto);
    }

    @PostMapping
    public ResponseEntity<Producto> guardarProducto(@RequestBody ProductoRequestDto productoRequestDto) {
        Producto producto = new Producto();
        producto.setProductoNombre(productoRequestDto.getProductoNombre());
        producto.setProductoDescripcion(productoRequestDto.getProductoDescripcion());

        TipoProducto tipoProducto = tipoProductoRepositorio.findById(productoRequestDto.getTipoProductoId())
                .orElseThrow(() -> new IllegalArgumentException("TipoProducto no encontrado"));
        producto.setTipoProducto(tipoProducto);

        if (productoRequestDto.getEmprendedorId() != null) {
            Emprendedor emprendedor = emprendedorRepositorio.findById(productoRequestDto.getEmprendedorId())
                    .orElseThrow(() -> new IllegalArgumentException("Emprendedor no encontrado con id: " + productoRequestDto.getEmprendedorId()));
            producto.setEmprendedores(Set.of(emprendedor));
        }

        Producto productoGuardado = productoServicio.guardarCambiosProducto(producto);
        return ResponseEntity.ok().body(productoGuardado);
    }

    @PutMapping
    public ResponseEntity<Producto> editarProducto(
            @RequestParam Long productoId,
            @RequestParam Long emprendedorId,
            @RequestBody ProductoSinImagenesDto productoDto) {
        Producto productoActualizado = productoServicio.editarProducto(emprendedorId, productoId, productoDto);
        return ResponseEntity.ok(productoActualizado);
    }


    @DeleteMapping("/{productoId}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long productoId) {
        productoServicio.eliminarProducto(productoId);
        return ResponseEntity.noContent()
                .build();
    }

    @GetMapping("/emprendedor/{emprendedorId}")
    public ResponseEntity<List<ProductoDto>> findProductosByEmprendedorId(@PathVariable Long emprendedorId) {
        List<ProductoDto> productos = productoServicio.findProductosByEmprendedorId(emprendedorId);
        return ResponseEntity.ok().body(productos);
    }

}
