/** 
*? SENTENCIAS SQL
*/
// 
const table = 'cursos';
const pk = 'id_curso';
// 
const insertInto = 
`INSERT INTO ${table} (nombre, descripcion) VALUES ($1, $2) RETURNING *`; 
// 
const selectAll = 
`SELECT * FROM ${table}`;
// 
const selectWhere = 
`SELECT * FROM ${table} where ${pk} = $1`
// 
const updateWhere = 
`UPDATE ${table} SET nombre = $1, descripcion = $2 WHERE ${pk} = $3 RETURNING *`;
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
    updateWhere,
    deleteWhere,
    msgNotFound
};