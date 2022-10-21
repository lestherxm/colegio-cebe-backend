//
const cursos = require("../controllers/cursos.controller");
//
const router = require("express").Router();
// End Point
const ep = '/cursos';
const pk = 'idCurso'
//C
router.post(`${ep}`, cursos.create);
//R
router.get(`${ep}`, cursos.readAll);
//
router.get(`${ep}/:${pk}`, cursos.readOne);
//U
router.put(`${ep}/:${pk}`, cursos.updateOne);
//D
router.delete(`${ep}/:${pk}`, cursos.deleteOne);

module.exports = router;