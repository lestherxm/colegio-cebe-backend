//Controlador con los metodos HTTP
const persona = require("../controllers/personas.controller");
//Objeto para definir rutas
const router = require("express").Router();
const ep = '/personas';
//
router.post(`${ep}`, persona.create);
//
router.get(`${ep}`, persona.readAll);
//
router.get(`${ep}/activas`, persona.readActive);
//
router.get(`${ep}/inactivas`, persona.readNoActive);
//
router.get(`${ep}/:cui`, persona.readOne);
//Actualizar !!!
router.put(`${ep}/:cui`, persona.updateOne);
//Eliminar !!!
router.delete(`${ep}/:cui`, persona.deleteOne);
//Define el endpoint y sus rutas

module.exports = router;