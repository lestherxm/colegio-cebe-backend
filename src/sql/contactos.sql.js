/** 
*? SENTENCIAS SQL
*/
//
const table = 'contactos';
const pk = 'id_contacto';
const fk1 = 'id_tipoc'
const fk2 = 'id_persona';

//
const insertInto =
`INSERT INTO ${table} (${fk1}, ${fk2}, contacto) VALUES ($1, $2, $3) RETURNING *`; 
//
const selectWhere = 
`SELECT * FROM ${table} WHERE ${fk2} = $1`;
//
const uptadeWhere = 
`UPDATE ${table} SET ${fk1} = $1, contacto= $2 WHERE ${pk} = $3 RETURNING *`;
//
const deleteWhere = 
`DELETE FROM ${table} WHERE ${pk} = $1 RETURNING *`;

/** 
*? MENSAJES
*/

// Para cuando se intenta obtener, actualizar o eliminar un rol por id y éste no se encuentra en la DB
const msgNotFound = (operacion, propiedad, valor)=>{
    return `No fue posible ${operacion} los datos, ${propiedad} = ${valor} no existen en la DB`;
}

module.exports = {
    insertInto,
    selectWhere,
    uptadeWhere,
    deleteWhere,
    msgNotFound
};