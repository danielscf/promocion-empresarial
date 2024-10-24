BEGIN;

-- Insertar usuarios
INSERT INTO tbl_usuario (usua_usuario, usua_contrasena, usua_dni, usua_nombre, usua_apellido_paterno, usua_apellido_materno, usua_correo, usua_telefono, usua_fecha_de_nacimiento, usua_estado) VALUES
('jdoe', 'password123', '12345678', 'John', 'Doe', 'Smith', 'jdoe@example.com', '912345678', '1990-01-01', 1),
('asmith', 'securePass!', '87654321', 'Alice', 'Smith', 'Johnson', 'asmith@example.com', '923456789', '1995-05-05', 1),
('mlopez', 'Lopez@2023', '45678912', 'Maria', 'Lopez', 'Martinez', 'mlopez@example.com', '934567890', '1987-08-08', 1),
('dperez', 'Perez#456', '78912345', 'David', 'Perez', 'Sanchez', 'dperez@example.com', '945678901', '1992-12-12', 1),
('jmartinez', 'Martinez&789', '32165498', 'Julia', 'Martinez', 'Torres', 'jmartinez@example.com', '956789012', '1999-11-11', 0);

-- Insertar roles
INSERT INTO tbl_rol (rol_nombre) VALUES
('Administrador'),
('Operador'),
('Emprendedor'),
('Moderador'),
('Supervisor');

-- Asignar roles a los usuarios
INSERT INTO tbl_usuario_rol (usua_id, rol_id) VALUES
(1, 1),
(2, 3),
(3, 3),
(4, 2),
(5, 4);

-- Insertar rubros
INSERT INTO tbl_rubro (rubr_nombre) VALUES
('Alimentos'),
('Tecnología'),
('Artesanía'),
('Servicios'),
('Educación');

-- Insertar tipos de contribuyente
INSERT INTO tbl_tipo_contribuyente (tipo_cont_nombre) VALUES
('Persona Natural'),
('Persona Jurídica'),
('Microempresa'),
('Pequeña Empresa'),
('Mediana Empresa');

-- Insertar tipos de actividad
INSERT INTO tbl_tipo_actividad (tipo_acti_nombre) VALUES
('Venta de Productos'),
('Prestación de Servicios'),
('Educación'),
('Consultoría'),
('Fabricación');

-- Insertar emprendedores
INSERT INTO tbl_emprendedor (empr_ruc, empr_direccion, empr_razon_social, empr_foto, usua_id, rubr_id, tipo_cont_id, tipo_acti_id) VALUES
('12345678901', 'Av. Siempre Viva 123', 'John Enterprises', 'foto1.jpg', 1, 1, 2, 1),
('98765432109', 'Calle Principal 456', 'Alice Tech Solutions', 'foto2.jpg', 2, 2, 3, 2),
('19283746501', 'Jirón Los Andes 789', 'Maria Craftworks', 'foto3.jpg', 3, 3, 1, 3),
('56473829102', 'Av. Los Olivos 321', 'David Services', 'foto4.jpg', 4, 4, 5, 4),
('83729104560', 'Calle La Paz 987', 'Julia Education Center', 'foto5.jpg', 5, 5, 4, 5);

-- Insertar tipos de evento
INSERT INTO tbl_tipo_evento (tipo_even_nombre) VALUES
('Seminario'),
('Workshop'),
('Conferencia'),
('Feria'),
('Taller');

-- Insertar eventos
INSERT INTO tbl_evento (even_nombre, even_descripcion, even_fecha_inicio, even_fecha_fin, even_hora_inicio, even_hora_fin, even_lugar, even_plantilla_diploma, tipo_even_id) VALUES
('Seminario de Emprendimiento', 'Un seminario para emprendedores novatos', '2024-11-01', '2024-11-01', '09:00', '12:00', 'Auditorio Central', 'plantilla1.jpg', 1),
('Workshop de Tecnología', 'Aprende nuevas tecnologías', '2024-11-05', '2024-11-06', '10:00', '17:00', 'Sala A', 'plantilla2.jpg', 2),
('Conferencia de Innovación', 'Conferencia sobre innovación empresarial', '2024-12-10', '2024-12-10', '08:00', '12:00', 'Centro de Convenciones', 'plantilla3.jpg', 3),
('Feria de Artesanías', 'Feria para promover productos artesanales', '2024-12-15', '2024-12-17', '09:00', '18:00', 'Parque Principal', 'plantilla4.jpg', 4),
('Taller de Consultoría', 'Taller para aprender sobre consultoría', '2025-01-10', '2025-01-11', '09:00', '13:00', 'Oficina Regional', 'plantilla5.jpg', 5);

-- Insertar tipos de producto
INSERT INTO tbl_tipo_producto (tipo_prod_nombre) VALUES
('Electrónicos'),
('Ropa'),
('Alimentos'),
('Artesanías'),
('Muebles');

-- Insertar marcas
INSERT INTO tbl_marca (marc_nombre, marc_imagen) VALUES
('Samsung', 'samsung_logo.jpg'),
('Nike', 'nike_logo.jpg'),
('Nestle', 'nestle_logo.jpg'),
('Artesanos del Sol', 'artesanos_logo.jpg'),
('Muebles Contemporáneos', 'muebles_logo.jpg');

-- Insertar productos
INSERT INTO tbl_producto (prod_nombre, prod_descripcion, prod_estado, tipo_prod_id, marc_id) VALUES
('Smartphone Galaxy', 'Smartphone Samsung Galaxy S20', 1, 1, 1),
('Zapatillas Air Max', 'Zapatillas deportivas Nike Air Max', 1, 2, 2),
('Chocolate Nestlé', 'Barra de chocolate Nestlé', 1, 3, 3),
('Artesanía de Barro', 'Vasija de barro hecha a mano', 1, 4, 4),
('Silla Contemporánea', 'Silla de diseño contemporáneo', 1, 5, 5);

-- Insertar imágenes de productos
INSERT INTO tbl_imagen (imag_url, prod_id) VALUES
('galaxy_s20.jpg', 1),
('air_max.jpg', 2),
('nestle_chocolate.jpg', 3),
('vasija_barro.jpg', 4),
('silla_contemporanea.jpg', 5);

-- Relacionar emprendedores con productos
INSERT INTO tbl_emprendedor_producto (empr_id, prod_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Insertar tipos de solicitud
INSERT INTO tbl_tipo_solicitud (tipo_soli_nombre) VALUES
('Registro de producto'),
('Modificación de producto'),
('Eliminación de producto'),
('Solicitud de evento'),
('Actualización de datos de usuario');

-- Insertar solicitudes
INSERT INTO tbl_solicitud (soli_descripcion, soli_estado, soli_fecha_revision, tipo_soli_id, empr_id, prod_id, usua_id) VALUES
('Solicitud para registrar un nuevo producto', 0, NULL, 1, 1, 1, 1),
('Modificación de la descripción del producto', 1, '2024-10-15 12:30:00', 2, 2, 2, 2),
('Eliminación de un producto obsoleto', 0, NULL, 3, 3, 3, 3),
('Solicitud para participar en un evento', 1, '2024-10-16 10:00:00', 4, 4, NULL, 4),
('Actualización de datos personales', 1, '2024-10-17 14:00:00', 5, 5, NULL, 5);

-- Insertar eventos de emprendedores
INSERT INTO tbl_evento_emprendedor (even_empr_asistencia, even_empr_diploma, even_empr_estado_firma_diploma, even_id, empr_id) VALUES
(1, 'diploma1.jpg', 1, 1, 1),
(0, 'diploma2.jpg', 0, 2, 2),
(1, 'diploma3.jpg', 1, 3, 3),
(0, 'diploma4.jpg', 0, 4, 4),
(1, 'diploma5.jpg', 1, 5, 5);

COMMIT;
