//
const rol = require("../controllers/roles.controller");
//
const router = require("express").Router();
// End point
const ep = '/roles';
//
router.post(`${ep}`, rol.create);
//
router.get(`${ep}`, rol.readAll);
//
router.get(`${ep}/:idRol`, rol.readOne);
//
router.put(`${ep}/:idRol`, rol.updateOne);
//
router.delete(`${ep}/:idRol`, rol.deleteOne);

module.exports = router;

