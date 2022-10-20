//
const tiposDeContato = require("../controllers/tiposDeContacto.controller");
//
const router = require("express").Router();
//
router.post("/tipos-de-contacto", tiposDeContato.create);
//
router.get("/tipos-de-contacto", tiposDeContato.readAll);
//
router.get("/tipos-de-contacto/:idTipoc", tiposDeContato.readOne);
//
router.put("/tipos-de-contacto/:idTipoc", tiposDeContato.updateOne);
//
router.delete("/tipos-de-contacto/:idTipoc", tiposDeContato.deleteOne);

module.exports = router;