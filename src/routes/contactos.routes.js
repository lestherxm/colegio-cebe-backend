//
const contacto = require("../controllers/contactos.controller");
//
const router = require("express").Router();
//
router.post("/contactos", contacto.create);
//
router.get("/contactos/:idPersona", contacto.readPorPersona);
//
router.put("/contactos/:idContacto", contacto.updateOne);
//
router.delete("/contactos/:idContacto", contacto.deleteOne);
//
module.exports = router;  

