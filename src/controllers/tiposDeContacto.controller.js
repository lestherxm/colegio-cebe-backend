const db = require("../../database/pool"); //credenciales bajo las cuales se realizan las operaciones crud
//sentencias sql en forma de strings para no hacer tediosa la lectura del codigo y (mensajes tambien se incluyen)
const {
    insertInto,
    selectAll,
    selectWhere,
    updateWhere,
    deleteWhere,
    msgNotFound
} = require("../sql/tiposDeContacto.sql");

const create = async (req, res, next) => {
    try {
        const { nombre } = req.body;
        const result = await db.query(insertInto, [nombre]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const readAll = async (req, res, next) => {
    try {
        const allTiposDeContacto = await db.query(selectAll);
        res.json(allTiposDeContacto.rows);
    } catch (error) {
        next(error);
    }
};

const readOne = async (req, res, next) => {
    try {
        const { idTipoc } = req.params;
        const result = await db.query(selectWhere, [idTipoc]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('obtener', 'id_tipoc', idTipoc)
            });
        } //else
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const updateOne = async (req, res, next) => {
    try {
        const { idTipoc } = req.params;
        const { nombre } = req.body;
        const result = await db.query(updateWhere, [ nombre, idTipoc ]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('actualizar', 'id_tipoc', idTipoc),
            });
        } //else
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const { idTipoc } = req.params;
        const result = await db.query(deleteWhere, [idTipoc]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: msgNotFound('eliminar', 'id_tipoc',idTipoc)
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
