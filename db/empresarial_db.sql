BEGIN;

CREATE TABLE tbl_usuario (
    usua_id SERIAL PRIMARY KEY,
    usua_usuario VARCHAR(50) UNIQUE NOT NULL,
    usua_contrasena VARCHAR(100) NOT NULL,
    usua_dni CHAR(8) UNIQUE NOT NULL,
    usua_nombre VARCHAR(50) NOT NULL,
    usua_apellido_paterno VARCHAR(50) NOT NULL,
    usua_apellido_materno VARCHAR(50) NOT NULL,
    usua_correo VARCHAR(100) NOT NULL,
    usua_telefono VARCHAR(9) NOT NULL,
    usua_fecha_nacimiento DATE NOT NULL,
    usua_estado INT NOT NULL DEFAULT 0,
    usua_fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE tbl_rol (
    rol_id SERIAL PRIMARY KEY,
    rol_nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE tbl_usuario_rol (
    usua_id INT NOT NULL,
    rol_id INT NOT NULL,
    FOREIGN KEY (usua_id) REFERENCES tbl_usuario(usua_id),
    FOREIGN KEY (rol_id) REFERENCES tbl_rol(rol_id),
    PRIMARY KEY (usua_id, rol_id)
);

CREATE TABLE tbl_rubro (
    rubr_id SERIAL PRIMARY KEY,
    rubr_nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE tbl_tipo_contribuyente (
    tipo_cont_id SERIAL PRIMARY KEY,
    tipo_cont_nombre VARCHAR(150) NOT NULL
);

CREATE TABLE tbl_tipo_actividad (
    tipo_acti_id SERIAL PRIMARY KEY,
    tipo_acti_nombre VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE tbl_emprendedor (
    empr_id SERIAL PRIMARY KEY,
    empr_ruc VARCHAR(11) UNIQUE NOT NULL,
    empr_direccion VARCHAR(255) NOT NULL,
    empr_razon_social VARCHAR(150) NOT NULL,
    empr_estado_contribuyente INT NOT NULL DEFAULT 0,
    empr_condicion_contribuyente INT NOT NULL DEFAULT 0,
    empr_foto VARCHAR(255) NOT NULL,
    usua_id INT NOT NULL,
    rubr_id INT NOT NULL,
    tipo_cont_id INT NOT NULL,
    tipo_acti_id INT NOT NULL,
    FOREIGN KEY (usua_id) REFERENCES tbl_usuario(usua_id),
    FOREIGN KEY (rubr_id) REFERENCES tbl_rubro(rubr_id),
    FOREIGN KEY (tipo_cont_id) REFERENCES tbl_tipo_contribuyente(tipo_cont_id),
    FOREIGN KEY (tipo_acti_id) REFERENCES tbl_tipo_actividad(tipo_acti_id)
);

CREATE TABLE tbl_tipo_evento (
    tipo_even_id SERIAL PRIMARY KEY,
    tipo_even_nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE tbl_evento (
    even_id SERIAL PRIMARY KEY,
    even_nombre VARCHAR(100) NOT NULL,
    even_descripcion VARCHAR(255) NOT NULL,
    even_fecha_inicio DATE NOT NULL,
    even_fecha_fin DATE NOT NULL,
    even_hora_inicio TIME NOT NULL,
    even_hora_fin TIME NOT NULL,
    even_lugar VARCHAR(150) NOT NULL,
    even_plantilla_diploma VARCHAR(255) NOT NULL,
    tipo_even_id INT NOT NULL,
    FOREIGN KEY (tipo_even_id) REFERENCES tbl_tipo_evento(tipo_even_id)
);

CREATE TABLE tbl_participacion_evento (
    part_even_id SERIAL PRIMARY KEY,
    part_even_asistencia INT NOT NULL DEFAULT 0,
    part_even_diploma VARCHAR(255) NOT NULL,
    part_even_estado_firma_diploma INT NOT NULL DEFAULT 0,
    even_id INT NOT NULL,
    empr_id INT NOT NULL,
    FOREIGN KEY (even_id) REFERENCES tbl_evento(even_id),
    FOREIGN KEY (empr_id) REFERENCES tbl_emprendedor(empr_id)
);

CREATE TABLE tbl_tipo_producto (
    tipo_prod_id SERIAL PRIMARY KEY,
    tipo_prod_nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE tbl_marca (
    marc_id SERIAL PRIMARY KEY,
    marc_nombre VARCHAR(50) UNIQUE NOT NULL,
    marc_imagen VARCHAR(255) NOT NULL
);

CREATE TABLE tbl_producto (
    prod_id SERIAL PRIMARY KEY,
    prod_nombre VARCHAR(100) NOT NULL,
    prod_descripcion VARCHAR(255) NOT NULL,
    prod_estado INT NOT NULL DEFAULT 0,
    tipo_prod_id INT NOT NULL,
    marc_id INT NOT NULL,
    FOREIGN KEY (tipo_prod_id) REFERENCES tbl_tipo_producto(tipo_prod_id),
    FOREIGN KEY (marc_id) REFERENCES tbl_marca(marc_id)
);

CREATE TABLE tbl_imagen (
    imag_id SERIAL PRIMARY KEY,
    imag_url VARCHAR(255) NOT NULL,
    prod_id INT NOT NULL,
    FOREIGN KEY (prod_id) REFERENCES tbl_producto(prod_id)
);

CREATE TABLE tbl_emprendedor_producto (
    empr_id INT NOT NULL,
    prod_id INT NOT NULL,
    FOREIGN KEY (empr_id) REFERENCES tbl_emprendedor(empr_id),
    FOREIGN KEY (prod_id) REFERENCES tbl_producto(prod_id),
    PRIMARY KEY (empr_id, prod_id)
);

CREATE TABLE tbl_tipo_solicitud (
    tipo_soli_id SERIAL PRIMARY KEY,
    tipo_soli_nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE tbl_solicitud (
    soli_id SERIAL PRIMARY KEY,
    soli_descripcion VARCHAR(255),
    soli_estado INT NOT NULL DEFAULT 0,
    soli_fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    soli_fecha_revision TIMESTAMP,
    tipo_soli_id INT NOT NULL,
    empr_id INT NOT NULL,
    usua_operador_id INT,
    prod_id INT,
    FOREIGN KEY (tipo_soli_id) REFERENCES tbl_tipo_solicitud(tipo_soli_id),
    FOREIGN KEY (empr_id) REFERENCES tbl_emprendedor(empr_id),
    FOREIGN KEY (prod_id) REFERENCES tbl_producto(prod_id),
    FOREIGN KEY (usua_operador_id) REFERENCES tbl_usuario(usua_id)
);

COMMIT;
