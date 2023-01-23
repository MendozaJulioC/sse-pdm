const { Router} = require('express');
const routerAdmin = Router();


// ficha metodologica plan indicativo
// indicadores plan indicativo
// administración de las dependencias
// adnministracion del territorio
// administracion proyectos


const {getFichaCarga, getFichaMain, getConsolidadoGeo} =   require('../controllers/taskFichasM');



//cargar fichas metodologica y principal
routerAdmin.get('/pi/api/fichametodologica',getFichaCarga)
    .get('/pi/api/fichamain', getFichaMain)
    .get('/geo/api/consolidado', getConsolidadoGeo)


module.exports = routerAdmin;    