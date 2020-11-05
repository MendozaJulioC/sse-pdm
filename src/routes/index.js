const { Router} = require('express');
const router = Router();

const { getHome,getTotal ,getLineas,getAvanceLineas, getComponentes, getProgramas, getTipoIndicador, getTotalReportDep, getTotalResponsable}= require('../controllers/index.controllers');
router.get('/',getHome);
router.get('/pi/api/total', getTotal)
router.get('/pi/api/total-lineas', getLineas)
        .get('/pi/api/total-avance-lineas', getAvanceLineas)
router.get('/pi/api/total-componentes', getComponentes);
router.get('/pi/api/total-programas', getProgramas);
router.get('/pi/api/total-tipo-indicador', getTipoIndicador);
router.get('/pi/api/total-dep-reporte', getTotalReportDep);
router.get('/pi/api/total-dep-responsable',getTotalResponsable)


const {getLineTotalComp, getLineTotalProg, getLineIndicadores,  getAvanceLinea, getLineIndResumen} =require('../controllers/taskLine');
router.get('/pi/api/line/componentes', getLineTotalComp);
router.get('/pi/api/line/programas', getLineTotalProg);
router.get('/pi/api/line/:cod_linea', getLineIndicadores)
.get('/pi/api/avance/line/:cod_linea', getAvanceLinea)
.get('/pi/api/line/indicadores/resumen/:cod_linea', getLineIndResumen)


const {  getComponente, getCompAvanceLinea, getListComponente, getBuscaNombreComponente, getBuscaCodigoComponente,getPrgNomComponente,
         getprgCodComponente, getRespComponente, getRespCodComponente
      }=  require('../controllers/taskComponentes');

router.get('/pi/api/componentes/:cod_componente', getComponente)
.get('/pi/api/componentes/avance/line/:cod_linea', getCompAvanceLinea)
.get('/pi/api/list-componente',getListComponente)
.get ('/pi/api/componentes/consulta/nombre/:nom_componente',getBuscaNombreComponente)
.get ('/pi/api/componentes/consulta/codigo/:cod_componente',getBuscaCodigoComponente)
.get ('/pi/api/componentes/consulta-programas/nombre/:nom_componente',getPrgNomComponente)
.get ('/pi/api/componentes/consulta-programas/codigo/:cod_componente',getprgCodComponente)
.get('/pi/api/componentes/responsables/nombre/:nom_componente', getRespComponente)
.get('/pi/api/componentes/responsables/codigo/:cod_componente', getRespCodComponente)

const{getIndicador, getListIndicador, getBuscaNombreIndicador}= require('../controllers/taskIndicador');
router.get('/pi/api/indicador/:cod_indicador', getIndicador);
router.get('/pi/api/list-indicador',getListIndicador)
router.get('/pi/api/indicador/consulta/nombre/:nom_indicador', getBuscaNombreIndicador)


const {getPrograma, getPrgAvance, getlistProgramas, getBuscaNombrePrograma, getBuscaCodigoPrograma, getRespPrograma , getRespCodPrograma} =  require('../controllers/taskProgramas');
router.get('/pi/api/programas/:cod_programa', getPrograma)
.get('/pi/api/programas/avance/line/:cod_linea',getPrgAvance)
.get('/pi/api/list-programas', getlistProgramas)
.get('/pi/api/programas/consulta/nombre/:nom_programa', getBuscaNombrePrograma)
.get('/pi/api/programas/consulta/codigo/:cod_programa', getBuscaCodigoPrograma)
.get('/pi/api/programas/responsables/nombre/:nom_programa', getRespPrograma)
.get('/pi/api/programas/responsables/codigo/:cod_programa', getRespCodPrograma)





const {_postFichaCreate}= require('../controllers/taskFichasM')
router.post('/pi/api/ficha', _postFichaCreate)

const { _getRespIndLinea}= require('../controllers/takResponsables')
router.get('/pi/api/responsables/line/:cod_linea', _getRespIndLinea)



module.exports = router;    