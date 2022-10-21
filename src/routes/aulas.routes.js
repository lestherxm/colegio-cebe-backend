//
const aulas = require("../controllers/aulas.controller");
//
const router = require("express").Router();
// End Point
const ep = '/aulas';
const pk = 'idAula';
//C
router.post(`${ep}`, aulas.create);
//R
router.get(`${ep}`, aulas.readAll);
//
router.get(`${ep}/:${pk}`, aulas.readOne);
// obtener solamente el nombre de un aula.
router.get(`${ep}/:${pk}/nombre`, aulas.readNameOne);
//U
router.put(`${ep}/:${pk}`, aulas.updateOne);
//D
router.delete(`${ep}/:${pk}`, aulas.deleteOne);

module.exports = router;