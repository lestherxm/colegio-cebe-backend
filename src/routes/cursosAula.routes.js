//
const cursosAula = require("../controllers/cursosAula.controller");
//
const router = require("express").Router();
// End Point
const ep = '/cursos-aula';
const pk = 'idAula';

//obtiene el nombre de los cursos de un aula en especifico
router.get(`${ep}/`, cursosAula.readAllCursosAula);

router.get(`${ep}/:${pk}`, cursosAula.readAllCursosWhereAula);

//D
router.delete(`${ep}/:${pk}`, cursosAula.deleteCursoAula);

//C
router.post(`${ep}`, cursosAula.create);

module.exports = router;