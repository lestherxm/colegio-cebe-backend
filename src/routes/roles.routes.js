//
const rol = require("../controllers/roles.controller");
//
const router = require("express").Router();
//
router.post("/roles", rol.create);
//
router.get("/roles", rol.readAll);
//
router.get("/roles/:idRol", rol.readOne);
//
router.put("/roles/:idRol", rol.updateOne);
//
router.delete("/roles/:idRol", rol.deleteOne);

module.exports = router;

