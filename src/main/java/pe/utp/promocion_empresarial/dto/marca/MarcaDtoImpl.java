package pe.utp.promocion_empresarial.dto.marca;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import pe.utp.promocion_empresarial.dto.emprendedor.EmprendedorDto;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MarcaDtoImpl implements MarcaDto {

    private Long marcaId;
    private String marcaNombre;
    private String marcaImagen;
    private EmprendedorDto emprendedor;

    public MarcaDtoImpl(){

    }

    public MarcaDtoImpl(Long marcaId, String marcaNombre, String marcaImagen, EmprendedorDto emprendedor) {
        this.marcaId = marcaId;
        this.marcaNombre = marcaNombre;
        this.marcaImagen = marcaImagen;
        this.emprendedor = emprendedor;
    }

    @Override
    public Long getMarcaId() {
        return marcaId;
    }

    @Override
    public String getMarcaNombre() {
        return marcaNombre;
    }

    @Override
    public String getMarcaImagen() {
        return marcaImagen;
    }

    @Override
    public EmprendedorDto getEmprendedor() {
        return emprendedor;
    }

    public void setMarcaId(Long marcaId) {
        this.marcaId = marcaId;
    }

    public void setMarcaNombre(String marcaNombre) {
        this.marcaNombre = marcaNombre;
    }

    public void setMarcaImagen(String marcaImagen) {
        this.marcaImagen = marcaImagen;
    }

    public void setEmprendedor(EmprendedorDto emprendedor) {
        this.emprendedor = emprendedor;
    }

}
