//Controlador con los metodos HTTP
const administrador = require("../controllers/administradores.controller");
//Objeto para definir rutas
const router = require("express").Router();
// End point
const ep = '/admins';
//
router.post(`${ep}`, administrador.create);
//
router.get(`${ep}`, administrador.readAll);
//
router.get(`${ep}/activos`, administrador.readActive);
//
router.get(`${ep}/inactivos`, administrador.readNoActive);
//
router.get(`${ep}/:correo`, administrador.readOneCorreo);
//
router.get(`${ep}/:cui`, administrador.readOneCui);
//Actualizar !!!
router.put(`${ep}/:cui`, administrador.updateOne);
//Eliminar !!!
router.delete(`${ep}/:cui`, administrador.deleteOne);
//Define el endpoint y sus rutas

module.exports = router;