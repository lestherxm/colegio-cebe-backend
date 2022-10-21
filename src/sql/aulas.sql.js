/** 
*? SENTENCIAS SQL
*/
// 
const table = 'aulas';
const pk = 'id_aula';
// 
const insertInto = 
`INSERT INTO ${table} (id_grado, id_grupo, id_jornada, id_seccion, id_anio, nombre, n_cupos) 
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`; 
// 
const selectAll = 
`SELECT * FROM ${table}`;
// 
const selectWhere = 
`SELECT * FROM ${table} where ${pk} = $1`;
//
const selectAulaNameWhere =
`SELECT nombre FROM ${table} where ${pk} = $1`;
// 
const updateWhere = 
`UPDATE ${table} SET id_grado = $1, id_grupo = $2, id_jornada = $3, id_seccion = $4, id_anio = $5, nombre = $6, n_cupos = $7
WHERE ${pk} = $8 RETURNING *`;
// 
const deleteWhere = 
`DELETE FROM ${table} WHERE ${pk} = $1 RETURNING *`;

/** 
*? MENSAJES
*/

// Para cuando se intenta obtener, actualizar o eliminar un rol por id y éste no se encuentra en la DB
const msgNotFound = (operacion, propiedad, valor)=>{
    return `No fue posible ${operacion} los datos, ${propiedad} = ${valor} no existe en la DB`;
}

module.exports = {
    insertInto,
    selectAll,
    selectWhere,
    selectAulaNameWhere,
    updateWhere,
    deleteWhere,
    msgNotFound
};