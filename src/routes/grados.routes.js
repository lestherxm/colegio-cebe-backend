//
const grados = require("../controllers/grados.controller");
//
const router = require("express").Router();
// End Points
const ep = '/grados';
//C
router.post(`${ep}`, grados.create);
//R
router.get(`${ep}`, grados.readAll);
//
router.get(`${ep}/:idGrado`, grados.readOne);
//U
router.put(`${ep}/:idGrado`, grados.updateOne);
//D
router.delete(`${ep}/:idGrado`, grados.deleteOne);

module.exports = router;