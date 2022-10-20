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

//* Complementan funcionalidad de express
app.use(cors()); // comunicar ambos servers de manera simple (front y back)
app.use(morgan('dev')); // Ver por consola las peticiones http
app.use(express.json()); // express server no entiende JSON nativamente, es necesario importar un metodo para que si lo haga.

// TODO > usar rutas aqui
app.use(personas);
app.use(contactos);
app.use(roles);
app.use(tiposDeContacto);

//* Esta es la funcion Next() usada para manejar errores en los controladores
app.use((err, req, res, next) =>{
    return res.json({
        error: err.message,
        deatils: err
    });
});


//* Puerto de escucha
app.listen(port)
console.log(`-- Server listening on port ${port} --`);