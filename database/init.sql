-- ** DDL **
CREATE TABLE personas(
    id_persona SERIAL PRIMARY KEY,
    cui CHAR(13) UNIQUE NOT NULL,
    correo VARCHAR(250) UNIQUE NOT NULL,
    nombres VARCHAR(250) NOT NULL,
    apellidos VARCHAR(250) NOT NULL,
    nombre_completo VARCHAR(250) NOT NULL, -- util para reportes
    genero CHAR(1) NOT NULL, 
    fecha_nacimiento DATE NOT NULL,
    edad SMALLINT NOT NULL,
    direccion VARCHAR(250) NOT NULL,
    esta_activo BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE roles(
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(250) UNIQUE NOT NULL,
    descripcion TEXT UNIQUE NOT NULL
);

CREATE TABLE tipos_de_contacto(
    id_tipoc SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE contactos(
    id_contacto SERIAL PRIMARY KEY,
    id_tipoc INT NOT NULL,  -- que tipo de contacto es: email, phone, social media link
    id_persona INT NOT NULL, -- para saber a que persona pertenece ese contacto
    contacto VARCHAR(250) NOT NULL UNIQUE, --puede venir un enlace muy grande si se trata de social media
    CONSTRAINT fk_tipoc
    FOREIGN KEY(id_tipoc)
    REFERENCES tipos_de_contacto(id_tipoc), --el tipo de contacto debe existir si o si, caso contrario da error.
    CONSTRAINT fk_persona
    FOREIGN KEY(id_persona) 
	REFERENCES personas(id_persona)
    ON DELETE CASCADE --Si se elimina los datos de la persona, tambien se elimina los contactos asociados a esa persona
); 

--* inicio: tablas para llenar combobox - creacion de aulas
CREATE TABLE grados(
    id_grado SERIAL PRIMARY KEY,
    grado VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE grupos(
    id_grupo SERIAL PRIMARY KEY,
    grupo VARCHAR(250) UNIQUE NOT NULL
);

CREATE TABLE jornadas(
    id_jornada SERIAL PRIMARY KEY,
    jornada VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE secciones(
    id_seccion SERIAL PRIMARY KEY,
    seccion VARCHAR(1) UNIQUE NOT NULL
);

CREATE TABLE anios(
    id_anio SERIAL PRIMARY KEY,
    anio CHAR(4) UNIQUE NOT NULL
);
--* fin: tablas para llenar combobox - creacion de aulas

CREATE TABLE aulas(
    id_aula SERIAL PRIMARY KEY,
    id_grado INT NOT NULL,
    id_grupo INT NOT NULL,
    id_jornada INT NOT NULL,
    id_seccion INT NOT NULL,
    id_anio INT NOT NULL,
    nombre VARCHAR(250) UNIQUE NOT NULL, -- concatenacion mediante combobox de grados, grupos, jornadas, seccions, anios.
    n_cupos SMALLINT NOT NULL DEFAULT 0,
    n_inscritos SMALLINT NOT NULL DEFAULT 0,
    CONSTRAINT chk_capacidad CHECK (n_inscritos <= n_cupos), -- de modo que no se puedan inscribir mas alumnos de los que soporta el aula.
    CONSTRAINT fk_grado FOREIGN KEY(id_grado) REFERENCES grados(id_grado),
    CONSTRAINT fk_grupo FOREIGN KEY(id_grupo) REFERENCES grupos(id_grupo),
    CONSTRAINT fk_jornada FOREIGN KEY(id_jornada) REFERENCES jornadas(id_jornada),
    CONSTRAINT fk_seccion FOREIGN KEY(id_seccion) REFERENCES secciones(id_seccion),
    CONSTRAINT fk_anio FOREIGN KEY(id_anio) REFERENCES anios(id_anio)
);

CREATE TABLE cursos(
    id_curso SERIAL PRIMARY KEY,
    nombre VARCHAR(250) UNIQUE NOT NULL,
    descripcion TEXT UNIQUE NOT NULL
);




















--* DATOS DE PRRUEBA

INSERT INTO cursos(nombre, descripcion) VALUES
('Matemática I', 'Descripción Matemática I'),
('Física I', 'Descripción Física I'),
('Química I', 'Descripción Química I'),
('Matemática II', 'Descripción Matemática II'),
('Física II', 'Descripción Física II'),
('Química II', 'Descripción Química II'),
('Matemática III', 'Descripción Matemática III'),
('Física III', 'Descripción Física III'),
('Química III', 'Descripción Química III');









