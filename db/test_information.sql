BEGIN;

INSERT INTO tbl_usuario (usua_usuario, usua_contrasena, usua_dni, usua_nombre, usua_apellido_paterno,
                         usua_apellido_materno, usua_correo, usua_telefono, usua_fecha_nacimiento)
VALUES ('user1', 'pass1', '12345678', 'Juan', 'Pérez', 'Gómez', 'juan.perez@example.com', '912345678', '1990-01-01'),
       ('user2', 'pass2', '87654321', 'María', 'López', 'Fernández', 'maria.lopez@example.com', '923456789',
        '1992-02-02'),
       ('user3', 'pass3', '11223344', 'Carlos', 'Martín', 'Ríos', 'carlos.martin@example.com', '934567890',
        '1988-03-03'),
       ('user4', 'pass4', '44332211', 'Ana', 'Hernández', 'Castro', 'ana.hernandez@example.com', '945678901',
        '1995-04-04'),
       ('user5', 'pass5', '55667788', 'Luis', 'Díaz', 'Sánchez', 'luis.diaz@example.com', '956789012', '1991-05-05');

INSERT INTO tbl_rol (rol_nombre)
VALUES ('Emprendedor'),
       ('Administrador'),
       ('Operador'),
       ('Cliente'),
       ('Visitante');

INSERT INTO tbl_usuario_rol (usua_id, rol_id)
VALUES (1, 1),
       (2, 1),
       (3, 1),
       (4, 1),
       (5, 1);

INSERT INTO tbl_rubro (rubr_nombre)
VALUES ('Tecnología'),
       ('Alimentos'),
       ('Moda'),
       ('Educación'),
       ('Salud');

INSERT INTO tbl_tipo_contribuyente (tipo_cont_nombre)
VALUES ('Persona Natural con Negocio'),
       ('Sociedad Anónima Cerrada'),
       ('Sociedad Comercial de Responsabilidad Limitada'),
       ('Persona Natural'),
       ('Microempresa');

INSERT INTO tbl_tipo_actividad (tipo_acti_nombre)
VALUES ('Consultoría'),
       ('Ventas al por mayor'),
       ('Producción artesanal'),
       ('Servicios educativos'),
       ('Servicios de salud');

INSERT INTO tbl_emprendedor (empr_ruc, empr_direccion, empr_razon_social, empr_foto, usua_id, rubr_id, tipo_cont_id,
                             tipo_acti_id)
VALUES ('20123456789', 'Av. Siempre Viva 123', 'Empresa 1', 'foto1.jpg', 1, 1, 1, 1),
       ('20123456790', 'Calle Falsa 456', 'Empresa 2', 'foto2.jpg', 2, 2, 2, 2),
       ('20123456791', 'Av. Real 789', 'Empresa 3', 'foto3.jpg', 3, 3, 3, 3),
       ('20123456792', 'Jr. Ficticio 101', 'Empresa 4', 'foto4.jpg', 4, 4, 4, 4),
       ('20123456793', 'Pasaje Inexistente 202', 'Empresa 5', 'foto5.jpg', 5, 5, 5, 5);

INSERT INTO tbl_tipo_evento (tipo_even_nombre)
VALUES ('Conferencia'),
       ('Seminario'),
       ('Taller'),
       ('Exposición'),
       ('Networking');

INSERT INTO tbl_evento (even_nombre, even_descripcion, even_fecha_inicio, even_fecha_fin, even_hora_inicio,
                        even_hora_fin, even_lugar, even_plantilla_diploma, tipo_even_id)
VALUES ('Evento 1', 'Descripción evento 1', '2024-01-10', '2024-01-11', '09:00', '17:00', 'Lima', 'diploma1.jpg', 1),
       ('Evento 2', 'Descripción evento 2', '2024-02-20', '2024-02-21', '10:00', '18:00', 'Arequipa', 'diploma2.jpg',
        2),
       ('Evento 3', 'Descripción evento 3', '2024-03-15', '2024-03-16', '11:00', '19:00', 'Cusco', 'diploma3.jpg', 3),
       ('Evento 4', 'Descripción evento 4', '2024-04-25', '2024-04-26', '08:30', '16:30', 'Trujillo', 'diploma4.jpg',
        4),
       ('Evento 5', 'Descripción evento 5', '2024-05-05', '2024-05-06', '12:00', '20:00', 'Piura', 'diploma5.jpg', 5);

INSERT INTO tbl_participacion_evento (part_even_asistencia, part_even_diploma, even_id, empr_id)
VALUES (1, 'diploma1.jpg', 1, 1),
       (1, 'diploma2.jpg', 2, 2),
       (0, 'diploma3.jpg', 3, 3),
       (1, 'diploma4.jpg', 4, 4),
       (1, 'diploma5.jpg', 5, 5);

INSERT INTO tbl_tipo_producto (tipo_prod_nombre)
VALUES ('Electrónica'),
       ('Ropa'),
       ('Alimentos'),
       ('Educación'),
       ('Salud');

INSERT INTO tbl_marca (marc_nombre, marc_imagen)
VALUES ('Marca 1', 'marca1.jpg'),
       ('Marca 2', 'marca2.jpg'),
       ('Marca 3', 'marca3.jpg'),
       ('Marca 4', 'marca4.jpg'),
       ('Marca 5', 'marca5.jpg');

INSERT INTO tbl_producto (prod_nombre, prod_descripcion, tipo_prod_id, marc_id)
VALUES ('Producto 1', 'Descripción producto 1', 1, 1),
       ('Producto 2', 'Descripción producto 2', 2, 2),
       ('Producto 3', 'Descripción producto 3', 3, 3),
       ('Producto 4', 'Descripción producto 4', 4, 4),
       ('Producto 5', 'Descripción producto 5', 5, 5);

INSERT INTO tbl_imagen (imag_url, prod_id)
VALUES ('img1.jpg', 1),
       ('img2.jpg', 2),
       ('img3.jpg', 3),
       ('img4.jpg', 4),
       ('img5.jpg', 5);

INSERT INTO tbl_emprendedor_producto (empr_id, prod_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5);

INSERT INTO tbl_tipo_solicitud (tipo_soli_nombre)
VALUES ('Nuevo usuario emprendedor'),
       ('Solicitud de revisión'),
       ('Actualización de datos'),
       ('Certificación de evento'),
       ('Consulta general');

INSERT INTO tbl_solicitud (soli_descripcion, soli_estado, tipo_soli_id, empr_id, usua_operador_id, prod_id)
VALUES ('Solicitud para nuevo usuario emprendedor 1', 1, 1, 1, 1, 1),
       ('Solicitud para nuevo usuario emprendedor 2', 1, 1, 2, 2, 2),
       ('Solicitud para nuevo usuario emprendedor 3', 0, 1, 3, 3, 3),
       ('Solicitud para nuevo usuario emprendedor 4', 0, 1, 4, 4, 4),
       ('Solicitud para nuevo usuario emprendedor 5', 1, 1, 5, 5, 5);

COMMIT;
