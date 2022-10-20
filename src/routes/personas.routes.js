//Controlador con los metodos HTTP
const persona = require("../controllers/personas.controller");
//Objeto para definir rutas
const router = require("express").Router();
//
router.post("/personas", persona.create);
//
router.get("/personas", persona.readAll);
//
router.get("/personas/activas", persona.readActive);
//
router.get("/personas/inactivas", persona.readNoActive);
//
router.get("/personas/:cui", persona.readOne);
//Actualizar !!!
router.put("/personas/:cui", persona.updateOne);
//Eliminar !!!
router.delete("/personas/:cui", persona.deleteOne);
//Define el endpoint y sus rutas

module.exports = router;