const db = require("../../database/pool"); //credenciales bajo las cuales se realizan las operaciones crud
//sentencias sql en forma de strings para no hacer tediosa la lectura del codigo y (mensajes tambien se incluyen)
const {
    insertInto,
    selectAll,
    selectWhereEstaActivo,
    selectWhere,
    uptadeWhere,
    deleteWhere,
    msgNotFound
} = require("../sql/alumnos.sql");

const create = async (req, res, next) => {
    try {
        const { cui, correo, nombres, apellidos, direccion, genero, id_aula } = req.body;
        const nombreCompleto = `${nombres} ${apellidos}`;
        const result = await db.query(insertInto, [
            cui,
            correo,
            nombres,
            apellidos,
            nombreCompleto,
            genero,
            direccion,
            id_aula
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const readAll = async (req, res, next) => {
    try {
        const allAlumnos = await db.query(selectAll);
        res.json(allAlumnos.rows);
    } catch (error) {
        next(error);
    }
};

const readActive = async (req, res, next) => {
    try {
        const alumnosActivos = await db.query(selectWhereEstaActivo, [true]);
        res.json(alumnosActivos.rows);
    } catch (error) {
        next(error);
    }
};

const readNoActive = async (req, res, next) => {
    try {
        const alumnosInativos = await db.query(selectWhereEstaActivo, [false]);
        res.json(alumnosInativos.rows);
    } catch (error) {
        next(error);
    }
};
//con correo
const readOne = async (req, res, next) => {
    try {
        const { idAlumno } = req.params;
        const result = await db.query(selectWhere, [idAlumno]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('obtener', 'id_alumno', idAlumno)
            });
        } //else
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const updateOne = async (req, res, next) => {
    try {
        const { idAlumno } = req.params;
        const { cui, correo, nombres, apellidos, genero, direccion, esta_activo } = req.body;
        const nombreCompleto = `${nombres} ${apellidos}`;
        const result = await db.query(uptadeWhere, [
            cui,
            correo,
            nombres,
            apellidos,
            nombreCompleto,
            genero,
            direccion,
            esta_activo,
            id_aula,
            idAlumno
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('actualizar', 'id_alumno', idAlumno)
            });
        } //else
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const { idAlumno } = req.params;
        const result = await db.query(deleteWhere, [idAlumno]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: msgNotFound('eliminar', 'id_alumno', idAlumno)
            });
        }//else
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    readAll,
    readActive,
    readNoActive,
    readOne,
    updateOne,
    deleteOne
};
