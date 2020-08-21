const { Router} = require('express');
const router = Router();

const   {   getHome, getTotales, getCuatrienio, getCuatriCompare,
            getCuatriComuna , getCuatrienioDetalleComuna, 
            getDetalleAlonso, getDetalleAnibal, getDetalleFico,
            getDetalleAlonsoTotal, getDetalleAnibalTotal,
            getDetalleFicoTotal, postAlonsoDepComuna, postAnibalDepComuna,
            postFicoDepComuna, getFortalecimientoFico
        }= require('../controllers/index.controllers');

const {getVigencias, getSearchVigencias, getVig , getVigenciaDeps, getVigenciaFortInst, getVigenciaComuna, getVigenciaPlay} = require('../controllers/taskVigencias');
const {getComuna , postComunaVigencia, postComunaDep, postComunaProyectos }= require('../controllers/taskComunas');
const {getDependencias,getQueryDep, postDepVigencia, postDepTipoInversion, postDepProyectVigencia} = require('../controllers/taskDependencias')
const {getProyectos, getBuscaProyect, getDetalleProyect} = require('../controllers/taskProyect')

/** cuatrienios */
router.get('/api/totales', getTotales);//totales por año, descripción de los tipos de inversión (2004-2019)
router.get('/api/cuatrienios',getCuatrienio );// total alonso, aníbal, federico
router.get('/api/cuatrienios/busqueda',getCuatriCompare );//consultar los totales de 2 vigencias (vigencia1, vigencia2)
router.get('/api/cuatrienios/comuna', getCuatriComuna);
router.get('/api/cuatrienios/detalle/:cod_comuna', getCuatrienioDetalleComuna);
router.get('/api/cuatrienios/alonso', getDetalleAlonso);
router.get('/api/cuatrienios/alonso/total', getDetalleAlonsoTotal);
router.post('/api/cuatrienios/alonso/dependencias', postAlonsoDepComuna);
router.get('/api/cuatrienios/anibal', getDetalleAnibal);
router.get('/api/cuatrienios/anibal/total',getDetalleAnibalTotal);
router.post('/api/cuatrienios/anibal/dependencias', postAnibalDepComuna);
router.get('/api/cuatrienios/fico', getDetalleFico);
router.get('/api/cuatrienios/fico/total', getDetalleFicoTotal);
router.post('/api/cuatrienios/fico/dependencias', postFicoDepComuna);
router.get('/api/cuatrienios/fico/fortalecimiento', getFortalecimientoFico);



/**Vigencias */
router.get('/api/vigencias', getVigencias);//totales por año (2004-2019)
router.get('/api/vigencias/buscar/', getVig);//consulta dos vigencias y devuelve la deascripción de los tipos de inversión de cada año
router.get('/api/vigencias/:ano', getSearchVigencias);// devuelve la descripción de la inversión por el año consultado
router.get('/api/vigencias/dependencias/:ano', getVigenciaDeps);
router.get('/api/vigencias/fortalecimiento/:ano', getVigenciaFortInst)// devuelve el valor de fortalecimiento institucional de la vigencia consultada
router.get('/api/vigencias/total-comuna/:ano', getVigenciaComuna)//Devuelve el total de cada tipo de inversión en la vigencia consultada
router.get('/api/vigencias-tiempo', getVigenciaPlay);


/**Comunas */
router.get('/api/comuna', getComuna);// devuelve los valores invertidos en la comuna consultada desde el año 2008 al 2019
router.post('/api/comuna/vigencia', postComunaVigencia); //recibe la comuna y un año especifico
router.post('/api/comuna/dependencias',postComunaDep)// recibe la comuna y devuelve detalle por dependencias de lo invertido
router.post('/api/comuna/proyectos', postComunaProyectos)


/**Dependencias */
router.get('/api/dependencias', getDependencias);
router.get('/api/dependencias/:cod_dep', getQueryDep);
router.post('/api/dependencias/vigencia',postDepVigencia)
router.post('/api/dependencias/inversion', postDepTipoInversion )
router.post('/api/dependencias/proyectos', postDepProyectVigencia)

/** proyectos */

router.get('/api/proyectos', getProyectos)
router.get('/api/proyectos/:nomproy', getBuscaProyect)
router.get('/api/proyectos/detalle/:nomproy', getDetalleProyect)

router.get('/',getHome)

module.exports = router;