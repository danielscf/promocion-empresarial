package pe.utp.promocion_empresarial.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorDto;
import pe.utp.promocion_empresarial.entidad.Emprendedor;
import pe.utp.promocion_empresarial.servicio.EmprendedorServicio;


import java.util.List;

@RestController
@RequestMapping("/emprendedor")
public class EmprendedorControlador {

    @Autowired
    EmprendedorServicio emprendedorServicio;

    @GetMapping
    public List<EmprendedorDto> findAllEmprendedores() {
        return emprendedorServicio.findAllEmprendedores();
    }

    @GetMapping("/{emprendedorId}")
    public ResponseEntity<EmprendedorDto> findEmprendedorById(@PathVariable Long emprendedorId) {
        EmprendedorDto emprendedorDto = emprendedorServicio.findEmprendedorById(emprendedorId);
        return ResponseEntity.ok()
                .body(emprendedorDto);
    }

    @PostMapping
    public ResponseEntity<Emprendedor> guardarEmprendedor(@RequestBody Emprendedor emprendedor) {
        Emprendedor emprendedorGuardado = emprendedorServicio.guardarCambiosEmprendedor(emprendedor);
        return ResponseEntity.ok()
                .body(emprendedorGuardado);
    }

    @PutMapping
    public ResponseEntity<Emprendedor> editarEmprendedor(@RequestBody Emprendedor emprendedor) {
        Emprendedor emprendedorGuardado = emprendedorServicio.guardarCambiosEmprendedor(emprendedor);
        return ResponseEntity.ok()
                .body(emprendedorGuardado);
    }

    @DeleteMapping("/{emprendedorId}")
    public ResponseEntity<Void> eliminarEmprendedor(@PathVariable Long emprendedorId) {
        emprendedorServicio.eliminarEmprendedor(emprendedorId);
        return ResponseEntity.noContent()
                .build();
    }
}
