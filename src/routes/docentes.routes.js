//Controlador con los metodos HTTP
const docente = require("../controllers/docentes.controller");
//Objeto para definir rutas
const router = require("express").Router();
// End point
const ep = '/docentes';
//
router.post(`${ep}`, docente.create);
//
router.get(`${ep}`, docente.readAll);
//
router.get(`${ep}/activos`, docente.readActive);
//
router.get(`${ep}/inactivos`, docente.readNoActive);
//
router.get(`${ep}/:idDocente`, docente.readOne);
//Actualizar !!!
router.put(`${ep}/:idDocente`, docente.updateOne);
//Eliminar !!!
router.delete(`${ep}/:idDocente`, docente.deleteOne);
//Define el endpoint y sus rutas

module.exports = router;