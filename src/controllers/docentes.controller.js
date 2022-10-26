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
} = require("../sql/docentes.sql");

const create = async (req, res, next) => {
    try {
        const { cui, correo, nombres, apellidos, direccion, genero } = req.body;
        const nombreCompleto = `${nombres} ${apellidos}`;
        const result = await db.query(insertInto, [
            cui,
            correo,
            nombres,
            apellidos,
            nombreCompleto,
            genero,
            direccion
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const readAll = async (req, res, next) => {
    try {
        const allDocentes = await db.query(selectAll);
        res.json(allDocentes.rows);
    } catch (error) {
        next(error);
    }
};

const readActive = async (req, res, next) => {
    try {
        const docentesActivos = await db.query(selectWhereEstaActivo, [true]);
        res.json(docentesActivos.rows);
    } catch (error) {
        next(error);
    }
};

const readNoActive = async (req, res, next) => {
    try {
        const docentesInactivos = await db.query(selectWhereEstaActivo, [false]);
        res.json(docentesInactivos.rows);
    } catch (error) {
        next(error);
    }
};
//con correo
const readOne = async (req, res, next) => {
    try {
        const { idDocente } = req.params;
        const result = await db.query(selectWhere, [idDocente]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('obtener', 'id_docente', idDocente)
            });
        } //else
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const updateOne = async (req, res, next) => {
    try {
        const { idDocente } = req.params;
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
            idDocente
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('actualizar', 'id_docente', idDocente)
            });
        } //else
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const { idDocente } = req.params;
        const result = await db.query(deleteWhere, [idDocente]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: msgNotFound('eliminar', 'id_docente', idDocente)
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
