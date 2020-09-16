const { Router} = require('express');
const router = Router();




const {getHome, getLineas, getComponentes, getProgramas, getTipoIndicador, getTotalReportDep, getTotalResponsable}= require('../controllers/index.controllers');
router.get('/',getHome);
router.get('/pi/api/total-lineas', getLineas);
router.get('/pi/api/total-componentes', getComponentes);
router.get('/pi/api/total-programas', getProgramas);
router.get('/pi/api/total-tipo-indicador', getTipoIndicador);
router.get('/pi/api/total-dep-reporte', getTotalReportDep);
router.get('/pi/api/total-dep-responsable',getTotalResponsable)


const {getLineTotalComp, getLineTotalProg, getLineIndicadores} =require('../controllers/taskLine');
router.get('/pi/api/line/componentes', getLineTotalComp);
router.get('/pi/api/line/programas', getLineTotalProg);
router.get('/pi/api/line/indicadores', getLineIndicadores);



const{getIndicador}= require('../controllers/taskIndicador');
router.get('/pi/api/indicador/:cod_indicador', getIndicador);

const {_postFichaCreate}= require('../controllers/taskFichasM')
router.post('/pi/api/ficha', _postFichaCreate)

module.exports = router;    