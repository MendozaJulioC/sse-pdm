const { Router} = require('express');
const router = Router();

const { getHome,getTotal ,getLineas,getAvanceLineas, getComponentes, getProgramas, getTipoIndicador, getTotalReportDep, getTotalResponsable, postCorteSemaforo,
         getContadorSemaforo, getCountSemDep, tipoSemaforoDep, getSemafav, getSemafavAlerta, getSemafavTotal, getAlertaRojo, getSemaforoPA}= require('../controllers/index.controllers');
router.get('/',getHome);
router.get('/pi/api/total', getTotal)
router.get('/pi/api/total-lineas', getLineas)
        .get('/pi/api/total-avance-lineas', getAvanceLineas)
router.get('/pi/api/total-componentes', getComponentes);
router.get('/pi/api/total-programas', getProgramas);
router.get('/pi/api/total-tipo-indicador', getTipoIndicador);
router.get('/pi/api/total-dep-reporte', getTotalReportDep);
router.get('/pi/api/total-dep-responsable',getTotalResponsable)
router.post('/pi/api/semaforo-corte', postCorteSemaforo)
        .post('/pi/api/semaforo-corte/dependencia/tipo', tipoSemaforoDep)
router.get('/pi/api/semaforo-corte/contador', getContadorSemaforo)
        .get('/pi/api/semaforo-corte/contador/dependencias/:cod_dependencia',getCountSemDep)
        .get('/pi/api/semaforo-corte/general/:semafav',getSemafav)
        .get('/pi/api/semaforo-corte/alertas', getSemafavAlerta)
        .get('/pi/api/semaforo-corte/total', getSemafavTotal)
        .get('/pi/api/semaforo-corte/rojos', getAlertaRojo)
router.get('/pa/semaforo-corte/:mesvigencia',getSemaforoPA)
  

const {getLineTotalComp, getLineTotalProg, getLineIndicadores, getAvanceLinea, getLineIndResumen, getSemafavLinea, getEjecFinLinea} =require('../controllers/taskLine');
router.get('/pi/api/line/componentes', getLineTotalComp);
router.get('/pi/api/line/programas', getLineTotalProg);
router.get('/pi/api/line/:cod_linea', getLineIndicadores)
.get('/pi/api/avance/line/:cod_linea', getAvanceLinea)
.get('/pi/api/line/indicadores/resumen/:cod_linea', getLineIndResumen)
.get('/pi/api/line/semafav/:cod_linea',getSemafavLinea)
.get('/pi/api/line/financiera/:cod_linea', getEjecFinLinea)




const {  getComponente, getCompAvanceLinea, getListComponente, getBuscaNombreComponente, getBuscaCodigoComponente,getPrgNomComponente, getprgCodComponente, getRespComponente,
         getRespCodComponente, getSemafavComponente, getSemafavNomComponente ,getpptoComponente }=  require('../controllers/taskComponentes');
router.get('/pi/api/componentes/:cod_componente', getComponente)
.get('/pi/api/componentes/avance/line/:cod_linea', getCompAvanceLinea)
.get('/pi/api/list-componente',getListComponente)
.get ('/pi/api/componentes/consulta/nombre/:nom_componente',getBuscaNombreComponente)
.get ('/pi/api/componentes/consulta/codigo/:cod_componente',getBuscaCodigoComponente)
.get ('/pi/api/componentes/consulta-programas/nombre/:nom_componente',getPrgNomComponente)
.get ('/pi/api/componentes/consulta-programas/codigo/:cod_componente',getprgCodComponente)
.get('/pi/api/componentes/responsables/nombre/:nom_componente', getRespComponente)
.get('/pi/api/componentes/responsables/codigo/:cod_componente', getRespCodComponente)
.get('/pi/api/componentes/semaforo-corte/alerta/:cod_componente', getSemafavComponente)
.get('/pi/api/componentes/semaforo-corte/alerta/nombre/:nom_componente', getSemafavNomComponente)
.get('/pi/api/componente/ppto/:cod_componente', getpptoComponente)

const{getIndicador, getListIndicador, getBuscaNombreIndicador, getGeneralPI, getGeneralLineasPI, getIndicadorBot, getCorteAvance, getCortesLineas}= require('../controllers/taskIndicador');
router.get('/pi/api/indicador/:cod_indicador', getIndicador);
router.get('/pi/api/list-indicador',getListIndicador)
router.get('/pi/api/indicador/consulta/nombre/:nom_indicador', getBuscaNombreIndicador)
router.get('/pi/api/generalpi', getGeneralPI)
router.get('/pi/api/genralpilineas', getGeneralLineasPI)
router.get('/bot/api/indicador/:cod_indicador', getIndicadorBot)
router.get('/pi/api/avance/corte',getCorteAvance)
.get('/pi/api/corteslineas', getCortesLineas)


const {getPrograma, getPrgAvance, getlistProgramas, getBuscaNombrePrograma, getBuscaCodigoPrograma, getRespPrograma , getRespCodPrograma,
         getPptoPrograma, getSemafavNomPrograma} =  require('../controllers/taskProgramas');

router.get('/pi/api/programas/:cod_programa', getPrograma)
.get('/pi/api/programas/avance/line/:cod_linea',getPrgAvance)
.get('/pi/api/list-programas', getlistProgramas)
.get('/pi/api/programas/consulta/nombre/:nom_programa', getBuscaNombrePrograma)
.get('/pi/api/programas/consulta/codigo/:cod_programa', getBuscaCodigoPrograma)
.get('/pi/api/programas/responsables/nombre/:nom_programa', getRespPrograma)
.get('/pi/api/programas/responsables/codigo/:cod_programa', getRespCodPrograma)
.get('/pi/api/programa/ppto/:cod_programa', getPptoPrograma)
.get('/pi/api/programas/semaforo-corte/alerta/:nom_programa', getSemafavNomPrograma)



const { _getRespIndLinea}= require('../controllers/takResponsables')
router.get('/pi/api/responsables/line/:cod_linea', _getRespIndLinea)

const{  getDependencias, getAvanceDepPDM, getAvancePDMxDEpendencias, getAvancePDMxLineasDep, getAvancePDMxComponentesDep
        ,getAvancePDMxProgramasDep, getValStatDep, getCumplimientoDep, getCumplimientoDMxDEpendencias} = require('../controllers/taskDependencias')
router.get('/see/api/dependencias', getDependencias)
.get('/dep/api/avance/:cod_dependencia',getAvanceDepPDM )
.get('/dep/api/dependencias/avance', getAvancePDMxDEpendencias)
.get('/dep/api/avance/lineas/:cod_dependencia',getAvancePDMxLineasDep )
.get('/dep/api/avance/componentes/:cod_dependencia',getAvancePDMxComponentesDep )
.get('/dep/api/avance/programas/:cod_dependencia',getAvancePDMxProgramasDep )
.get('/dep/api/valstat-dep/:cod_dependencia',getValStatDep )
.get('/dep/api/cumplimiento/:cod_dependencia', getCumplimientoDep)
.get('/dep/api/rank/cumplimiento', getCumplimientoDMxDEpendencias)

const { getAvanceFisico, getAvanceFinanciero, getAvanceFinancieroDep, getAvanceFisicoDep, getPlanAccionDep, getValStat,
        getEjecFisicaDep, getEjecFinancieraDep,getAvanceEjecucionProyect, getBuscaValStat,
        getAlertaFinanciera, getCorteAlertaPA, getvaloraAlerta , getAlertaFisica, getAlertaFisicaFinanciera,
         getAlertaPonderadoPA, getAlertaCuentaDep, getDetalleFinanceroDep, getPAFisInt,
         getPAFisPP, getPAFinanInst, getPAFinanPP, getRankPPFisico, getRankPPFinan, getProjectPP, getBubbleDep}= require('../controllers/taskPlanAccion')

router.get('/pa/api/avancefisico', getAvanceFisico)
.get('/pa/api/avancefinanciero', getAvanceFinanciero)
.get('/pa/api/avancefinanciero/dep/:cod_dependencia', getAvanceFinancieroDep)
.get('/pa/api/avancefisico/dep/:cod_dependencia', getAvanceFisicoDep)
.get('/pa/api/plan/dependencias/:cod_dependencia', getPlanAccionDep)
.get('/pa/api/proyecto/:cod_proyecto', getValStat)
.get('/pa/api/ejecusion-fisica/dependencias', getEjecFisicaDep)
.get('/pa/api/ejecusion-financiera/dependencias', getEjecFinancieraDep)
.get('/pa/api/avances/ejecucion/:cod_proyecto', getAvanceEjecucionProyect)
.get('/pa/api/valor-estadistico/:cod_val_stat', getBuscaValStat)
.get ('/pa/api/alerta/financiera/:alerta',getAlertaFinanciera)
.get('/pa/api/alerta/fisica/:alerta', getAlertaFisica)
.get ('/pa/api/alerta/corte', getCorteAlertaPA )
.get ('/pa/api/alerta/valor/:mes',getvaloraAlerta)
.get('/pa/api/alerta/finanfisica/:alerta', getAlertaFisicaFinanciera)
.get('/pa/api/alerta/ponderado',getAlertaPonderadoPA )
.get('/pa/pi/alerta/cuentadepfisica/:alerta', getAlertaCuentaDep)
.get('/pa/detalle/financiero/:dep', getDetalleFinanceroDep)
.get('/pa/general/fisico/institucional', getPAFisInt)
.get('/pa/general/fisico/pp', getPAFisPP)
.get('/pa/general/financiero/inst', getPAFinanInst)
.get('/pa/general/financiero/pp', getPAFinanPP)
.get('/pa/alertapp/rankfisico',getRankPPFisico)
.get('/pa/alertapp/rankfinanciero',getRankPPFinan)
.get('/pa/alertapp/projects', getProjectPP)
.get('/pa/bubble', getBubbleDep)


const {getTipoInversion, getInverTerritorio, getInversionDep, tipo_inversion_dep, getInverTerritorioDep,getTipoIniciativaDep,
         getInverTerriroerioProject, getDepInversionComuna, getInverMap, getRangoMap, getInversionComCorr}  = require('../controllers/taskInversion')
router.get('/geo/api/tipo-inversion', getTipoInversion)
.get('/geo/api/territorio',getInverTerritorio)
.get('/geo/api/dependencias',getInversionDep)
.get('/geo/api/dependencias/tipo-inversion/:cod_dependencia', tipo_inversion_dep)
.get('/geo/api/dependencias/territorio/:cod_dependencia', getInverTerritorioDep)
.get('/pa/api/tipo-iniciativa/dependencias/:cod_dependencia', getTipoIniciativaDep)
.get('/geo/api/dependencias/proyectos/:cod_proyecto', getInverTerriroerioProject)
.get('/geo/api/comuna/dep-inversion/:comuna',getDepInversionComuna)
.get('/geo/api/inversion/maps', getInverMap)
.get('/geo/api/rangos/maps', getRangoMap)
.get ('/geo/api/inversion/territorio/:cod_comuna', getInversionComCorr)

const {getComuna, getReportSecretarios}  = require('../controllers/taskTerritorio')
router.get('/geo/api/comunas', getComuna)
router.get('/geo/api/logros/:comuna', getReportSecretarios)


const { getValStatBot,getProyectoBot, getTerritorioBot, getDependenciaBot, getUserBot }= require('../controllers/taksBot')
router.get('/bot/api/valorestadistico/:cod_valstat', getValStatBot)
router.get('/bot/api/proyecto/:cod_proyecto', getProyectoBot)
router.get('/bot/api/territorio/:cod_territorio', getTerritorioBot)
router.get('/bot/api/dependencias/:cod_dependencia', getDependenciaBot)
router.get('/bot/api/users/:userame', getUserBot)

const { getGoogleSheet }= require('../controllers/spreadsheet')
router.get('/obrafisica/api/update/', getGoogleSheet)


const { getTotalesOF, getAlertasOF, getEtapasOF, getTemasOF, getIntervencionOF, getTotalOFDep , getTotalDepOF, getIntervencionDepOF, getAlertaDepOF, getEtapaDepOF, getHitosSIFOF,
         getGeoOF, getGeoDepOF, getGeoAlertaOF, getGeoIntervencionOF,getDepOFTerritorio }= require('../controllers/taskObraFisica')

router.get('/obrafisica/api/totales', getTotalesOF)
router.get('/obrafisica/api/alertas', getAlertasOF)
router.get('/obrafisica/api/etapas', getEtapasOF)
router.get('/obrafisica/api/temas', getTemasOF)
router.get('/obrafisica/api/intervencion',getIntervencionOF)
router.get('/obrafisica/api/obrasdep', getTotalOFDep)
router.get('/obrafisica/api/total/dep/:cod_dep',getTotalDepOF)
        .get('/obrafisica/api/intervencion/dep/:cod_dep', getIntervencionDepOF)
        .get('/obrafisica/api/alerta/dep/:cod_dep', getAlertaDepOF)
        .get('/obrafisica/api/etapa/dep/:cod_dep', getEtapaDepOF)
        .get('/obrafisica/api/hitos/sif', getHitosSIFOF)
        .get('/obrafisica/api/geo', getGeoOF)
        .get('/obrafisica/api/geo/territorio/:cod_comuna', getGeoDepOF)
        .get('/obrafisica/api/geo/alerta/:cod_comuna', getGeoAlertaOF)
        .get('/obrafisica/api/geo/intervencion/:cod_comuna', getGeoIntervencionOF)
        .get('/obrafisica/api/geo/dependencia/:cod_dep', getDepOFTerritorio)



const { getPoblacion, getPoblacionPDM }= require('../controllers/taskPoblacion')
        router.get('/poblacion/api/total/', getPoblacion)
        .get('/poblacion/api/pdm',getPoblacionPDM)


const { getProyectos }= require('../controllers/taskProyectos')
        router.get('/proyectos/api/listado', getProyectos)
       
        

module.exports = router;    