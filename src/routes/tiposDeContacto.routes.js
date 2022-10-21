//
const tiposDeContato = require("../controllers/tiposDeContacto.controller");
//
const router = require("express").Router();
// End Point
const ep = '/tipos-de-contacto'
//
router.post(`${ep}`, tiposDeContato.create);
//
router.get(`${ep}`, tiposDeContato.readAll);
//
router.get(`${ep}/:idTipoc`, tiposDeContato.readOne);
//
router.put(`${ep}/:idTipoc`, tiposDeContato.updateOne);
//
router.delete(`${ep}/:idTipoc`, tiposDeContato.deleteOne);

module.exports = router;