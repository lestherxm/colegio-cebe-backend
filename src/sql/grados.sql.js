/** 
*? SENTENCIAS SQL
*/
// 
const table = 'grados';
const pk = 'id_grado';
// 
const insertInto = 
`INSERT INTO ${table} (grado) VALUES ($1) RETURNING *`; 
// 
const selectAll = 
`SELECT * FROM ${table}`;
// 
const selectWhere = 
`SELECT * FROM ${table} where ${pk} = $1`
// 
const updateWhere = 
`UPDATE ${table} SET grado = $1 WHERE ${pk} = $2 RETURNING *`;
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