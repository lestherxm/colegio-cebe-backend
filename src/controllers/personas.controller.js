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
} = require("../sql/personas.sql");

const create = async (req, res, next) => {
    try {
        const { cui, correo, nombres, apellidos, genero, fechaNacimiento, edad, direccion } = req.body;
        const nombreCompleto = `${nombres} ${apellidos}`;
        const result = await db.query(insertInto, [
            cui,
            correo,
            nombres,
            apellidos,
            nombreCompleto,
            genero,
            fechaNacimiento,
            edad,
            direccion,
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const readAll = async (req, res, next) => {
    try {
        const allPersonas = await db.query(selectAll);
        res.json(allPersonas.rows);
    } catch (error) {
        next(error);
    }
};

const readActive = async (req, res, next) => {
    try {
        const personasActivas = await db.query(selectWhereEstaActivo, [true]);
        res.json(personasActivas.rows);
    } catch (error) {
        next(error);
    }
};

const readNoActive = async (req, res, next) => {
    try {
        const personasInactivas = await db.query(selectWhereEstaActivo, [false]);
        res.json(personasInactivas.rows);
    } catch (error) {
        next(error);
    }
};

const readOne = async (req, res, next) => {
    try {
        const { cui } = req.params;
        const result = await db.query(selectWhere, [cui]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('obtener', 'cui', cui)
            });
        } //else
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const updateOne = async (req, res, next) => {
    try {
        const { cui } = req.params;
        const { newCui, correo, nombres, apellidos, genero, fechaNacimiento, edad, direccion, estaActivo } = req.body;
        const nombreCompleto = `${nombres} ${apellidos}`;
        const result = await db.query(uptadeWhere, [
            newCui,
            correo,
            nombres,
            apellidos,
            nombreCompleto,
            genero,
            fechaNacimiento,
            edad,
            direccion,
            estaActivo,
            cui,
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('actualizar', 'cui', cui)
            });
        } //else
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const { cui } = req.params;
        const result = await db.query(deleteWhere, [cui]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: msgNotFound('eliminar', 'cui', cui)
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
