-- ** DDL **
CREATE TABLE IF NOT EXISTS personas(
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

CREATE TABLE IF NOT EXISTS roles(
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(250) UNIQUE NOT NULL,
    descripcion TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS tipos_de_contacto(
    id_tipoc SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS contactos(
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
CREATE TABLE IF NOT EXISTS grados(
    id_grado SERIAL PRIMARY KEY,
    grado VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS grupos(
    id_grupo SERIAL PRIMARY KEY,
    grupo VARCHAR(250) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS jornadas(
    id_jornada SERIAL PRIMARY KEY,
    jornada VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS secciones(
    id_seccion SERIAL PRIMARY KEY,
    seccion VARCHAR(1) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS anios(
    id_anio SERIAL PRIMARY KEY,
    anio CHAR(4) UNIQUE NOT NULL
);
--* fin: tablas para llenar combobox - creacion de aulas

CREATE TABLE IF NOT EXISTS aulas(
    id_aula SERIAL PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL, -- concatenacion mediante combobox de grados, grupos, jornadas, seccions, anios.
    cupos SMALLINT NOT NULL DEFAULT 0,
    inscritos SMALLINT NOT NULL DEFAULT 0,
    CONSTRAINT chk_capacidad CHECK (inscritos <= cupos) -- de modo que no se puedan inscribir mas alumnos de los que soporta el aula.
);

-- CREATE TABLE alumnos(
--     idAlumno SERIAL PRIMARY KEY,
--     carnet VARCHAR(250) NOT NULL UNIQUE,
--     idRep INT NOT NULL, -- Representante: responde por el alumno por cuestiones administrativas (notas mainly)
--     idAula INT NOT NULL
-- );








