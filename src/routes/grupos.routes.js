//
const grupos = require("../controllers/grupos.controller");
//
const router = require("express").Router();
// End Point
const ep = '/grupos';
//C
router.post(`${ep}`, grupos.create);
//R
router.get(`${ep}`, grupos.readAll);
//
router.get(`${ep}/:idGrupo`, grupos.readOne);
//U
router.put(`${ep}/:idGrupo`, grupos.updateOne);
//D
router.delete(`${ep}/:idGrupo`, grupos.deleteOne);

module.exports = router;