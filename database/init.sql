--* INICIO - CURSOS

DROP TABLE IF EXISTS cursos;
CREATE TABLE cursos(
    id_curso SERIAL PRIMARY KEY,
    nombre VARCHAR(250) UNIQUE NOT NULL,
    descripcion TEXT UNIQUE NOT NULL
);
INSERT INTO cursos(nombre, descripcion) VALUES
('MATEMÁTICA I', 'DESCRIPCIÓN MATEMÁTICA I'),
('FÍSICA I', 'DESCRIPCIÓN FÍSICA I'),
('QUÍMICA I', 'DESCRIPCIÓN QUÍMICA I'),
('MATEMÁTICA II', 'DESCRIPCIÓN MATEMÁTICA II'),
('FÍSICA II', 'DESCRIPCIÓN FÍSICA II'),
('QUÍMICA II', 'DESCRIPCIÓN QUÍMICA II'),
('MATEMÁTICA III', 'DESCRIPCIÓN MATEMÁTICA III'),
('FÍSICA III', 'DESCRIPCIÓN FÍSICA III'),
('QUÍMICA III', 'DESCRIPCIÓN QUÍMICA III');

--* FIN - CURSOS

--* INICIO - ADMINISTRADORES

DROP TABLE IF EXISTS administradores;
CREATE TABLE administradores(
    id_admin SERIAL PRIMARY KEY,
    cui CHAR(13) UNIQUE NOT NULL,
    correo VARCHAR(250) UNIQUE NOT NULL,
    nombres VARCHAR(250) NOT NULL,
    apellidos VARCHAR(250) NOT NULL,
    nombre_completo VARCHAR(250) NOT NULL, -- util para reportes
    genero CHAR(1) NOT NULL DEFAULT 'M', 
    direccion VARCHAR(250) NOT NULL,
    esta_activo BOOLEAN DEFAULT TRUE NOT NULL
);
INSERT INTO administradores(cui, correo, nombres, apellidos, nombre_completo, genero, direccion) VALUES
('1123456789123','srick@cebe.com', 'Rick','Sanchez', 'Rick Sanchez', 'M', 'P.O. Box 733, 218 Tincidunt Street');

--* FIN - ADMINISTRADORES

--* INICIO - DOCENTES

DROP TABLE IF EXISTS docentes;
CREATE TABLE docentes(
    id_docente SERIAL PRIMARY KEY,
    cui CHAR(13) UNIQUE NOT NULL,
    correo VARCHAR(250) UNIQUE NOT NULL,
    nombres VARCHAR(250) NOT NULL,
    apellidos VARCHAR(250) NOT NULL,
    nombre_completo VARCHAR(250) NOT NULL, -- util para reportes
    genero CHAR(1) NOT NULL DEFAULT 'M', 
    direccion VARCHAR(250) NOT NULL,
    esta_activo BOOLEAN DEFAULT TRUE NOT NULL
);
INSERT INTO docentes(cui, correo, nombres, apellidos, nombre_completo, genero, direccion) VALUES
('1123456789123','eesteban@cebe.com', 'Elmer','Esteban', 'Elmer Esteban', 'M', 'P.O. Box 733, 218 Tincidunt Street'),
('2123456789123','rpineda@cebe.com', 'Rony','Pineda', 'Rony Pineda', 'M', 'P.O. Box 733, 218 Tincidunt Street'),
('3123456789123','lgarcia@cebe.com', 'Lidia','Garcia', 'Lidia Garcia', 'F', 'P.O. Box 733, 218 Tincidunt Street'),
('4123456789123','emendez@cebe.com', 'Edwin','Mendez', 'Edwin Mendez', 'M', 'P.O. Box 733, 218 Tincidunt Street'),
('5123456789123','aroman@cebe.com', 'Alexander','Roman', 'Alexander Roman', 'M', 'P.O. Box 733, 218 Tincidunt Street'),
('6123456789123','jramirez@cebe.com', 'Jorge','Ramirez', 'Jorge Ramirez', 'M', 'P.O. Box 733, 218 Tincidunt Street');

--* FIN - DOCENTES

--* INICIO - AULAS

DROP TABLE IF EXISTS aulas;
CREATE TABLE aulas(
    id_aula SERIAL PRIMARY KEY,
    nombre VARCHAR(250) UNIQUE NOT NULL, -- concatenacion mediante combobox de grados, grupos, jornadas, seccions, anios.
    n_cupos SMALLINT NOT NULL DEFAULT 0,
    n_inscritos SMALLINT NOT NULL DEFAULT 0,
    CONSTRAINT chk_capacidad CHECK (n_inscritos <= n_cupos) -- de modo que no se puedan inscribir mas alumnos de los que soporta el aula.
);
INSERT INTO aulas(nombre, n_cupos) VALUES
('PRIMERO BÁSICO - JORNADA MATUTINA - SECCIÓN A - 2022', 32),
('SEGUNDO BÁSICO - JORNADA MATUTINA - SECCIÓN A - 2022', 28),
('TERCERO BÁSICO - JORNADA MATUTINA - SECCIÓN A - 2022', 23),
('PRIMERO BÁSICO - JORNADA VESPERTINA - SECCIÓN B - 2022', 32),
('SEGUNDO BÁSICO - JORNADA VESPERTINA - SECCIÓN B - 2022', 28),
('TERCERO BÁSICO - JORNADA VESPERTINA - SECCIÓN B - 2022', 23);

--* FIN - AULAS

--* INICIO - ALUMNOS

DROP TABLE IF EXISTS alumnos;
CREATE TABLE alumnos(
    id_alumno SERIAL PRIMARY KEY,
    cui CHAR(13) UNIQUE NOT NULL,
    correo VARCHAR(250) UNIQUE NOT NULL,
    nombres VARCHAR(250) NOT NULL,
    apellidos VARCHAR(250) NOT NULL,
    nombre_completo VARCHAR(250) NOT NULL, -- util para reportes
    genero CHAR(1) NOT NULL DEFAULT 'M', 
    direccion VARCHAR(250) NOT NULL,
    esta_activo BOOLEAN DEFAULT TRUE NOT NULL,
    id_aula INT NOT NULL,
    CONSTRAINT fk_aula
    FOREIGN KEY(id_aula)
    REFERENCES aulas(id_aula) --el tipo de contacto debe existir si o si, caso contrario da error.
);

-- https://www.youtube.com/watch?v=bxZM2fqo0wk
-- https://www.digitalocean.com/community/tutorials/sql-select-statement-with-count
-- https://docs.oracle.com/cd/E17781_01/appdev.112/e18147/tdddg_triggers.htm#TDDDG99934
--? Es necesario un triger que aumente @n_inscritos cada vez que un alumno se asigne un aula
--? El triger necesita ejecutar una funcion asi que, eso se hará
--* FUNCION A UTILIZAR AL MOMENTO DE INSERTAR UN NUEVO ALUMNO Y ACTUALIZAR LA CANTIDAD DE INSCRITOS EN SU AULA ASIGNADA
CREATE OR REPLACE FUNCTION fn_inscritos_aula_insert() RETURNS TRIGGER
AS
$$
BEGIN
    UPDATE aulas SET n_inscritos= (SELECT COUNT(id_aula) FROM alumnos WHERE id_aula = new.id_aula) WHERE id_aula = new.id_aula;
    RETURN NEW;
END
$$
Language plpgsql;
--* EL TRIGER EJECUTA ESA FUNCIONA DESPUES DE HABER INSERTADO UN ALUMNO
CREATE TRIGGER TR_INSERT AFTER INSERT ON alumnos
FOR EACH ROW
EXECUTE PROCEDURE fn_inscritos_aula_insert();

--* FUNCION A UTILIZAR AL MOMENTO DE ACTUALIZAR LOS DATOS DE UN ALUMNO Y ACTUALIZAR LA CANTIDAD DE INSCRITOS EN CASO DE QUE SU AULA HAYA CAMBIADO Y AUMENTAR EL CONTADOR DE SU NUEVA AULA
CREATE OR REPLACE FUNCTION fn_inscritos_aula_update() RETURNS TRIGGER
AS
$$
BEGIN
    UPDATE aulas SET n_inscritos= (SELECT COUNT(id_aula) FROM alumnos WHERE id_aula = old.id_aula) WHERE id_aula = old.id_aula; 
    UPDATE aulas SET n_inscritos= (SELECT COUNT(id_aula) FROM alumnos WHERE id_aula = new.id_aula) WHERE id_aula = new.id_aula;
    RETURN NEW;
END
$$
Language plpgsql;
--* EL TRIGER EJECUTA ESA FUNCIONA DESPUES DE HABER INSERTADO UN ALUMNO
CREATE TRIGGER TR_UPDATE AFTER UPDATE ON alumnos
FOR EACH ROW
EXECUTE PROCEDURE fn_inscritos_aula_update();

--* INSERTANDO DATOS DE PRUEBA
INSERT INTO alumnos(cui, correo, nombres, apellidos, nombre_completo, genero, direccion, id_aula) VALUES
('1123456789123','apereira@cebe.com', 'Alejandro','Pereira', 'Alejandro Pereira', 'M', 'P.O. Box 733, 218 Tincidunt Street', 1),
('2123456789123','aruiz@cebe.com', 'Alvaro','Ruiz', 'Alvaro Ruiz', 'M', 'P.O. Box 733, 218 Tincidunt Street', 1),
('3123456789123','margueta@cebe.com', 'Manuel','Argueta', 'Manuel Argueta', 'F', 'P.O. Box 733, 218 Tincidunt Street', 2),
('4123456789123','mhernandez@cebe.com', 'Marta','Hernandez', 'Marta Hernadez', 'M', 'P.O. Box 733, 218 Tincidunt Street', 2),
('5123456789123','jcastillo@cebe.com', 'Juan','Castillo', 'Juan Castillo', 'M', 'P.O. Box 733, 218 Tincidunt Street', 3),
('6123456789123','apaz@cebe.com', 'Alejandra','Paz', 'Alejandra Paz', 'M', 'P.O. Box 733, 218 Tincidunt Street', 3);

--* FIN - ALUMNOS

--* INICIO  - ROLES

DROP TABLE IF EXISTS roles;
CREATE TABLE roles(
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(250) UNIQUE NOT NULL,
    descripcion TEXT UNIQUE NOT NULL
);
INSERT INTO roles(nombre, descripcion) VALUES
('Administrador', 'Supervisan las tareas administrativas del colegio, garantizan que la organización funcione a la perfección y también gestionan instalaciones y personal'),
('Docente', 'Su función es de carácter profesional que implica la realización directa de los procesos sistemáticos de enseñanza - aprendizaje, lo cual incluye el diagnóstico, la planificación, la ejecución y la evaluación de los mismos procesos y sus resultados, y de otras actividades educativas'),
('Estudiante', 'Se dedica a la aprehensión, puesta en práctica y lectura de conocimientos sobre las diferentes ramas de alguna ciencia, disciplina o arte impartido por un catedrático'),
('Padre de familia', 'El padre de familia puede supervisar los datos de los alumnos que hayan sido asignados a su dependencia'),
('Madre de familia', 'La madre de familia puede supervisar los datos de los alumnos que hayan sido asignados a su dependencia'),
('Encargado de estudiante','El encargado de estudiante puede supervisar los datos de los alumnos que hayan sido asignados a su dependencia');

--* FIN - ROLES

--* INICIO - TIPOS DE CONTACTO

DROP TABLE IF EXISTS tipos_de_contacto;
CREATE TABLE tipos_de_contacto(
    id_tipoc SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);
INSERT INTO tipos_de_contacto(nombre) VALUES
('celular'),('telefono'),('facebook'),('twitter'),('instagram'),('linkedin');

--* FIN - TIPOS DE CONTACTO

--* INICIO - CONTACTOS

-- DROP TABLE IF EXISTS contactos;
-- CREATE TABLE contactos(
--     id_contacto SERIAL PRIMARY KEY,
--     id_tipoc INT NOT NULL,  -- que tipo de contacto es: email, phone, social media link
--     id_persona INT NOT NULL, -- para saber a que persona pertenece ese contacto
--     contacto VARCHAR(250) NOT NULL UNIQUE, --puede venir un enlace muy grande si se trata de social media
--     CONSTRAINT fk_tipoc
--     FOREIGN KEY(id_tipoc)
--     REFERENCES tipos_de_contacto(id_tipoc), --el tipo de contacto debe existir si o si, caso contrario da error.
--     CONSTRAINT fk_persona
--     FOREIGN KEY(id_persona) 
-- 	REFERENCES personas(id_persona)
--     ON DELETE CASCADE --Si se elimina los datos de la persona, tambien se elimina los contactos asociados a esa persona
-- ); 
-- INSERT INTO contactos(id_tipoc, id_persona, contacto) VALUES
-- (1, 1, '12345678');

--* FIN - CONTACTOS

--* INICIO - GRADOS

DROP TABLE IF EXISTS grados;
CREATE TABLE grados(
    id_grado SERIAL PRIMARY KEY,
    grado VARCHAR(20) UNIQUE NOT NULL
);
INSERT INTO grados(grado) VALUES ('PRIMERO'), ('SEGUNDO'), ('TERCERO'), ('CUARTO'), ('QUINTO');

--* FIN - GRADOS

--* INICIO - GRUPOS

DROP TABLE IF EXISTS grupos;
CREATE TABLE grupos(
    id_grupo SERIAL PRIMARY KEY,
    grupo VARCHAR(250) UNIQUE NOT NULL
);
INSERT INTO grupos(grupo) VALUES ('BÁSICO'), ('BACHILLERATO EN COMPUTACIÓN'), ('PRIMARIA');

--* FIN - GRUPOS

--* INICIO - JORNADAS

DROP TABLE IF EXISTS jornadas;
CREATE TABLE jornadas(
    id_jornada SERIAL PRIMARY KEY,
    jornada VARCHAR(20) UNIQUE NOT NULL
);
INSERT INTO jornadas(jornada) VALUES('VESPERTINA'), ('MATUTINA');

--* FIN - JORNADAS

--* INICIO - SECCIONES

DROP TABLE IF EXISTS secciones;
CREATE TABLE secciones(
    id_seccion SERIAL PRIMARY KEY,
    seccion VARCHAR(1) UNIQUE NOT NULL
);
INSERT INTO secciones(seccion) VALUES('A'), ('B'), ('C'), ('D');

--* FIN - SECCIONES

--* INICIO - AÑOS

DROP TABLE IF EXISTS anios;
CREATE TABLE anios(
    id_anio SERIAL PRIMARY KEY,
    anio CHAR(4) UNIQUE NOT NULL
);
INSERT INTO anios(anio) VALUES('2022'), ('2021'), ('2020'), ('2019'), ('2018');

--* FIN - AÑOS