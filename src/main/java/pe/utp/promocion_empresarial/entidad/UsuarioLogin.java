package pe.utp.promocion_empresarial.entidad;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import pe.utp.promocion_empresarial.utils.Estado;

import java.util.Collection;
import java.util.Collections;

public class UsuarioLogin implements UserDetails {
    private Usuario usuario;

    public UsuarioLogin(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO: Add authority based on `roles`
        return Collections.singleton(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getUsername() {
        return usuario.getUsuarioUsuario();
    }

    @Override
    public String getPassword() {
        return usuario.getUsuarioContrasena();
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.usuario.getUsuarioEstado().equals(Estado.ACTIVO.getValor());
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.usuario.getUsuarioEstado().equals(Estado.ACTIVO.getValor());
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO: When the user fails to create proper credentials after user admission
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return this.usuario.getUsuarioEstado().equals(Estado.ACTIVO.getValor());
    }
}
