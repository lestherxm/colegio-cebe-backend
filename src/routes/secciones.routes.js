//
const secciones = require("../controllers/secciones.controller");
//
const router = require("express").Router();
// End Point
const ep = '/secciones';
//C
router.post(`${ep}`, secciones.create);
//R
router.get(`${ep}`, secciones.readAll);
//
router.get(`${ep}/:idSeccion`, secciones.readOne);
//U
router.put(`${ep}/:idSeccion`, secciones.updateOne);
//D
router.delete(`${ep}/:idSeccion`, secciones.deleteOne);

module.exports = router;