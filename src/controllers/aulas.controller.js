const db = require("../../database/pool"); //credenciales bajo las cuales se realizan las operaciones crud
//sentencias sql en forma de strings para no hacer tediosa la lectura del codigo y (mensajes tambien se incluyen)
const {
    insertInto,
    selectAll,
    selectWhere,
    selectAulaNameWhere,
    updateWhere,
    deleteWhere,
    msgNotFound
} = require("../sql/aulas.sql");

const create = async (req, res, next) => {
    try {
        const { nombre, n_cupos } = req.body;
        const result = await db.query(insertInto, 
            [ nombre, n_cupos ]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const readAll = async (req, res, next) => {
    try {
        const allAulas = await db.query(selectAll);
        res.json(allAulas.rows);
    } catch (error) {
        next(error);
    }
};

const readOne = async (req, res, next) => {
    try {
        const { idAula } = req.params;
        const result = await db.query(selectWhere, [idAula]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('obtener', 'id_aula', idAula)
            });
        }//else
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};
// La diferencia con el anterior es que ese solo obtiene el nombre de un aula por su id
// Ideal para mostrar datos de alumnos, a que aula pertenecen.
const readNameOne = async (req, res, next) => {
    try {
        const { idAula } = req.params;
        const result = await db.query(selectAulaNameWhere, [idAula]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('obtener', 'id_aula', idAula)
            });
        }//else
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const updateOne = async (req, res, next) => {
    try {
        const { idAula } = req.params;
        const { nombre, n_cupos } = req.body;
        const result = await db.query(updateWhere, 
            [ nombre, n_cupos, idAula ]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('actualizar', 'id_aula', idAula),
            });
        } //else
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const { idAula } = req.params;
        const result = await db.query(deleteWhere, [idAula]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: msgNotFound('eliminar', 'id_aula', idAula),
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
    readNameOne,
    updateOne,
    deleteOne
};