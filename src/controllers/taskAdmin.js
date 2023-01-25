// aquí colocaré todas las rutas, tareas, consultas que tengan que ver con las fichas metodológicas delplan de desarrollo municipal
const XLSX = require('xlsx');
const { local_pool } = require('../sql/dbConfig');

const getFichaCarga = async(req, res)=>{
  try {
    // const excel = XLSX.readFile('/Users/juliocesarmendoza/Desktop/pipApp/Backend-pi/src/public/uploads/BVCC.xlsx');
   const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/PI-FichasMetodologicas.xlsx');
   var nombreHoja = excel.SheetNames;
   var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
   console.log('He vuelto!!!');
   //console.log('datos: ',datos)
   /*
    for (let i=0; i<datos.length; i++){ 
     await local_pool.query(`  
      INSERT INTO indicativo.tbl_ficha_indicador(
        cod_indicador,
        nom_indicador,
        definicion,
        objetivo,
        normativa,
        formula_indicador,
        variable_operativa,
        comportamiento_deseado,
        periocidad_generacion,
        fuente,
        tipo_fuente,
        medio_verificacion ,
        vigencia_lb ,
        tipo_lb,
        responsable_dato ,
        responsable_reporte ,
        formato_datos_fuente ,
        instrumentos_recoleccion,
        observaciones 
      )
      VALUES ('${datos[i].CodigoIndicador}',
            '${datos[i].NombreIndicador}',
            '${datos[i].Definicion}',
            '${datos[i].Objetivo}',
            '${datos[i].Normativa}',
            '${datos[i].FormulaIndicador}',
            '${datos[i].VariablesOperativas}',
            '${datos[i].Comportamientodeseado}',
            '${datos[i].Periodicidad}', 
            '${datos[i].Fuente}',
            '${datos[i].TipoFuente}',
            '${datos[i].MedioVerificacion}',
            '${datos[i].VigenciaLB}',
            '${datos[i].TipoLB}',
            '${datos[i].ResponsableDato}',
            '${datos[i].ResponsableReporte}',
            '${datos[i].FormatoDatosFuente}',
            '${datos[i].InstrumentoRecoleccion}', 
            '${datos[i].Observaciones}');`)
        console.log(datos[i].CodigoIndicador, " ok")   
  }
  */
  } catch (error) {
    console.error('Error getFichaCarga: ', error);
  } 
}

//ruta para cargar datos iniciales de los indicadores para tabla tbl_indicador
const getFichaMain = async(req, res)=>{
  const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/tabla_Segto_PI.xlsx');
  var nombreHoja = excel.SheetNames;
  var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
  console.log('Iniciando carga PI!!!');
  //console.log(datos);
  /*
  variables de la tabla...
  cod_linea character varying(50) COLLATE pg_catalog."default" NOT NULL,
  nom_linea character varying(255) COLLATE pg_catalog."default" NOT NULL,
  cod_componente character varying(255) COLLATE pg_catalog."default" NOT NULL,
  nom_componente character varying(500) COLLATE pg_catalog."default" NOT NULL,
  cod_programa character varying(255) COLLATE pg_catalog."default" NOT NULL,
  nom_programa character varying(500) COLLATE pg_catalog."default" NOT NULL,
  tipo_ind character varying(50) COLLATE pg_catalog."default" NOT NULL,
  cod_indicador character varying(255) COLLATE pg_catalog."default" NOT NULL,
  nom_indicador character varying(500) COLLATE pg_catalog."default" NOT NULL,
  unidad character varying(255) COLLATE pg_catalog."default" NOT NULL,
  lb_ind character varying(255) COLLATE pg_catalog."default" NOT NULL,
  meta_plan numeric NOT NULL,
  responsable_plan character varying(500) COLLATE pg_catalog."default" NOT NULL,
  cod_responsable_reporte integer NOT NULL,
  fc character varying(255) COLLATE pg_catalog."default" NOT NULL,
  sentido character varying(255) COLLATE pg_catalog."default" NOT NULL,
  incluye_lb character varying(255) COLLATE pg_catalog."default" NOT NULL,
  meta_2020 numeric NOT NULL,
  logro_2020 numeric NOT NULL,
  cumple_2020 numeric NOT NULL,
  meta_2021 numeric NOT NULL,
  logro_2021 numeric NOT NULL,
  cumple_2021 numeric NOT NULL,
  meta_2022 numeric NOT NULL,
  logro_2022 numeric NOT NULL,
  cumple_2022 numeric NOT NULL,
  meta_2023 numeric NOT NULL,
  logro_2023 numeric NOT NULL,
  cumple_2023 numeric NOT NULL,
  meta_ruralidad numeric NOT NULL,
  logro_acumulado numeric NOT NULL,
  avance_cuatrienio numeric NOT NULL,
  peso numeric NOT NULL,
  pesoxavnt numeric NOT NULL,
  avance2020 numeric,
  avance2021 numeric,
  avance2022 numeric,
  avance2023 numeric,
  semafav integer,
  avnorm numeric,
  avnormtemp numeric,
  observaciones_indicador character varying(500000) COLLATE pg_catalog."default",
  avancepond numeric,
  prog2020 numeric,
  prog2021 numeric,
  prog2022 numeric,
  prog2023 numeric,
  corte date,
*/

/*
  for (let i=0; i<datos.length; i++){
    //console.log(datos[i].CodigoIndicador)
    //console.log(datos[i].Observacion20)
    //actualiza corte de la tabla indicador principal
    
    await local_pool.query(` 
    INSERT INTO indicativo.tbl_indicador(
      cod_linea, nom_linea, cod_componente, nom_componente, cod_programa, nom_programa, tipo_ind, cod_indicador, nom_indicador, unidad, lb_ind, meta_plan, responsable_plan, cod_responsable_reporte, fc, sentido, incluye_lb, meta_2020, logro_2020, cumple_2020, meta_2021, logro_2021, cumple_2021, meta_2022, logro_2022, cumple_2022, meta_2023, logro_2023, cumple_2023, meta_ruralidad, logro_acumulado, avance_cuatrienio, peso, pesoxavnt, avance2020, avance2021, avance2022, avance2023, semafav, avnorm, avnormtemp, observaciones_indicador, avancepond, prog2020, prog2021, prog2022, prog2023, corte)
      VALUES (
          '${datos[i].CodLinea}',
          '${datos[i].NombreLinea}',
          '${datos[i].CodComponenteCompuesto}',
          '${datos[i].NombreComponente}',
          '${datos[i].CodProgramaCompuesto}',
          '${datos[i].NombrePrograma}',
          '${datos[i].Tipo}',
          '${datos[i].CodigoIndicador}', 
          '${datos[i].NombreIndicador}', 
          '${datos[i].Unidad}', 
          '${datos[i].LB}', 
          ${datos[i].MetaPlan}, 
          '${datos[i].Responsable}', 
          ${datos[i].cod_responsable_reporte}, 
          '${datos[i].ResponsableReporte}', 
          '${datos[i].FC}', 
          '${datos[i].Sentido}', 
          ${datos[i].Meta2020}, 
          ${datos[i].Log20}, 
          ${datos[i].Cumplimiento20}, 
          ${datos[i].Meta2021}, 
          ${datos[i].Log21}, 
          ${datos[i].Cumplimiento21}, 
          ${datos[i].Meta2022}, 
          ${datos[i].Log22}, 
          ${datos[i].Cumplimiento22}, 
          ${datos[i].Meta2023}, 
          ${datos[i].Log23}, 
          ${datos[i].Cumplimiento23}, 
          ${datos[i].MetaRuralidad}, 
          ${datos[i].avance_cuatrienio}, 
          ${datos[i].avance_cuatrienio}, 
          ${datos[i].Peso}, 
          ${datos[i].PesoXAvnt}, 
          ${datos[i].Avance20}, 
          ${datos[i].Avance21}, 
          ${datos[i].Avance22}, 
          ${datos[i].Avance23}, 
          ${datos[i].semafAv},
          ${datos[i].aVNorm},
          ${datos[i].AvNormTmp},
          '${datos[i].Observacion}',
          ${datos[i].AvancePond},
          ${datos[i].Prog2020},
          ${datos[i].Prog2021},
          ${datos[i].Prog2022},
          ${datos[i].Prog2023},
          '${datos[i].Corte}'
               
      );`)
        console.log(i, "-", datos[i].CodigoIndicador, " -Ok")  
  }
  */
}

//ruta para actualizar los cortes del avance delplan indicativo
const getUpdateLogros = async (req, res)=>{
  try {
    const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/tabla_Segto_PI.xlsx');
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    // console.log(datos)
     for (let i=0; i<datos.length; i++){
      
        //actualiza corte de la tabla indicador principal
        await pool.query(` 
            UPDATE indicativo.tbl_indicador
            SET 
              cod_responsable_reporte = ${datos[i].cod_responsable_reporte},
              meta_2020=${datos[i].Meta2020},
              meta_2021=${datos[i].Meta2021},
              meta_2022=${datos[i].Meta2022},
              meta_2023=${datos[i].Meta2023},
              logro_2020=	${datos[i].Log20},
              logro_2021=	${datos[i].Log21},
              logro_2022=	${datos[i].Log22},
              logro_2023=	${datos[i].Log23},
              cumple_2020=	${datos[i].Cumplimiento20},
              cumple_2021=	${datos[i].Cumplimiento21},
              cumple_2022=	${datos[i].Cumplimiento22},
              cumple_2023=	${datos[i].Cumplimiento23},
              avance_cuatrienio = ${datos[i].avance_cuatrienio},
              pesoxavnt=	${datos[i].PesoXAvnt},
              avance2020=	${datos[i].Avance20},
              avance2021=	${datos[i].Avance21},
              avance2022=	${datos[i].Avance22},
              avance2023=	${datos[i].Avance23},
              semafav=	${datos[i].semafAv},
              avnorm=		${datos[i].aVNorm},
              avnormtemp=	${datos[i].AvNormTmp},
              observaciones_indicador = '${datos[i].Observacion}' ,
              avancepond= ${datos[i].AvancePond},
              prog2020= ${datos[i].Prog2020},
              prog2021= ${datos[i].Prog2021},
              prog2022= ${datos[i].Prog2022},
              prog2023= ${datos[i].Prog2023},
              corte='${datos[i].Corte}'
            WHERE cod_indicador= '${datos[i].CodigoIndicador}';
        `)
        console.log(i, "-", datos[i].CodigoIndicador, " -Ok")  
      }
   } catch (error) {
     console.log('Error uodate logros: ', error)
  }
}


//ruta para actualizar los avances y cumplimientos por cada corte de las lineas del pdm
const getUpdateAvanceLineas = async(req, res)=>{
  try {
    const excel = XLSX.readFile(
      "/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/tabla_Segto_PI.xlsx"
    );
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[1]]);
    //console.log(datos)
    for (let i = 0; i < datos.length; i++) {
      //para el siguiente corte crear una funcion que solo inserte por el corte necesario
      //ojojojojojojoj

      if (datos[i].corte == "2022-10-31") {
        await local_pool.query(` 
          INSERT INTO indicativo.tbl_comportamiento_lineas(
            cod_linea, nom_linea, avance, cumplimiento, corte, tipo)
          VALUES 
            ${datos[i].cod_linea},
            '${datos[i].linea}',
            ${datos[i].avance}, 
            ${datos[i].cumplimiento},
            '${datos[i].corte}',
            '${datos[i].tipo}');
        `);
        console.log(datos[i].linea, " ok");
      }
    }
  } catch (error) {
    console.error("Error updatelineas", error);
  }
}

//ruta para cargar el consolidado de la geoinversión pública
const getConsolidadoGeo = async (req, res)=>{
  try {
   const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/Estructuracion.xlsx');
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    //console.log(datos)
    //await local_pool.query(` delete from inverpublica.tbl_consolidado`);
    for (let i=0; i<datos.length; i++){
      /*
      await local_pool.query(`  
            INSERT INTO inverpublica.tbl_consolidado(
               cod_dependencia, espp, cod_proyecto, nom_proyecto, inversion_real, vigencia, corte, total_geo, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c50, c60, c70, c80, c90, c99, c97)
            VALUES ('${datos[i].CodDep}','${datos[i].EsPP}','${datos[i].CodProyecto}','${datos[i].NombreProyecto}', ${datos[i].inversion_real},${datos[i].vigencia},'${datos[i].corte}',${datos[i].Total_Georreferenciado},
                    ${datos[i].c1},${datos[i].c2}, ${datos[i].c3},${datos[i].c4}, ${datos[i].c5},${datos[i].c6}, ${datos[i].c7},${datos[i].c8}, ${datos[i].c9},${datos[i].c10}, ${datos[i].c11}, ${datos[i].c12}, ${datos[i].c13},
                    ${datos[i].c14}, ${datos[i].c15}, ${datos[i].c16}, ${datos[i].c50}, ${datos[i].c60},  ${datos[i].c70},  ${datos[i].c80},  ${datos[i].c90}, ${datos[i].c99}, ${datos[i].c97});
                 `);
            console.log(datos[i].CodProyecto, " ok")   
      */
    }
  } catch (error) {
     console.log(error)
  }
}

//ruta para cargar los totales por comuna de cada tipo de inversión pública
const getTotalesGeo = async (req, res)=>{
  try {
    const excel = XLSX.readFile(
      "/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/Estructuracion.xlsx"
    );
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[4]]);
    //console.log(datos)
    console.log("ok");
    for (let i = 0; i < datos.length; i++) {
      await local_pool.query(`INSERT INTO inverpublica.tbl_tipoinver_geo(cod_comuna, localizada, ciudad, pp, total)
      VALUES ( 
              ${datos[i].Cod_Comuna},
              ${datos[i].Localizada},
              ${datos[i].Ciudad},
              ${datos[i].PP},
              ${datos[i].Total}
            );`);
      console.log(datos[i].Cod_Comuna, " ok");
    }
  } catch (error) {
    console.log('Error getTotalesGeo: ',error)
  }
}

//ruta para actualizar los totales por tipo de invarsion en cada comuna
const getUpdateTotalesGeo = async(req, res)=>{
  try {
    const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/Estructuracion.xlsx');
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[4]]);
    // console.log(datos)
    for (let i=0; i<datos.length; i++){
      await local_pool.query(` 
        UPDATE inverpublica.tbl_tipoinver_geo
        SET  
          localizada=${datos[i].Localizada},
          ciudad=${datos[i].Ciudad},
          pp=${datos[i].pp},
          total=${datos[i].total}
         WHERE cod_comuna=${datos[i].CodigoComuna};
        `);
      console.log(datos[i].NombreComuna, " ok")   
    }
  } catch (error) {
    console.error('Update UpdateTotalesGeo: ', error);
  }
}


const getPlanAccion = async (req, res) => {
  try {
    const excel = XLSX.readFile(
      "/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/plan_accion_pdm.xlsx"
    );
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
     console.log(datos)
    await local_pool.query(` delete from plan_accion.tbl_accion`);

    for (let i = 0; i < datos.length; i++) {
      await local_pool.query(` INSERT INTO plan_accion.tbl_accion(
                          cod_dependencia,
                          cod_linea,
                          nom_linea,
                          cod_componente,
                          nom_componente,
                          cod_programa,
                          nom_programa,
                          cod_proyecto,
                          nom_proyecto,
                          eficacia_proyecto,
                          ejec_fin_porc,
                          eficiencia,
                          ppto_ajustado,
                          ejec_real,
                          ppto_inicial, 
                          cod_val_stat,
                          nom_val_stat,
                          u_medida,
                          
                          q_plan,
                          q_real,
                          eficacia_ve,
                          obs_val_stat, 
                          y_dev_poai,
                          y_dev_pptoajustado,
                          y_dev_ejecucion,
                          
                          compromisos,
                          facturas,
                          pagos,
                          "corte_ejecucion",
                          obs_proyecto,
                          num_ve,
                          pago_factura, compromiso2,
                          factura2, pago2, nombre_dep_reporte, 
                           y_dev_es_pp, espagopendiente,escola, esmcv, cod_siufp_catal, obs_cod_suifp)
        VALUES (
          ${datos[i].cod_dependencia},
          '${datos[i].cod_linea}',
          '${datos[i].nom_linea}',
          '${datos[i].cod_componente}',
          '${datos[i].nom_componente}',
          '${datos[i].cod_programa}',
          '${datos[i].nom_programa}',
          '${datos[i].cod_proyecto}',
          '${datos[i].nom_proyecto}',
          
          ${datos[i].eficacia_proyecto},
          ${datos[i].ejec_fin_porc},
          ${datos[i].eficiencia},
          ${datos[i].pto_ajustado},
          ${datos[i].ejec_real},
          ${datos[i].pto_inicial},
          '${datos[i].cod_val_stat}',
          '${datos[i].nom_val_stat}',
          '${datos[i].u_medida}',

          ${datos[i].q_plan},
          ${datos[i].q_real},
          ${datos[i].eficacia_ve},
          '${datos[i].obs_val_stat}',
          ${datos[i].y_dev_poai},
          ${datos[i].y_dev_pptoajustado},
          ${datos[i].y_dev_ejecucion},

          ${datos[i].compromisos},
          ${datos[i].facturas},
          ${datos[i].pagos},
          '${datos[i].corte_ejecucion}',
          '${datos[i].obs_proyecto}',

          ${datos[i].num_ve},
          ${datos[i].pago_factura},
          ${datos[i].compromiso2},
          ${datos[i].factura2},
          ${datos[i].pago2},
          '${datos[i].nombre_dep_reporte}',
          ${datos[i].y_dev_es_pp},
          ${datos[i].espagopendiente},
          ${datos[i].escola},
          ${datos[i].esmcv},
          '${datos[i].cod_suifp_catal}',
          '${datos[i].obs_cod_suifpc}'
        );
        
        `);
      console.log(i, "-", datos[i].cod_val_stat, " -Ok");
    }
    
  } catch (error) {
    console.log(error);
  }
};



const getEjecFisicaPA = async (req, res)=>{
  try {
    const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/Visualizaciones_PAV.xlsx');
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[1]]);
 //   console.log(datos)
// await locaL_pool.query('delete from plan_accion.tbl_exec_fisica')

      for (let i=0; i<datos.length; i++){
        
        await local_pool.query(` INSERT INTO plan_accion.tbl_exec_fisica(
          cod_dependencia, nom_dependencia, cod_proyecto, nom_proyecto, porc_eficacia_proyecto, 
          ejec_fisica, ejec_financiera, poai, ppto_ajustado, ejecucion, compromisos, pagos, facturas, num_valstat, tipo_proyecto, espago_pendiente, saldo_no_exec, "corte")
	        VALUES (
        
          ${datos[i].Codigo_Dependencia},
          '${datos[i].Nombre_Dependencia}',   
          '${datos[i].cod_proyecto}',
          '${datos[i].nom_proyecto}',
          ${datos[i].porc_eficacia_proyecto},
          ${datos[i].ejecucion_fisica},
          ${datos[i].ejecucion_financiera},
          ${datos[i].POAI},
          ${datos[i].ppto_ajustado},
          
          ${datos[i].ejecucion},
          ${datos[i].Compromisos},
          ${datos[i].Pagos},
          ${datos[i].Facturas},
          ${datos[i].num_valstat},
          '${datos[i].tipo_proyecto}',
          '${datos[i].espagopendiente}',
          '${datos[i].saldo_no_ejec}',
          '${datos[i].corte}'
      );
        `);
        
         console.log(i,"-", datos[i].cod_proyecto, " -Ok")        
      }


   } catch (error) {
     console.log(error)
  }
  
}

const getEjecFinancieraPA= async(req, res)=>{
  try {
    const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/Visualizaciones_PAV.xlsx');
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[2]]);
   //console.log(datos)
  await local_pool.query(' delete from plan_accion.tbl_exec_financiera')

   for (let i=0; i<datos.length; i++){
        await local_pool.query(` INSERT INTO plan_accion.tbl_exec_financiera(
	      cod_dependencia, nom_dependencia, cod_proyecto, nom_proyecto, porc_eficacia_proyecto, ejec_financiera, 
	      porc_ejec_financiera,  poai, ppto_ajustado, ejecucion, compromisos, pagos, facturas, num_valstat, tipo_proyecto, espago_pendiente, saldo_no_exec, tipo_iniciativa,"corte")
	        VALUES (
        
          ${datos[i].cod_dependencia},
          '${datos[i].nom_dependencia}',
          '${datos[i].cod_proyecto}',
          '${datos[i].nom_proyecto}',
          ${datos[i].porc_eficacia_proyecto},
          ${datos[i].ejecucion_financiera},
          ${datos[i].porc_ejecucion_financiera},
         
          ${datos[i].POAI},
          
          ${datos[i].ppto_ajustado},
          ${datos[i].ejecucion},
          ${datos[i].Compromisos},
          ${datos[i].Pagos},
          ${datos[i].Facturas},
          ${datos[i].num_valstat},
          '${datos[i].tipo_proyecto}',
          '${datos[i].espagopendiente}',
          '${datos[i].saldo_no_ejec}',
          ${datos[i].tipo_iniciativa},
          '${datos[i].corte}'
      );
        `);
        console.log(i,"-", datos[i].cod_proyecto, " -Ok")         
      }


   } catch (error) {
     console.log('Error getEjecFinancieraPA: ',error)
  }
}




const getEjecFinanciera_PI_PA = async(req, res)=>{
  try {
    const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/Visualizaciones_PAV.xlsx');
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    //console.log(datos)
 await local_pool.query(` delete from  indicativo.tbl_ejec_finan_plan`)

   for (let i=0; i<datos.length; i++){
    await local_pool.query(` 
    INSERT INTO indicativo.tbl_ejec_finan_plan(cod_linea, cod_componente, cod_programa, cod_dependencia, cod_proyecto, ppto_ajustado, ejecutado, corte)
	  VALUES (
      '${datos[i].Cod_Linea}',
      '${datos[i].Cod_Componente}',
      '${datos[i].Cod_Programa}',
       ${datos[i].cod_dependencia},
      '${datos[i].cod_proyecto}',
      ${datos[i].ppto_ajustado},
      ${datos[i].ejecucion},
      '${datos[i].corte}'
    );
  `);
  console.log(i,"-", datos[i].cod_proyecto, " -Ok")          
  }




  } catch (error) {
    console.error('Error getEjecFinanciera_PI_PA ', error)
  }
}

module.exports = {
  getFichaCarga,
  getFichaMain,
  getUpdateLogros,
  getUpdateAvanceLineas,
  getConsolidadoGeo,
  getTotalesGeo,
  getUpdateTotalesGeo,
  getPlanAccion,
  getEjecFisicaPA,
  getEjecFinancieraPA,
  getEjecFinanciera_PI_PA
};


