/** 
*? SENTENCIAS SQL
*/
//
const table = 'docentes';
const pk = 'id_docente';
// 
const insertInto = 
`INSERT INTO ${table} (cui, correo, nombres, apellidos, nombre_completo, genero, direccion)
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`; 
// 
const selectAll = 
`SELECT * FROM ${table}`;
// 
const selectWhereEstaActivo = 
`SELECT * FROM ${table} WHERE esta_activo = $1`;
//
const selectWhere = 
`SELECT * FROM ${table} WHERE ${pk} = $1`;
// 
const uptadeWhere = 
`UPDATE ${table}
SET cui = $1, correo = $2, nombres = $3, apellidos = $4, nombre_completo = $5, genero = $6, direccion = $7, esta_activo = $8
WHERE ${pk} = $9 RETURNING *`;
// 
const deleteWhere = 
`DELETE FROM ${table} WHERE ${pk} = $1 RETURNING *`;

/** 
*? MENSAJES
*/
// Para cuando se intenta obtener, actualizar o eliminar una persona por @cui y éste no se encuentra en la DB
const msgNotFound = (operacion, propiedad, valor)=>{
    return `No fue posible ${operacion} los datos, ${propiedad} = ${valor} no existen en la DB`;
}

module.exports = {
    insertInto,
    selectAll,
    selectWhereEstaActivo,
    selectWhere,
    uptadeWhere,
    deleteWhere,
    msgNotFound
};