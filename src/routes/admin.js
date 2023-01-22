const { Router} = require('express');
const routerAdmin = Router();


// ficha metodologica plan indicativo
// indicadores plan indicativo
// administración de las dependencias
// adnministracion del territorio
// administracion proyectos


const {getFichaCarga} =   require('../controllers/taskFichasM');



//cargar ficha metodologica
routerAdmin.get('/pi/api/fichametodologica',getFichaCarga)


module.exports = routerAdmin;    