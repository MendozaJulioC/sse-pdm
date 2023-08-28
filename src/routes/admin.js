const { Router} = require('express');
const routerAdmin = Router();
const { isAuthorized } = require('../helpers/auth')


const {
  getFichaCarga,// ficha metodologica plan indicativo
  getFichaMain,// indicadores plan indicativo
  getUpdateLogros,//actualizacion logros pldm
  getUpdateAvanceLineas,//actualizacion logros por lineas del pdm
  getConsolidadoGeo,//carga inversion pub,lica por comunas cosolidado
  getTotalesGeo,//carga totales inversion por comuna por tipo de inversion
  getUpdateTotalesGeo,//actualiza los valores totales por comuna por tipo de inversion
  getPlanAccion, // carga el plan de accion
  getEjecFisicaPA,//carga ejecución física plan de acción
  getEjecFinancieraPA, //carga la ejecucion financiera del plan de acción
  getEjecFinanciera_PI_PA, //Actuliza la tabla de ejecución financiera correspondiente a los proyectos pdm desde el pa
  getAdminUsers,
  deleteUsers,
  putUser,
  getProyectosEspeciales,
  getIndicadoresEspeciales
} = require("../controllers/taskAdmin");

routerAdmin.get('/pi/api/fichametodologica',getFichaCarga)
    .get('/pi/api/fichamain', getFichaMain)
    .get('/pi/api/updatelogros', getUpdateLogros)
    .get('/pi/api/updateavancelineas', getUpdateAvanceLineas)
    .get('/geo/api/consolidado', getConsolidadoGeo)
    .get('/geo/api/totalesgeo', getTotalesGeo)
    .get('/geo/api/updatetotalesgeo', getUpdateTotalesGeo)
    .get('/pa/api/cargaplanaccion',getPlanAccion )
    .get('/pa/api/cargaejecucionfisica', getEjecFisicaPA)
    .get('/pa/api/cargaejecucionfinanciera', getEjecFinancieraPA)
    .get('/pi/api/ejecfinancierapipa', getEjecFinanciera_PI_PA)
    .get (`/auth/api/admin/gestion/:admin`, getAdminUsers)
    .get('/proyectos/admin/especial/seguimiento', getProyectosEspeciales)
    .get('/proyectos/admin/especial/indicadores',  getIndicadoresEspeciales)

    routerAdmin.delete('/api/auth/:admin/:user',  deleteUsers )
    routerAdmin.post('/api/auth/:admin/edit/:user',   putUser )

    
module.exports = routerAdmin;    