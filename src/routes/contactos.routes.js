//
const contacto = require("../controllers/contactos.controller");
//
const router = require("express").Router();
// End Point
const ep = '/contactos';
//
router.post(`${ep}`, contacto.create);
//
router.get(`${ep}/:idPersona`, contacto.readPorPersona);
//
router.put(`${ep}/:idContacto`, contacto.updateOne);
//
router.delete(`${ep}/:idContacto`, contacto.deleteOne);
//
module.exports = router;  

