const db = require("../../database/pool"); //credenciales bajo las cuales se realizan las operaciones crud
//sentencias sql en forma de strings para no hacer tediosa la lectura del codigo y (mensajes tambien se incluyen)
const {
    insertInto,
    selectAll,
    selectWhere,
    updateWhere,
    deleteWhere,
    msgNotFound
} = require("../sql/anios.sql");

const create = async (req, res, next) => {
    try {
        const { anio } = req.body;
        const result = await db.query(insertInto, [anio]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const readAll = async (req, res, next) => {
    try {
        const allAnios = await db.query(selectAll);
        res.json(allAnios.rows);
    } catch (error) {
        next(error);
    }
};

const readOne = async (req, res, next) => {
    try {
        const { idAnio } = req.params;
        const result = await db.query(selectWhere, [idAnio]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('obtener', 'id_anio', idAnio)
            });
        }//else
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const updateOne = async (req, res, next) => {
    try {
        const { idAnio } = req.params;
        const { anio } = req.body;
        const result = await db.query(updateWhere, [ anio, idAnio ]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('actualizar', 'id_anio', idAnio),
            });
        } //else
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const { idAnio } = req.params;
        const result = await db.query(deleteWhere, [idAnio]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: msgNotFound('eliminar', 'id_anio', idAnio),
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
    readOne,
    updateOne,
    deleteOne
};