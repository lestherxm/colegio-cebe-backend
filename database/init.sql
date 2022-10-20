CREATE TABLE IF NOT EXISTS personas(
    id_persona SERIAL PRIMARY KEY,
    cui CHAR(13) UNIQUE NOT NULL,
    correo VARCHAR(250) UNIQUE NOT NULL,
    nombres VARCHAR(250) NOT NULL,
    apellidos VARCHAR(250) NOT NULL,
    nombre_completo VARCHAR(250) NOT NULL,
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

-- grado que se va a asignar.
-- representante
-- CREATE TABLE alumnos(
--     idAlumno SERIAL PRIMARY KEY,
--     carnet VARCHAR(250) NOT NULL UNIQUE,
--     idPersona INT NOT NULL UNIQUE, 
--     CONSTRAINT fk_persona
--     FOREIGN KEY(idPersona) 
-- 	REFERENCES personas(idPersona)
--     ON DELETE CASCADE
-- );

-- CREATE TABLE anios(
--     idAnio SERIAL PRIMARY KEY,
--     anio CHAR(4) UNIQUE NOT NULL
-- );

-- CREATE TABLE grados(
--     idGrado SERIAL PRIMARY KEY,
--     nombre VARCHAR(250) UNIQUE NOT NULL
-- );

-- CREATE TABLE grupos(
--     idGrupo SERIAL PRIMARY KEY,
--     nombre VARCHAR(250) UNIQUE NOT NULL
-- );

-- CREATE TABLE jornadas(
--     idJornada SERIAL PRIMARY KEY,
--     nombre VARCHAR(250) UNIQUE NOT NULL
-- );



