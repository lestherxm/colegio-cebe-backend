//
const anios = require("../controllers/anios.controller");
//
const router = require("express").Router();
// End Point
const ep = '/anios';
//C
router.post(`${ep}`, anios.create);
//R
router.get(`${ep}`, anios.readAll);
//
router.get(`${ep}/:idAnio`, anios.readOne);
//U
router.put(`${ep}/:idAnio`, anios.updateOne);
//D
router.delete(`${ep}/:idAnio`, anios.deleteOne);

module.exports = router;