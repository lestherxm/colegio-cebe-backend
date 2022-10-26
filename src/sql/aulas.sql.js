/** 
*? SENTENCIAS SQL
*/
// 
const table = 'aulas';
const pk = 'id_aula';
// 
const insertInto = 
`INSERT INTO ${table} (nombre, n_cupos) 
VALUES ($1, $2) RETURNING *`; 
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
`UPDATE ${table} SET nombre = $1, n_cupos = $2
WHERE ${pk} = $3 RETURNING *`;
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