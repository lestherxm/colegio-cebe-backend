const db = require("../../database/pool"); //credenciales bajo las cuales se realizan las operaciones crud
//sentencias sql en forma de strings para no hacer tediosa la lectura del codigo y (mensajes tambien se incluyen)
const {
    insertInto,
    selectWhere,
    uptadeWhere,
    deleteWhere,
    msgNotFound
} = require("../sql/contactos.sql");

const create = async (req, res, next) => {
    try {
        const {idTipoc, idPersona, contacto} = req.body;
        const result = await db.query(insertInto, [
            idTipoc,
            idPersona,
            contacto
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const readPorPersona = async (req, res, next) => {
    try {
        const { idPersona } = req.params;
        const result = await db.query(selectWhere, [idPersona]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('obtener', 'id_persona', idPersona)
            });
        } //else
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const updateOne = async (req, res, next) => {
    try {
        const { idContacto } = req.params;
        const { idTipoc, contacto } = req.body;
        const result = await db.query(uptadeWhere, [
            idTipoc,
            contacto,
            idContacto
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('actualizar', 'id_contacto', idContacto)
            });
        } //else
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const { idContacto } = req.params;
        const result = await db.query(deleteWhere, [idContacto]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: msgNotFound('eliminar', 'id_contacto', idContacto)
            });
        }//else
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    readPorPersona,
    updateOne,
    deleteOne
};
