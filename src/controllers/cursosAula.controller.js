const db = require("../../database/pool"); //credenciales bajo las cuales se realizan las operaciones crud
//sentencias sql en forma de strings para no hacer tediosa la lectura del codigo y (mensajes tambien se incluyen)
const {
    selectCursosAula,
    selectCursosWhereAula,
    deleteCursoAulaWhereCurso,
    insertInto,
    msgNotFound
} = require("../sql/cursosAula.sql"); //change this for each controller

const create = async (req, res, next) => {
    try {
        // validar
        const { idAula } = req.params;
        const { idCurso } = req.body;
        const result = await db.query(insertInto, [idAula, idCurso]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const readAllCursosAula = async (req, res, next) => {
    try {
        const allCursosAula = await db.query(selectCursosAula);
        res.json(allCursosAula.rows);
    } catch (error) {
        next(error);
    }
};

const readAllCursosWhereAula = async (req, res, next) => {
    try {
        const { idAula } = req.params;
        const result = await db.query(selectCursosWhereAula, [idAula]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: msgNotFound('obtener', 'id_aula', idAula)
            });
        }//else
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const deleteCursoAula = async (req, res, next) => {
    try {
        const { idAula } = req.params;
        const { idCurso } = req.body;
        const result = await db.query(deleteCursoAulaWhereCurso, [idCurso, idAula]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: msgNotFound('eliminar', 'id_curso', idCurso)
            });
        }//else
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    readAllCursosAula,
    readAllCursosWhereAula,
    deleteCursoAula,
    create
};