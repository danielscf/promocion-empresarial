package pe.utp.promocion_empresarial.utils;


public enum Estado {
    PENDIENTE(0),
    INACTIVO(1),
    ACTIVO(2),
    ELIMINADO(3);

    private final Integer valor;

    Estado(Integer valor) {
        this.valor  = valor;
    }

    public Integer getValor() {
        return valor;
    }

    public static Estado fromValor(int valor) {
        for (Estado estado : Estado.values()) {
            if (estado.getValor() == valor) {
                return estado;
            }
        }
        throw new IllegalArgumentException("Valor de estado no válido: " + valor);
    }
}
