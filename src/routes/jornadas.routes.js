//
const jornadas = require("../controllers/jornadas.controller");
//
const router = require("express").Router();
// End Point
const ep = '/jornadas';
//C
router.post(`${ep}`, jornadas.create);
//R
router.get(`${ep}`, jornadas.readAll);
//
router.get(`${ep}/:idJornada`, jornadas.readOne);
//U
router.put(`${ep}/:idJornada`, jornadas.updateOne);
//D
router.delete(`${ep}/:idJornada`, jornadas.deleteOne);

module.exports = router;