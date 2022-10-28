/** 
*? SENTENCIAS SQL
*/

// 1, conjelado temporalmente
const selectCursosAula = 
`SELECT * FROM cursos WHERE id_curso IN (SELECT id_curso FROM cursos_aula WHERE id_aula = 1)`;

const selectCursosWhereAula = `SELECT * FROM cursos WHERE id_curso IN (SELECT id_curso FROM cursos_aula WHERE id_aula = $1)`;

const deleteCursoAulaWhereCurso = `delete from cursos_aula where id_curso= $1 and id_aula= $2`;

const insertInto = `INSERT INTO cursos_aula(id_aula, id_curso) VALUES ($1, $2)`;

/** 
*? MENSAJES
*/

// Para cuando se intenta obtener, actualizar o eliminar un rol por id y éste no se encuentra en la DB
const msgNotFound = (operacion, propiedad, valor)=>{
    return `No fue posible ${operacion} los datos, ${propiedad} = ${valor} no existe en la DB`;
}

module.exports = {
    selectCursosAula,
    selectCursosWhereAula,
    deleteCursoAulaWhereCurso,
    insertInto,
    msgNotFound
};