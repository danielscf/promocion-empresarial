BEGIN;

CREATE TABLE tbl_usuario (
    usua_id SERIAL PRIMARY KEY,
    usua_usuario VARCHAR(50) NOT NULL,
    usua_contrasena VARCHAR(255) NOT NULL,
    usua_dni CHAR(8) NOT NULL,
    usua_nombre VARCHAR(50) NOT NULL,
    usua_apellido_paterno VARCHAR(50) NOT NULL,
    usua_apellido_materno VARCHAR(50) NOT NULL,
    usua_correo VARCHAR(100) NOT NULL,
    usua_telefono VARCHAR(9) NOT NULL,
    usua_fecha_de_nacimiento DATE,
    usua_estado INT NOT NULL DEFAULT 0,
    usua_fecha_de_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usua_fecha_de_modificacion TIMESTAMP,
    usua_fecha_de_ultima_sesion TIMESTAMP
);

CREATE TABLE tbl_rol (
    rol_id SERIAL PRIMARY KEY,
    rol_nombre VARCHAR(50) NOT NULL
);

CREATE TABLE tbl_usuario_rol (
    usua_rol_id SERIAL PRIMARY KEY,
    usua_id INT NOT NULL,
    rol_id INT NOT NULL,
    FOREIGN KEY (usua_id) REFERENCES tbl_usuario(usua_id),
    FOREIGN KEY (rol_id) REFERENCES tbl_rol(rol_id)
);

CREATE TABLE tbl_rubro (
    rubr_id SERIAL PRIMARY KEY,
    rubr_nombre VARCHAR(100) NOT NULL
);

CREATE TABLE tbl_emprendedor (
    empr_id SERIAL PRIMARY KEY,
    empr_ruc VARCHAR(11) NOT NULL,
    empr_direccion VARCHAR(255) NOT NULL,
    empr_marca VARCHAR(100) NOT NULL,
    empr_razon_social VARCHAR(100) NOT NULL,
    empr_foto VARCHAR(255),
    usua_id INT NOT NULL,
    rubr_id INT NOT NULL,
    FOREIGN KEY (usua_id) REFERENCES tbl_usuario(usua_id),
    FOREIGN KEY (rubr_id) REFERENCES tbl_rubro(rubr_id)
);

CREATE TABLE tbl_tipo_evento (
    tipo_even_id SERIAL PRIMARY KEY,
    tipo_even_nombre VARCHAR(50) NOT NULL
);

CREATE TABLE tbl_evento (
    even_id SERIAL PRIMARY KEY,
    even_nombre VARCHAR(100) NOT NULL,
    even_descripcion VARCHAR(255) NOT NULL,
    even_fecha DATE NOT NULL,
    even_hora TIME NOT NULL,
    even_lugar VARCHAR(150) NOT NULL,
    even_diploma VARCHAR(255) NOT NULL,
    tipo_even_id INT NOT NULL,
    FOREIGN KEY (tipo_even_id) REFERENCES tbl_tipo_evento(tipo_even_id)
);

CREATE TABLE tbl_evento_emprendedor (
    even_empr_id SERIAL PRIMARY KEY,
    even_empr_asistencia INT NOT NULL DEFAULT 0,
    even_id INT NOT NULL,
    empr_id INT NOT NULL,
    FOREIGN KEY (even_id) REFERENCES tbl_evento(even_id),
    FOREIGN KEY (empr_id) REFERENCES tbl_emprendedor(empr_id)
);

CREATE TABLE tbl_producto (
    prod_id SERIAL PRIMARY KEY,
    prod_nombre VARCHAR(100) NOT NULL,
    prod_descripcion VARCHAR(255) NOT NULL,
    prod_estado INT NOT NULL DEFAULT 0
);

CREATE TABLE tbl_imagen (
    imag_id SERIAL PRIMARY KEY,
    imag_url VARCHAR(255) NOT NULL
);

CREATE TABLE tbl_imagen_producto (
    imag_prod_id SERIAL PRIMARY KEY,
    imag_id INT NOT NULL,
    prod_id INT NOT NULL,
    FOREIGN KEY (imag_id) REFERENCES tbl_imagen(imag_id),
    FOREIGN KEY (prod_id) REFERENCES tbl_producto(prod_id)
);

CREATE TABLE tbl_emprendedor_producto (
    empr_prod_id SERIAL PRIMARY KEY,
    empr_id INT NOT NULL,
    prod_id INT NOT NULL,
    FOREIGN KEY (empr_id) REFERENCES tbl_emprendedor(empr_id),
    FOREIGN KEY (prod_id) REFERENCES tbl_producto(prod_id)
);

CREATE TABLE tbl_solicitud (
    soli_id SERIAL PRIMARY KEY,
    soli_descripcion VARCHAR(255),
    soli_estado INT NOT NULL DEFAULT 0,
    soli_fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    soli_fecha_revision TIMESTAMP,
    empr_prod_id INT NOT NULL,
    usua_id INT,
    FOREIGN KEY (empr_prod_id) REFERENCES tbl_emprendedor_producto(empr_prod_id),
    FOREIGN KEY (usua_id) REFERENCES tbl_usuario(usua_id)
);

COMMIT;

