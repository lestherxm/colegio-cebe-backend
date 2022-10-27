//Controlador con los metodos HTTP
const alumno = require("../controllers/alumnos.controller");
//Objeto para definir rutas
const router = require("express").Router();
// End point
const ep = '/alumnos';
//
router.post(`${ep}`, alumno.create);
//
router.get(`${ep}`, alumno.readAll);
//
router.get(`${ep}/activos`, alumno.readActive);
//
router.get(`${ep}/inactivos`, alumno.readNoActive);
//
router.get(`${ep}/:idAlumno`, alumno.readOne);
//Actualizar !!!
router.put(`${ep}/:idAlumno`, alumno.updateOne);
//Eliminar !!!
router.delete(`${ep}/:idAlumno`, alumno.deleteOne);
//Define el endpoint y sus rutas

module.exports = router;