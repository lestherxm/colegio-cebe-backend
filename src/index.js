const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// TODO > importar rutas aqui
const personas = require('./routes/personas.routes');
const contactos = require('./routes/contactos.routes');
const roles = require('./routes/roles.routes');
const tiposDeContacto = require('./routes/tiposDeContacto.routes');
const grados = require('./routes/grados.routes');
const grupos = require('./routes/grupos.routes');
const jornadas = require('./routes/jornadas.routes');
const secciones = require('./routes/secciones.routes');
const anios = require('./routes/anios.routes');
const aulas = require('./routes/aulas.routes');
const cursos = require('./routes/cursos.routes');
const admins = require('./routes/administradores.routes');
const docentes = require('./routes/docentes.routes');
const alumnos = require('./routes/alumnos.routes');
const cursosAula = require('./routes/cursosAula.routes');

//* Complementan funcionalidad de express
app.use(cors()); // comunicar ambos servers de manera simple (front y back)
app.use(morgan('dev')); // Ver por consola las peticiones http
app.use(express.json()); // express server no entiende JSON nativamente, es necesario importar un metodo para que si lo haga.

// TODO > usar rutas aqui
app.use(personas);
app.use(contactos);
app.use(roles);
app.use(tiposDeContacto);
app.use(grados);
app.use(grupos);
app.use(jornadas);
app.use(secciones);
app.use(anios);
app.use(aulas);
app.use(cursos);
app.use(admins);
app.use(docentes);
app.use(alumnos);
app.use(cursosAula);

//* Esta es la funcion Next() usada para manejar errores en los controladores
app.use((err, req, res, next) =>{
    return res.json({
        error: err.message,
        deatils: err
    });
});

// Puerto por default de escucha ideal cuando se trabaja de forma local
app.listen(port)
console.log(`-- Server listening on port ${port} --`);

//* Asigna dinamicamente uno de los puertos disponibles en el server
// const server = app.listen(0, () => {
//     console.log(`Listeing on port: ${server.address().port}`);
// })