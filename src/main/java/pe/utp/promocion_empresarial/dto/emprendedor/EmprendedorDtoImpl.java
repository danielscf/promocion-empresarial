package pe.utp.promocion_empresarial.dto.emprendedor;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import pe.utp.promocion_empresarial.dto.rubro.RubroDto;
import pe.utp.promocion_empresarial.dto.tipoActividad.TipoActividadDto;
import pe.utp.promocion_empresarial.dto.tipoContribuyente.TipoContribuyenteDto;
import pe.utp.promocion_empresarial.dto.usuario.UsuarioDto;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EmprendedorDtoImpl implements EmprendedorDto{

    private Long emprendedorId;
    private String emprendedorRuc;
    private String emprendedorDireccion;
    private String emprendedorRazonSocial;
    private String emprendedorEstadoContribuyente;
    private String emprendedorCondicionContribuyente;
    private String emprendedorFoto;
    private UsuarioDto usuario;
    private RubroDto rubro;
    private TipoContribuyenteDto tipoContribuyente;
    private TipoActividadDto tipoActividad;


    public EmprendedorDtoImpl() {
    }

    public EmprendedorDtoImpl(Long emprendedorId, String emprendedorRuc, String emprendedorDireccion,
                              String emprendedorRazonSocial, String emprendedorEstadoContribuyente,
                              String emprendedorCondicionContribuyente, String emprendedorFoto,
                              UsuarioDto usuario, RubroDto rubro, TipoContribuyenteDto tipoContribuyente,
                              TipoActividadDto tipoActividad) {
        this.emprendedorId = emprendedorId;
        this.emprendedorRuc = emprendedorRuc;
        this.emprendedorDireccion = emprendedorDireccion;
        this.emprendedorRazonSocial = emprendedorRazonSocial;
        this.emprendedorEstadoContribuyente = emprendedorEstadoContribuyente;
        this.emprendedorCondicionContribuyente = emprendedorCondicionContribuyente;
        this.emprendedorFoto = emprendedorFoto;
        this.usuario = usuario;
        this.rubro = rubro;
        this.tipoContribuyente = tipoContribuyente;
        this.tipoActividad = tipoActividad;
    }

    @Override
    public Long getEmprendedorId() {
        return emprendedorId;
    }

    @Override
    public String getEmprendedorRuc() {
        return emprendedorRuc;
    }

    @Override
    public String getEmprendedorDireccion() {
        return emprendedorDireccion;
    }

    @Override
    public String getEmprendedorRazonSocial() {
        return emprendedorRazonSocial;
    }

    @Override
    public String getEmprendedorEstadoContribuyente() {
        return emprendedorEstadoContribuyente;
    }

    @Override
    public String getEmprendedorCondicionContribuyente() {
        return emprendedorCondicionContribuyente;
    }

    @Override
    public String getEmprendedorFoto() {
        return emprendedorFoto;
    }

    @Override
    public UsuarioDto getUsuario() {
        return usuario;
    }

    @Override
    public RubroDto getRubro() {
        return rubro;
    }

    @Override
    public TipoContribuyenteDto getTipoContribuyente() {
        return tipoContribuyente;
    }

    @Override
    public TipoActividadDto getTipoActividad() {
        return tipoActividad;
    }


    public void setEmprendedorId(Long emprendedorId) {
        this.emprendedorId = emprendedorId;
    }

    public void setEmprendedorRuc(String emprendedorRuc) {
        this.emprendedorRuc = emprendedorRuc;
    }

    public void setEmprendedorDireccion(String emprendedorDireccion) {
        this.emprendedorDireccion = emprendedorDireccion;
    }

    public void setEmprendedorRazonSocial(String emprendedorRazonSocial) {
        this.emprendedorRazonSocial = emprendedorRazonSocial;
    }

    public void setEmprendedorEstadoContribuyente(String emprendedorEstadoContribuyente) {
        this.emprendedorEstadoContribuyente = emprendedorEstadoContribuyente;
    }

    public void setEmprendedorCondicionContribuyente(String emprendedorCondicionContribuyente) {
        this.emprendedorCondicionContribuyente = emprendedorCondicionContribuyente;
    }

    public void setEmprendedorFoto(String emprendedorFoto) {
        this.emprendedorFoto = emprendedorFoto;
    }

    public void setUsuario(UsuarioDto usuario) {
        this.usuario = usuario;
    }

    public void setRubro(RubroDto rubro) {
        this.rubro = rubro;
    }

    public void setTipoContribuyente(TipoContribuyenteDto tipoContribuyente) {
        this.tipoContribuyente = tipoContribuyente;
    }

    public void setTipoActividad(TipoActividadDto tipoActividad) {
        this.tipoActividad = tipoActividad;
    }
}
