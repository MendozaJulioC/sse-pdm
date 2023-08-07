// aquí colocaré todas las rutas, tareas, consultas que tengan que ver con las fichas metodológicas delplan de desarrollo municipal
const XLSX = require('xlsx');
const { local_pool, aws_pool} = require('../sql/dbConfig');


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
     await aws_pool.query(`  
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
  console.log(datos);
  /*
  
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


  // for (let i=0; i<datos.length; i++){

 
    
  //   await aws_pool.query(` 
  //   INSERT INTO indicativo.tbl_indicador(
  //     cod_linea, nom_linea, cod_componente, nom_componente, cod_programa, nom_programa, tipo_ind, cod_indicador, nom_indicador, unidad, lb_ind, meta_plan, responsable_plan, cod_responsable_reporte, fc, sentido, incluye_lb, meta_2020, logro_2020, cumple_2020, meta_2021, logro_2021, cumple_2021, meta_2022, logro_2022, cumple_2022, meta_2023, logro_2023, cumple_2023, meta_ruralidad, logro_acumulado, avance_cuatrienio, peso, pesoxavnt, avance2020, avance2021, avance2022, avance2023, semafav, avnorm, avnormtemp, observaciones_indicador, avancepond, prog2020, prog2021, prog2022, prog2023, corte)
  //     VALUES (
  //         '${datos[i].CodLinea}',
  //         '${datos[i].NombreLinea}',
  //         '${datos[i].CodComponenteCompuesto}',
  //         '${datos[i].NombreComponente}',
  //         '${datos[i].CodProgramaCompuesto}',
  //         '${datos[i].NombrePrograma}',
  //         '${datos[i].Tipo}',
  //         '${datos[i].CodigoIndicador}', 
  //         '${datos[i].NombreIndicador}', 
  //         '${datos[i].Unidad}', 
  //         '${datos[i].LB}', 
  //         ${datos[i].MetaPlan}, 
  //         '${datos[i].Responsable}', 
  //         ${datos[i].cod_responsable_reporte}, 
  //         '${datos[i].ResponsableReporte}', 
  //         '${datos[i].FC}', 
  //         '${datos[i].Sentido}', 
  //         ${datos[i].Meta2020}, 
  //         ${datos[i].Log20}, 
  //         ${datos[i].Cumplimiento20}, 
  //         ${datos[i].Meta2021}, 
  //         ${datos[i].Log21}, 
  //         ${datos[i].Cumplimiento21}, 
  //         ${datos[i].Meta2022}, 
  //         ${datos[i].Log22}, 
  //         ${datos[i].Cumplimiento22}, 
  //         ${datos[i].Meta2023}, 
  //         ${datos[i].Log23}, 
  //         ${datos[i].Cumplimiento23}, 
  //         ${datos[i].MetaRuralidad}, 
  //         ${datos[i].avance_cuatrienio}, 
  //         ${datos[i].avance_cuatrienio}, 
  //         ${datos[i].Peso}, 
  //         ${datos[i].PesoXAvnt}, 
  //         ${datos[i].Avance20}, 
  //         ${datos[i].Avance21}, 
  //         ${datos[i].Avance22}, 
  //         ${datos[i].Avance23}, 
  //         ${datos[i].semafAv},
  //         ${datos[i].aVNorm},
  //         ${datos[i].AvNormTmp},
  //         '${datos[i].Observacion}',
  //         ${datos[i].AvancePond},
  //         ${datos[i].Prog2020},
  //         ${datos[i].Prog2021},
  //         ${datos[i].Prog2022},
  //         ${datos[i].Prog2023},
  //         '${datos[i].Corte}'
               
  //     );`)
  //       console.log(i, "-", datos[i].CodigoIndicador, " -Ok")  
  // }
  
}

//ruta para actualizar los cortes del avance delplan indicativo
const getUpdateLogros = async (req, res)=>{
  try {
    const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/tabla_Segto_PI.xlsx');
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    console.log(datos)
    
    //  for (let i=0; i<datos.length; i++){
      
    //     //actualiza corte de la tabla indicador principal
    //     await aws_pool.query(` 
    //         UPDATE indicativo.tbl_indicador
    //         SET 
    //           cod_responsable_reporte = ${datos[i].cod_responsable_reporte},
    //           meta_2020=${datos[i].Meta2020},
    //           meta_2021=${datos[i].Meta2021},
    //           meta_2022=${datos[i].Meta2022},
    //           meta_2023=${datos[i].Meta2023},
    //           logro_2020=	${datos[i].Log20},
    //           logro_2021=	${datos[i].Log21},
    //           logro_2022=	${datos[i].Log22},
    //           logro_2023=	${datos[i].Log23},
    //           cumple_2020=	${datos[i].Cumplimiento20},
    //           cumple_2021=	${datos[i].Cumplimiento21},
    //           cumple_2022=	${datos[i].Cumplimiento22},
    //           cumple_2023=	${datos[i].Cumplimiento23},
    //           avance_cuatrienio = ${datos[i].avance_cuatrienio},
    //           pesoxavnt=	${datos[i].PesoXAvnt},
    //           avance2020=	${datos[i].Avance20},
    //           avance2021=	${datos[i].Avance21},
    //           avance2022=	${datos[i].Avance22},
    //           avance2023=	${datos[i].Avance23},
    //           semafav=	${datos[i].semafAv},
    //           avnorm=		${datos[i].aVNorm},
    //           avnormtemp=	${datos[i].AvNormTmp},
    //           observaciones_indicador = '${datos[i].Observacion}' ,
    //           avancepond= ${datos[i].AvancePond},
    //           prog2020= ${datos[i].Prog2020},
    //           prog2021= ${datos[i].Prog2021},
    //           prog2022= ${datos[i].Prog2022},
    //           prog2023= ${datos[i].Prog2023},
    //           corte='${datos[i].Corte}'
    //         WHERE cod_indicador= '${datos[i].CodigoIndicador}';
    //     `)
    //     console.log(i, "-", datos[i].CodigoIndicador, " -Ok")  
    //   }
    
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
    console.log(datos)

    // for (let i = 0; i < datos.length; i++) {
     

    //   if (datos[i].corte == "2023-06-30") {
    //     await aws_pool.query(` 
    //       INSERT INTO indicativo.tbl_comportamiento_lineas(
    //         cod_linea, nom_linea, avance, cumplimiento, corte, tipo)
    //       VALUES (
    //         ${datos[i].cod_linea},
    //         '${datos[i].linea}',
    //         ${datos[i].avance}, 
    //         ${datos[i].cumplimiento},
    //         '${datos[i].corte}',
    //         '${datos[i].tipo}');
    //     `);
    //     console.log(datos[i].linea, " ok");
    //   }
      


    // }


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
    console.log(datos)
    // await aws_pool.query(` delete from inverpublica.tbl_consolidado`);
    // for (let i=0; i<datos.length; i++){
    //   await aws_pool.query(`  
    //         INSERT INTO inverpublica.tbl_consolidado(
    //            cod_dependencia, espp, cod_proyecto, nom_proyecto, inversion_real, vigencia, corte, total_geo, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c50, c60, c70, c80, c90, c99, c97)
    //         VALUES (${datos[i].CodDep},'${datos[i].EsPP}','${datos[i].CodProyecto}','${datos[i].NombreProyecto}', ${datos[i].inversion_real},${datos[i].vigencia},'${datos[i].corte}',${datos[i].Total_Georreferenciado},
    //                 ${datos[i].c1},${datos[i].c2}, ${datos[i].c3},${datos[i].c4}, ${datos[i].c5},${datos[i].c6}, ${datos[i].c7},${datos[i].c8}, ${datos[i].c9},${datos[i].c10}, ${datos[i].c11}, ${datos[i].c12}, ${datos[i].c13},
    //                 ${datos[i].c14}, ${datos[i].c15}, ${datos[i].c16}, ${datos[i].c50}, ${datos[i].c60},  ${datos[i].c70},  ${datos[i].c80},  ${datos[i].c90}, ${datos[i].c99}, ${datos[i].c97});
    //              `);
    //         console.log(datos[i].CodProyecto, " ok")   
    // }
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
    // for (let i = 0; i < datos.length; i++) {
    //   await aws_pool.query(`INSERT INTO inverpublica.tbl_tipoinver_geo(cod_comuna, localizada, ciudad, pp, total)
    //   VALUES ( 
    //           ${datos[i].Cod_Comuna},
    //           ${datos[i].Localizada},
    //           ${datos[i].Ciudad},
    //           ${datos[i].PP},
    //           ${datos[i].Total}
    //         );`);
    //   console.log(datos[i].Cod_Comuna, " ok");
    // }
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
      await aws_pool.query(` 
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
    
    // await aws_pool.query(` delete from plan_accion.tbl_accion`);
    // for (let i = 0; i < datos.length; i++) {
    //   await aws_pool.query(` INSERT INTO plan_accion.tbl_accion(
    //                       cod_dependencia,
    //                       cod_linea,
    //                       nom_linea,
    //                       cod_componente,
    //                       nom_componente,
    //                       cod_programa,
    //                       nom_programa,
    //                       cod_proyecto,
    //                       nom_proyecto,
    //                       eficacia_proyecto,
    //                       ejec_fin_porc,
    //                       eficiencia,
    //                       ppto_ajustado,
    //                       ejec_real,
    //                       ppto_inicial, 
    //                       cod_val_stat,
    //                       nom_val_stat,
    //                       u_medida,
                          
    //                       q_plan,
    //                       q_real,
    //                       eficacia_ve,
    //                       obs_val_stat, 
    //                       y_dev_poai,
    //                       y_dev_pptoajustado,
    //                       y_dev_ejecucion,
                          
    //                       compromisos,
    //                       facturas,
    //                       pagos,
    //                       "corte_ejecucion",
    //                       obs_proyecto,
    //                       num_ve,
    //                       pago_factura, compromiso2,
    //                       factura2, pago2, nombre_dep_reporte, 
    //                        y_dev_es_pp, espagopendiente,escola, esmcv, cod_siufp_catal, obs_cod_suifp)
    //     VALUES (
    //       ${datos[i].cod_dependencia},
    //       '${datos[i].cod_linea}',
    //       '${datos[i].nom_linea}',
    //       '${datos[i].cod_componente}',
    //       '${datos[i].nom_componente}',
    //       '${datos[i].cod_programa}',
    //       '${datos[i].nom_programa}',
    //       '${datos[i].cod_proyecto}',
    //       '${datos[i].nom_proyecto}',
          
    //       ${datos[i].eficacia_proyecto},
    //       ${datos[i].ejec_fin_porc},
    //       ${datos[i].eficiencia},
    //       ${datos[i].pto_ajustado},
    //       ${datos[i].ejec_real},
    //       ${datos[i].pto_inicial},
    //       '${datos[i].cod_val_stat}',
    //       '${datos[i].nom_val_stat}',
    //       '${datos[i].u_medida}',

    //       ${datos[i].q_plan},
    //       ${datos[i].q_real},
    //       ${datos[i].eficacia_ve},
    //       '${datos[i].obs_val_stat}',
    //       ${datos[i].y_dev_poai},
    //       ${datos[i].y_dev_pptoajustado},
    //       ${datos[i].y_dev_ejecucion},

    //       ${datos[i].compromisos},
    //       ${datos[i].facturas},
    //       ${datos[i].pagos},
    //       '${datos[i].corte_ejecucion}',
    //       '${datos[i].obs_proyecto}',

    //       ${datos[i].num_ve},
    //       ${datos[i].pago_factura},
    //       ${datos[i].compromiso2},
    //       ${datos[i].factura2},
    //       ${datos[i].pago2},
    //       '${datos[i].nombre_dep_reporte}',
    //       ${datos[i].y_dev_es_pp},
    //       ${datos[i].espagopendiente},
    //       ${datos[i].escola},
    //       ${datos[i].esmcv},
    //       '${datos[i].cod_suifp_catal}',
    //       '${datos[i].obs_cod_suifp}'
    //     );
        
    //     `);
    //   console.log(i, "-", datos[i].cod_val_stat, " -Ok");
    // }
    
  } catch (error) {
    console.log(error);
  }
};

const getEjecFisicaPA = async (req, res)=>{
  try {
    const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/Visualizaciones_PAV.xlsx');
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[1]]);
    console.log(datos)
  
    // await aws_pool.query('delete from plan_accion.tbl_exec_fisica')

    //   for (let i=0; i<datos.length; i++){
        
    //     await aws_pool.query(` INSERT INTO plan_accion.tbl_exec_fisica(
    //       cod_dependencia, nom_dependencia, cod_proyecto, nom_proyecto, porc_eficacia_proyecto, 
    //       ejec_fisica, ejec_financiera, poai, ppto_ajustado, ejecucion, compromisos, pagos, facturas, num_valstat, tipo_proyecto, espago_pendiente, saldo_no_exec, "corte")
	  //       VALUES (
        
    //       ${datos[i].Codigo_Dependencia},
    //       '${datos[i].Nombre_Dependencia}',   
    //       '${datos[i].cod_proyecto}',
    //       '${datos[i].nom_proyecto}',
    //       ${datos[i].porc_eficacia_proyecto},
    //       ${datos[i].ejecucion_fisica},
    //       ${datos[i].ejecucion_financiera},
    //       ${datos[i].POAI},
    //       ${datos[i].ppto_ajustado},
          
    //       ${datos[i].ejecucion},
    //       ${datos[i].Compromisos},
    //       ${datos[i].Pagos},
    //       ${datos[i].Facturas},
    //       ${datos[i].num_valstat},
    //       '${datos[i].tipo_proyecto}',
    //       '${datos[i].espagopendiente}',
    //       '${datos[i].saldo_no_ejec}',
    //       '${datos[i].corte}'
    //   );
    //     `);
        
    //      console.log(i,"-", datos[i].cod_proyecto, " -Ok")        
    //   }


   } catch (error) {
     console.log(error)
  }
  
}

const getEjecFinancieraPA= async(req, res)=>{
  try {
    const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/Visualizaciones_PAV.xlsx');
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[2]]);
    console.log(datos)

   
    // await aws_pool.query(' delete from plan_accion.tbl_exec_financiera')

    // for (let i=0; i<datos.length; i++){
    //     await aws_pool.query(` INSERT INTO plan_accion.tbl_exec_financiera(
	  //     cod_dependencia, nom_dependencia, cod_proyecto, nom_proyecto, porc_eficacia_proyecto, ejec_financiera, 
	  //     porc_ejec_financiera,  poai, ppto_ajustado, ejecucion, compromisos, pagos, facturas, num_valstat, tipo_proyecto, espago_pendiente, saldo_no_exec, tipo_iniciativa,"corte")
	  //       VALUES (
    //       ${datos[i].cod_dependencia},
    //       '${datos[i].nom_dependencia}',
    //       '${datos[i].cod_proyecto}',
    //       '${datos[i].nom_proyecto}',
    //       ${datos[i].porc_eficacia_proyecto},
    //       ${datos[i].ejecucion_financiera},
    //       ${datos[i].porc_ejecucion_financiera},
         
    //       ${datos[i].POAI},
          
    //       ${datos[i].ppto_ajustado},
    //       ${datos[i].ejecucion},
    //       ${datos[i].Compromisos},
    //       ${datos[i].Pagos},
    //       ${datos[i].Facturas},
    //       ${datos[i].num_valstat},
    //       '${datos[i].tipo_proyecto}',
    //       '${datos[i].espagopendiente}',
    //       '${datos[i].saldo_no_ejec}',
    //       ${datos[i].tipo_iniciativa},
    //       '${datos[i].corte}'
    //   );
    //     `);
    //     console.log(i,"-", datos[i].cod_proyecto, " -Ok")         
    // }


   } catch (error) {
     console.log('Error getEjecFinancieraPA: ',error)
  }
}


const getEjecFinanciera_PI_PA = async(req, res)=>{
  try {
    const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/Visualizaciones_PAV.xlsx');
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    console.log(datos)

    
    // await aws_pool.query(` delete from  indicativo.tbl_ejec_finan_plan`)
    // for (let i=0; i<datos.length; i++){
    //   await aws_pool.query(` 
    //   INSERT INTO indicativo.tbl_ejec_finan_plan(cod_linea, cod_componente, cod_programa, cod_dependencia, cod_proyecto, ppto_ajustado, ejecutado, corte)
    //   VALUES (
    //     '${datos[i].Cod_Linea}',
    //     '${datos[i].Cod_Componente}',
    //     '${datos[i].Cod_Programa}',
    //     ${datos[i].cod_dependencia},
    //     '${datos[i].cod_proyecto}',
    //     ${datos[i].ppto_ajustado},
    //     ${datos[i].ejecucion},
    //     '${datos[i].corte}'
    //   );
    // `);
    //   console.log(i,"-", datos[i].cod_proyecto, " -Ok")          
    // }
  
  } catch (error) {
    console.error('Error getEjecFinanciera_PI_PA ', error)
  }
}

const getAdminUsers = async(req, res)=>{
  try {
    const admin= req.params.admin
  
    const response =await aws_pool.query(`
      select id,email,password,nom_usuario, id_cargo,tel_contacto from auth.tbl_users 
    `) 
    res.status(200).json({
      data: response.rows
    })

  } catch (error) {
    console.error('Error getAdminUsers: ', error);
  }
}

const deleteUsers = async(req, res)=>{
  try {
  
    const admin= req.params.admin
    const user =req.params.user
  
    const response =await aws_pool.query(`
         delete from auth.tbl_users where id=$1 returning *`,[user]) 
    res.status(200).json({
      data: response.rows
    })

  } catch (error) {
    console.error('Error deleteUsers:', error);
  }
}


const putUser = async (req, res)=>{
  try {
  
   const {idadmin, user, fullname, email, password}= req.body;
    const results = await local_pool.query(`
      UPDATE auth.tbl_users
      SET  email=$3, password=$4, nom_usuario=$2
      WHERE id=$1;
   `,[user, fullname, email, password]);

   const response = await aws_pool.query(`
   select id,email,password,nom_usuario, id_cargo,tel_contacto from auth.tbl_users 
   `)
   res.status(200).json({
    data: response.rows
  })
  
     
  
  } catch (error) {
    console.error('Error putUser:', error);
  }
}

const getProyectosEspeciales = async(req,res)=>{
  try {
    // const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/ProyectoseIndicadores.xlsx');
    // var nombreHoja = excel.SheetNames;
    // var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    // //console.log(datos)
    // let estadosgtoespecial=[]

  //   for (let index = 0; index < datos.length; index++) {
  //     const response = await aws_pool.query(` 
  //       SELECT 
 	//         indicativo.tbl_ejec_finan_plan.cod_linea,
	//         indicativo.tbl_ejec_finan_plan.cod_componente,
	//         indicativo.tbl_ejec_finan_plan.cod_programa,
	//         indicativo.tbl_ejec_finan_plan.cod_dependencia,
	//         plan_accion.tbl_exec_financiera.cod_proyecto,
	//         plan_accion.tbl_exec_financiera.nom_proyecto,
	//         plan_accion.tbl_exec_financiera.ejec_financiera,
	//         plan_accion.tbl_exec_fisica.porc_eficacia_proyecto,
	//         plan_accion.tbl_exec_financiera.poai,
	//         plan_accion.tbl_exec_financiera.ppto_ajustado,
	//         plan_accion.tbl_exec_financiera.ejecucion,
	//         plan_accion.tbl_exec_financiera.compromisos,
	//         plan_accion.tbl_exec_financiera.pagos,
	//         plan_accion.tbl_exec_financiera.facturas,
	//         plan_accion.tbl_exec_financiera.num_valstat,
	//         plan_accion.tbl_exec_financiera.tipo_proyecto,
	//         plan_accion.tbl_exec_financiera.corte
  //       FROM plan_accion.tbl_exec_fisica
  //       LEFT JOIN plan_accion.tbl_exec_financiera ON tbl_exec_financiera.cod_proyecto = tbl_exec_fisica.cod_proyecto
  //       LEFT JOIN indicativo.tbl_ejec_finan_plan ON indicativo.tbl_ejec_finan_plan.cod_proyecto = tbl_exec_financiera.cod_proyecto
  //       WHERE plan_accion.tbl_exec_financiera.cod_proyecto=$1
  //       GROUP BY 
  //           indicativo.tbl_ejec_finan_plan.cod_linea,
	//         indicativo.tbl_ejec_finan_plan.cod_componente,
	//         indicativo.tbl_ejec_finan_plan.cod_programa,
	//         indicativo.tbl_ejec_finan_plan.cod_dependencia,
	//         plan_accion.tbl_exec_financiera.cod_proyecto,
	//         plan_accion.tbl_exec_financiera.nom_proyecto,
	//         plan_accion.tbl_exec_financiera.ejec_financiera,
	//         plan_accion.tbl_exec_fisica.porc_eficacia_proyecto,
	//         plan_accion.tbl_exec_financiera.poai,
	//         plan_accion.tbl_exec_financiera.ppto_ajustado,
	//         plan_accion.tbl_exec_financiera.ejecucion,
	//         plan_accion.tbl_exec_financiera.compromisos,
	//         plan_accion.tbl_exec_financiera.pagos,
	//         plan_accion.tbl_exec_financiera.facturas,
	//         plan_accion.tbl_exec_financiera.num_valstat,
	//         plan_accion.tbl_exec_financiera.tipo_proyecto,
	//         plan_accion.tbl_exec_financiera.corte
  //       ORDER BY 
  //           indicativo.tbl_ejec_finan_plan.cod_linea,
	//         indicativo.tbl_ejec_finan_plan.cod_componente,
	//         indicativo.tbl_ejec_finan_plan.cod_programa,
	//         indicativo.tbl_ejec_finan_plan.cod_dependencia,
	//         plan_accion.tbl_exec_financiera.cod_proyecto,
	//         plan_accion.tbl_exec_financiera.nom_proyecto,
	//         plan_accion.tbl_exec_financiera.ejec_financiera,
	//         plan_accion.tbl_exec_fisica.porc_eficacia_proyecto,
	//         plan_accion.tbl_exec_financiera.poai,
	//         plan_accion.tbl_exec_financiera.ppto_ajustado,
	//         plan_accion.tbl_exec_financiera.ejecucion,
	//         plan_accion.tbl_exec_financiera.compromisos,
	//         plan_accion.tbl_exec_financiera.pagos,
	//         plan_accion.tbl_exec_financiera.facturas,
	//         plan_accion.tbl_exec_financiera.num_valstat,
	//         plan_accion.tbl_exec_financiera.tipo_proyecto,
	//         plan_accion.tbl_exec_financiera.corte
  //       `, [datos[index].cod_proyecto]);


  //       estadosgtoespecial.push(response.rows)
      
    
  //  }

  //console.log(estadosgtoespecial)
  res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
            data:   {
              "Autor": "Alcaldía de Medellin - Departamento Administrativo de Planeación ",
              "Version": "1.0",
              "Cobertura": "Municipio de Medelín",
              "Datos_Contacto": "Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838",
              "eMail_Contacto": "jhon.betancur@medellin.gov.co",
              "data": [
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.3",
                    "cod_programa": "3.3.4",
                    "cod_dependencia": 723,
                    "cod_proyecto": "200299",
                    "nom_proyecto": "INVERSIONES EN BIENES DE  CAPITAL A FAVOR DE MUJERES CON DEDICACIÓN A TRABAJO DOMÉSTICO Y CUIDADO NO REMUNERADO",
                    "ejec_financiera": "0",
                    "porc_eficacia_proyecto": "0",
                    "poai": "10597.478565",
                    "ppto_ajustado": "0",
                    "ejecucion": "0",
                    "compromisos": "0",
                    "pagos": "0",
                    "facturas": "0",
                    "num_valstat": "0",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.1",
                    "cod_programa": "3.1.1",
                    "cod_dependencia": 721,
                    "cod_proyecto": "200191",
                    "nom_proyecto": "DESARROLLO DE LA ESTRATEGIA MEDELLÍN ME CUIDA SALUD",
                    "ejec_financiera": "0.952102790204638",
                    "porc_eficacia_proyecto": "0.424418181818182",
                    "poai": "26566.791526",
                    "ppto_ajustado": "50925.994383",
                    "ejecucion": "48486.781346",
                    "compromisos": "28959.855428",
                    "pagos": "19526.925918",
                    "facturas": "0",
                    "num_valstat": "11",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.4",
                    "cod_programa": "3.4.1",
                    "cod_dependencia": 722,
                    "cod_proyecto": "200085",
                    "nom_proyecto": "IMPLEMENTACIÓN DE LA ESTRATEGIA DE RENTAS BÁSICAS",
                    "ejec_financiera": "0",
                    "porc_eficacia_proyecto": "0",
                    "poai": "330",
                    "ppto_ajustado": "660",
                    "ejecucion": "0",
                    "compromisos": "0",
                    "pagos": "0",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.1",
                    "cod_programa": "3.1.2",
                    "cod_dependencia": 721,
                    "cod_proyecto": "200208",
                    "nom_proyecto": "DESARROLLO DE TECNOLOGÍAS DE INFORMACIÓN E INNOVACIÓN EN SALUD",
                    "ejec_financiera": "0.467160036980217",
                    "porc_eficacia_proyecto": "0.16",
                    "poai": "1990",
                    "ppto_ajustado": "3731.725",
                    "ejecucion": "1743.312789",
                    "compromisos": "1738.552789",
                    "pagos": "4.76",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.1",
                    "cod_programa": "3.1.1",
                    "cod_dependencia": 721,
                    "cod_proyecto": "200197",
                    "nom_proyecto": "FORTALECIMIENTO DE LA GESTIÓN TERRITORIAL EN SALUD BASADA EN COMUNIDAD",
                    "ejec_financiera": "0.795864730450439",
                    "porc_eficacia_proyecto": "0.3985",
                    "poai": "1337.025318",
                    "ppto_ajustado": "1936.374571",
                    "ejecucion": "1541.092226",
                    "compromisos": "903.215214",
                    "pagos": "637.877012",
                    "facturas": "0",
                    "num_valstat": "2",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.1",
                    "cod_programa": "3.1.2",
                    "cod_dependencia": 721,
                    "cod_proyecto": "200206",
                    "nom_proyecto": "ADMINISTRACIÓN DE LOS SISTEMAS DE INFORMACIÓN EN SALUD",
                    "ejec_financiera": "0.955356785215031",
                    "porc_eficacia_proyecto": "0.23635",
                    "poai": "1616.65482",
                    "ppto_ajustado": "3396.127513",
                    "ejecucion": "3244.513463",
                    "compromisos": "2491.718533",
                    "pagos": "752.79493",
                    "facturas": "0",
                    "num_valstat": "2",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.4",
                    "cod_programa": "3.4.3",
                    "cod_dependencia": 722,
                    "cod_proyecto": "200196",
                    "nom_proyecto": "IMPLEMENTACIÓN DE LA ESTRATEGIA GESTORES TERRITORIALES SOCIALES",
                    "ejec_financiera": "0.981824257229296",
                    "porc_eficacia_proyecto": "0.39524",
                    "poai": "23633.454457",
                    "ppto_ajustado": "24098.250978",
                    "ejecucion": "23660.247367",
                    "compromisos": "13129.278854",
                    "pagos": "10530.968513",
                    "facturas": "0",
                    "num_valstat": "5",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.4",
                    "cod_programa": "3.4.4",
                    "cod_dependencia": 722,
                    "cod_proyecto": "200222",
                    "nom_proyecto": "MODERNIZACIÓN DEL SISTEMA DE INFORMACIÓN PARA LA INCLUSIÓN SOCIAL",
                    "ejec_financiera": "0.971393046157611",
                    "porc_eficacia_proyecto": "0.45",
                    "poai": "1368.92",
                    "ppto_ajustado": "1123.73125",
                    "ejecucion": "1091.584722",
                    "compromisos": "868.929308",
                    "pagos": "222.655414",
                    "facturas": "0",
                    "num_valstat": "2",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.3",
                    "cod_programa": "3.3.4",
                    "cod_dependencia": 723,
                    "cod_proyecto": "200295",
                    "nom_proyecto": "DISEÑO Y PRIMERA FASE DE IMPLEMENTACIÓN DE UN SISTEMA MUNICIPAL DE CUIDADO CON ENFOQUE DE GÉNERO Y DERECHOS",
                    "ejec_financiera": "0.257609297897641",
                    "porc_eficacia_proyecto": "0.333333333333333",
                    "poai": "450",
                    "ppto_ajustado": "431.578681",
                    "ejecucion": "111.178681",
                    "compromisos": "103.730446",
                    "pagos": "7.448235",
                    "facturas": "0",
                    "num_valstat": "3",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "2",
                    "cod_componente": "2.5",
                    "cod_programa": "2.5.1",
                    "cod_dependencia": 915,
                    "cod_proyecto": "200115",
                    "nom_proyecto": "APROVECHAMIENTO DE LAS CIUDADELAS",
                    "ejec_financiera": "0.547353831078856",
                    "porc_eficacia_proyecto": "0.0434666666666667",
                    "poai": "5666.512115",
                    "ppto_ajustado": "5666.512115",
                    "ejecucion": "3101.587115",
                    "compromisos": "0",
                    "pagos": "3101.587115",
                    "facturas": "0",
                    "num_valstat": "3",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "2",
                    "cod_componente": "2.4",
                    "cod_programa": "2.4.3",
                    "cod_dependencia": 711,
                    "cod_proyecto": "200385",
                    "nom_proyecto": "IMPLEMENTACIÓN DE EVENTOS SER+STEM PARA LA CUARTA REVOLUCIÓN INDUSTRIAL.",
                    "ejec_financiera": "1",
                    "porc_eficacia_proyecto": "1",
                    "poai": "200",
                    "ppto_ajustado": "200",
                    "ejecucion": "200",
                    "compromisos": "0",
                    "pagos": "200",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.3",
                    "cod_programa": "3.3.1",
                    "cod_dependencia": 723,
                    "cod_proyecto": "200301",
                    "nom_proyecto": "IMPLEMENTACIÓN DE ESTRATEGIAS PARA LA INCORPORACIÓN DEL ENFOQUE DE GÉNERO EN EL SISTEMA EDUCATIVO",
                    "ejec_financiera": "0.836069072340426",
                    "porc_eficacia_proyecto": "0",
                    "poai": "470",
                    "ppto_ajustado": "470",
                    "ejecucion": "392.952464",
                    "compromisos": "392.952464",
                    "pagos": "0",
                    "facturas": "0",
                    "num_valstat": "3",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "2",
                    "cod_componente": "2.4",
                    "cod_programa": "2.4.1",
                    "cod_dependencia": 711,
                    "cod_proyecto": "200387",
                    "nom_proyecto": "FORMACIÓN CUALIFICADA DE MAESTROS, DIRECTIVOS Y AGENTES EDUCATIVOS.",
                    "ejec_financiera": "0.966183574879227",
                    "porc_eficacia_proyecto": "0",
                    "poai": "200",
                    "ppto_ajustado": "207",
                    "ejecucion": "200",
                    "compromisos": "11.641897",
                    "pagos": "188.358103",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "2",
                    "cod_componente": "2.1",
                    "cod_programa": "2.1.3",
                    "cod_dependencia": 714,
                    "cod_proyecto": "200392",
                    "nom_proyecto": "MEJORAMIENTO DE LA SITUACIÓN NUTRICIONAL DE MADRES GESTANTES, LACTANTES Y NIÑOS MENORES DE 6 AÑOS",
                    "ejec_financiera": "0.516778291157085",
                    "porc_eficacia_proyecto": "0.5769",
                    "poai": "10000",
                    "ppto_ajustado": "17931.43087",
                    "ejecucion": "9266.574203",
                    "compromisos": "3955.578279",
                    "pagos": "5310.995924",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.4",
                    "cod_programa": "3.4.4",
                    "cod_dependencia": 722,
                    "cod_proyecto": "200264",
                    "nom_proyecto": "ASISTENCIA SOCIAL DE EMERGENCIAS",
                    "ejec_financiera": "0.975768217574462",
                    "porc_eficacia_proyecto": "0.3541",
                    "poai": "11500",
                    "ppto_ajustado": "13452.428314",
                    "ejecucion": "13126.451998",
                    "compromisos": "7408.602207",
                    "pagos": "5717.849791",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.4",
                    "cod_programa": "3.4.5",
                    "cod_dependencia": 722,
                    "cod_proyecto": "200180",
                    "nom_proyecto": "FORTALECIMIENTO DE LA EDUCACIÓN NUTRICIONAL",
                    "ejec_financiera": "1",
                    "porc_eficacia_proyecto": "0.3573",
                    "poai": "430",
                    "ppto_ajustado": "430",
                    "ejecucion": "430",
                    "compromisos": "215",
                    "pagos": "215",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "4",
                    "cod_componente": "4.5",
                    "cod_programa": "4.5.2",
                    "cod_dependencia": 722,
                    "cod_proyecto": "200178",
                    "nom_proyecto": "MEJORAMIENTO DEL SISTEMA AGROALIMENTARIO DE LA CIUDAD",
                    "ejec_financiera": "0.346222109701917",
                    "porc_eficacia_proyecto": "0.1",
                    "poai": "2599.487366",
                    "ppto_ajustado": "2599.487366",
                    "ejecucion": "900",
                    "compromisos": "339.007999",
                    "pagos": "560.992001",
                    "facturas": "0",
                    "num_valstat": "2",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.4",
                    "cod_programa": "3.4.1",
                    "cod_dependencia": 722,
                    "cod_proyecto": "200177",
                    "nom_proyecto": "APOYO NUTRICIONAL PARA POBLACIÓN VULNERABLE",
                    "ejec_financiera": "0.803347729820217",
                    "porc_eficacia_proyecto": "0",
                    "poai": "16344.22932",
                    "ppto_ajustado": "39737.121376",
                    "ejecucion": "31922.726247",
                    "compromisos": "16361.772523",
                    "pagos": "15560.953724",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "1",
                    "cod_componente": "1.1",
                    "cod_programa": "1.1.2",
                    "cod_dependencia": 751,
                    "cod_proyecto": "200119",
                    "nom_proyecto": "CONTRIBUCIÓN A LA CONEXIÓN ENTRE OFERTA Y DEMANDA DEL MERCADO LABORAL",
                    "ejec_financiera": "0.957804428204982",
                    "porc_eficacia_proyecto": "0.172466666666667",
                    "poai": "1200",
                    "ppto_ajustado": "1263.716161",
                    "ejecucion": "1210.392935",
                    "compromisos": "342.349687",
                    "pagos": "868.043248",
                    "facturas": "0",
                    "num_valstat": "3",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "1",
                    "cod_componente": "1.2",
                    "cod_programa": "1.2.1",
                    "cod_dependencia": 751,
                    "cod_proyecto": "200084",
                    "nom_proyecto": "DESARROLLO DE ESTRATEGIAS DE TRANSFORMACIÓN ECONÓMICA PARA LA CUARTA REVOLUCIÓN INDUSTRIAL",
                    "ejec_financiera": "0.422383996661919",
                    "porc_eficacia_proyecto": "0.80655",
                    "poai": "33724.700148",
                    "ppto_ajustado": "36532.169592",
                    "ejecucion": "15430.603799",
                    "compromisos": "6143.14658",
                    "pagos": "9287.457218",
                    "facturas": "0.000001",
                    "num_valstat": "4",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "1",
                    "cod_componente": "1.2",
                    "cod_programa": "1.2.1",
                    "cod_dependencia": 751,
                    "cod_proyecto": "200124",
                    "nom_proyecto": "FORTALECIMIENTO DEL ECOSISTEMA DE EMPRENDIMIENTO DE BASE TECNOLÓGICA",
                    "ejec_financiera": "0.536413383647927",
                    "porc_eficacia_proyecto": "0.323333333333333",
                    "poai": "21100.603967",
                    "ppto_ajustado": "22122.934078",
                    "ejecucion": "11867.037925",
                    "compromisos": "7134.938219",
                    "pagos": "4732.099706",
                    "facturas": "0",
                    "num_valstat": "3",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "1",
                    "cod_componente": "1.2",
                    "cod_programa": "1.2.3",
                    "cod_dependencia": 751,
                    "cod_proyecto": "200132",
                    "nom_proyecto": "IMPLEMENTACIÓN DE CENTROS DE INNOVACIÓN ESPECIALIZADOS",
                    "ejec_financiera": "0.475260965860078",
                    "porc_eficacia_proyecto": "0.30335",
                    "poai": "4211.646321",
                    "ppto_ajustado": "5084.554162",
                    "ejecucion": "2416.490122",
                    "compromisos": "1471.95978",
                    "pagos": "944.530342",
                    "facturas": "0",
                    "num_valstat": "2",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "1",
                    "cod_componente": "1.3",
                    "cod_programa": "1.3.1",
                    "cod_dependencia": 751,
                    "cod_proyecto": "200150",
                    "nom_proyecto": "FORTALECIMIENTO DE PROCESOS DIGITALES EN LAS MIPYME",
                    "ejec_financiera": "1",
                    "porc_eficacia_proyecto": "0.22",
                    "poai": "0",
                    "ppto_ajustado": "353.997956",
                    "ejecucion": "353.997956",
                    "compromisos": "225.000002",
                    "pagos": "128.997954",
                    "facturas": "0",
                    "num_valstat": "3",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "1",
                    "cod_componente": "1.1",
                    "cod_programa": "1.1.1",
                    "cod_dependencia": 915,
                    "cod_proyecto": "200074",
                    "nom_proyecto": "APOYO EN LA FORMACIÓN DE TALENTO ESPECIALIZADO EN ÁREAS DE LA INDUSTRIA 4.0",
                    "ejec_financiera": "0.973172484949918",
                    "porc_eficacia_proyecto": "0.333333333333333",
                    "poai": "8094.078322",
                    "ppto_ajustado": "8094.078322",
                    "ejecucion": "7876.934314",
                    "compromisos": "0",
                    "pagos": "7876.934314",
                    "facturas": "0",
                    "num_valstat": "3",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "1",
                    "cod_componente": "1.1",
                    "cod_programa": "1.1.1",
                    "cod_dependencia": 751,
                    "cod_proyecto": "200121",
                    "nom_proyecto": "FORMACIÓN PARA LA INSERCIÓN LABORAL EN SECTORES RELACIONADOS CON LA CUARTA REVOLUCIÓN INDUSTRIAL",
                    "ejec_financiera": "0.784842747875667",
                    "porc_eficacia_proyecto": "0.7323",
                    "poai": "1116.420964",
                    "ppto_ajustado": "1425.640995",
                    "ejecucion": "1118.903996",
                    "compromisos": "112.473766",
                    "pagos": "1006.43023",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "1",
                    "cod_componente": "1.5",
                    "cod_programa": "1.5.1",
                    "cod_dependencia": 751,
                    "cod_proyecto": "200153",
                    "nom_proyecto": "FORMACIÓN EN UN SEGUNDO IDIOMA PARA EL TRABAJO",
                    "ejec_financiera": "1",
                    "porc_eficacia_proyecto": "0.128",
                    "poai": "500",
                    "ppto_ajustado": "500",
                    "ejecucion": "500",
                    "compromisos": "0",
                    "pagos": "500",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "1",
                    "cod_componente": "1.5",
                    "cod_programa": "1.5.1",
                    "cod_dependencia": 711,
                    "cod_proyecto": "200377",
                    "nom_proyecto": "MEJORAMIENTO DE LA COMPETENCIA COMUNICATIVA EN INGLÉS A LA PRIMERA INFANCIA Y ESTUDIANTES  OFICIALES",
                    "ejec_financiera": "1",
                    "porc_eficacia_proyecto": "1",
                    "poai": "500",
                    "ppto_ajustado": "500",
                    "ejecucion": "500",
                    "compromisos": "400",
                    "pagos": "100",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "5",
                    "cod_componente": "5.4",
                    "cod_programa": "5.4.3",
                    "cod_dependencia": 712,
                    "cod_proyecto": "200086",
                    "nom_proyecto": "DISEÑO E IMPLEMENTACIÓN DE UN MODELO DE INNOVACIÓN SOCIAL COLABORATIVO PARA LA PARTICIPACIÓN",
                    "ejec_financiera": "0.795622693051324",
                    "porc_eficacia_proyecto": "0.32",
                    "poai": "500",
                    "ppto_ajustado": "518.621204",
                    "ejecucion": "412.626799",
                    "compromisos": "238.628833",
                    "pagos": "173.997966",
                    "facturas": "0",
                    "num_valstat": "2",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "2",
                    "cod_componente": "2.2",
                    "cod_programa": "2.2.2",
                    "cod_dependencia": 711,
                    "cod_proyecto": "200393",
                    "nom_proyecto": "IMPLEMENTACION DE LA JORNADA COMPLEMENTARIA",
                    "ejec_financiera": "1",
                    "porc_eficacia_proyecto": "0.6726",
                    "poai": "800",
                    "ppto_ajustado": "670",
                    "ejecucion": "670",
                    "compromisos": "422.000001",
                    "pagos": "247.999999",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "2",
                    "cod_componente": "2.6",
                    "cod_programa": "2.6.1",
                    "cod_dependencia": 903,
                    "cod_proyecto": "200253",
                    "nom_proyecto": "FORTALECIMIENTO DE LA INVESTIGACIÓN, INNOVACIÓN Y EMPRENDIMIENTO COLEGIO MAYOR",
                    "ejec_financiera": "0.625834704785581",
                    "porc_eficacia_proyecto": "0.355",
                    "poai": "764.275",
                    "ppto_ajustado": "764.275",
                    "ejecucion": "478.309819",
                    "compromisos": "0",
                    "pagos": "478.309819",
                    "facturas": "0",
                    "num_valstat": "4",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "2",
                    "cod_componente": "2.6",
                    "cod_programa": "2.6.1",
                    "cod_dependencia": 915,
                    "cod_proyecto": "200117",
                    "nom_proyecto": "FORTALECIMIENTO DE LA INVESTIGACIÓN, INNOVACIÓN Y EMPRENDIMIENTO SAPIENCIA",
                    "ejec_financiera": "0.81374150022534",
                    "porc_eficacia_proyecto": "0.333333333333333",
                    "poai": "2052.726772",
                    "ppto_ajustado": "2052.726772",
                    "ejecucion": "1670.388963",
                    "compromisos": "0",
                    "pagos": "1670.388963",
                    "facturas": "0",
                    "num_valstat": "3",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "5",
                    "cod_componente": "5.3",
                    "cod_programa": "5.3.4",
                    "cod_dependencia": 732,
                    "cod_proyecto": "200272",
                    "nom_proyecto": "FORMULACIÓN E IMPLEMENTACIÓN DEL PLAN ESTRATÉGICO EN TECNOLOGÍA DE INFORMACIÓN Y TELECOMUNICACIONES PARA LA SEGURIDAD Y LA CONVIVENCIA",
                    "ejec_financiera": "0.161587891525888",
                    "porc_eficacia_proyecto": "0.4773",
                    "poai": "10000",
                    "ppto_ajustado": "25117.081507",
                    "ejecucion": "4058.616242",
                    "compromisos": "2384.529364",
                    "pagos": "1674.086878",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "4",
                    "cod_componente": "4.3",
                    "cod_programa": "4.3.1",
                    "cod_dependencia": 742,
                    "cod_proyecto": "200296",
                    "nom_proyecto": "DESARROLLO DE ESTRATEGIAS PARA LA CONSOLIDACIÓN DE LA POLITICA DE BIODIVERSIDAD",
                    "ejec_financiera": "0.5942725",
                    "porc_eficacia_proyecto": "0.5327",
                    "poai": "800",
                    "ppto_ajustado": "800",
                    "ejecucion": "475.418",
                    "compromisos": "277.188372",
                    "pagos": "198.229628",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "4",
                    "cod_componente": "4.3",
                    "cod_programa": "4.3.1",
                    "cod_dependencia": 742,
                    "cod_proyecto": "200077",
                    "nom_proyecto": "CONSTRUCCIÓN DEL REFUGIO DE VIDA SILVESTRE",
                    "ejec_financiera": "0.2607987365",
                    "porc_eficacia_proyecto": "0.540733333333333",
                    "poai": "2000",
                    "ppto_ajustado": "2000",
                    "ejecucion": "521.597473",
                    "compromisos": "183.433798",
                    "pagos": "338.163675",
                    "facturas": "0",
                    "num_valstat": "3",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "4",
                    "cod_componente": "4.1",
                    "cod_programa": "4.1.1",
                    "cod_dependencia": 741,
                    "cod_proyecto": "170040",
                    "nom_proyecto": "CONSTRUCCIÓN CORREDOR VIAL Y DE TRANSPORTE AVENIDA 80 Y OBRAS COMPLEMENTARIAS",
                    "ejec_financiera": "0.973922006751251",
                    "porc_eficacia_proyecto": "0.3061",
                    "poai": "76000",
                    "ppto_ajustado": "76055.344753",
                    "ejecucion": "74071.973986",
                    "compromisos": "782.141081",
                    "pagos": "73289.832905",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "3",
                    "cod_componente": "3.1",
                    "cod_programa": "3.1.5",
                    "cod_dependencia": 721,
                    "cod_proyecto": "200291",
                    "nom_proyecto": "ADECUACIÓN DE LA UNIDAD HOSPITALARIA SANTA CRUZ",
                    "ejec_financiera": "0.998794625275515",
                    "porc_eficacia_proyecto": "0",
                    "poai": "15756.025585",
                    "ppto_ajustado": "15775.04042",
                    "ejecucion": "15756.025585",
                    "compromisos": "0",
                    "pagos": "15756.025585",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "2",
                    "cod_componente": "2.7",
                    "cod_programa": "2.7.5",
                    "cod_dependencia": 741,
                    "cod_proyecto": "200079",
                    "nom_proyecto": "CONSTRUCCIÓN INFRAESTRUCTURA FÍSICA COMPLEMENTARIA PUI NOROCCIDENTAL, MEDELLÍN ANTIOQUIA OCCIDENTE",
                    "ejec_financiera": "0.495619247463743",
                    "porc_eficacia_proyecto": "0.57",
                    "poai": "14230.701523",
                    "ppto_ajustado": "32739.445863",
                    "ejecucion": "16226.299521",
                    "compromisos": "7314.191292",
                    "pagos": "8912.108229",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "4",
                    "cod_componente": "4.1",
                    "cod_programa": "4.1.2",
                    "cod_dependencia": 743,
                    "cod_proyecto": "200411",
                    "nom_proyecto": "DESARROLLO DE ESTRATEGIAS DE MOVILIDAD CAMINABLE Y PEDALEABLE",
                    "ejec_financiera": "0.524282399942681",
                    "porc_eficacia_proyecto": "0",
                    "poai": "2000",
                    "ppto_ajustado": "2242.373288",
                    "ejecucion": "1175.636849",
                    "compromisos": "900.636849",
                    "pagos": "275",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "4",
                    "cod_componente": "4.1",
                    "cod_programa": "4.1.1",
                    "cod_dependencia": 743,
                    "cod_proyecto": "200217",
                    "nom_proyecto": "ESTUDIOS DE MOVILIDAD SOSTENIBLE Y GESTIÓN DE LA DEMANDA PARA LA CIUDAD",
                    "ejec_financiera": "0.997191090233107",
                    "porc_eficacia_proyecto": "0.6667",
                    "poai": "685.283798",
                    "ppto_ajustado": "673.683798",
                    "ejecucion": "671.791481",
                    "compromisos": "385.234884",
                    "pagos": "286.556597",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "4",
                    "cod_componente": "4.1",
                    "cod_programa": "4.1.4",
                    "cod_dependencia": 741,
                    "cod_proyecto": "200025",
                    "nom_proyecto": "CONSTRUCCIÓN DE OBRAS DE ESTABILIZACIÓN,  PROTECCIÓN Y MITIGACIÓN EN LA INFRAESTRUCTURA VIAL Y PEATONAL",
                    "ejec_financiera": "0.217845845965653",
                    "porc_eficacia_proyecto": "0",
                    "poai": "8000",
                    "ppto_ajustado": "22779.137665",
                    "ejecucion": "4962.340515",
                    "compromisos": "2286.858473",
                    "pagos": "2675.482042",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "4",
                    "cod_componente": "4.1",
                    "cod_programa": "4.1.2",
                    "cod_dependencia": 741,
                    "cod_proyecto": "200029",
                    "nom_proyecto": "CONSTRUCCION, MEJORAMIENTO Y MANTENIMIENTO DE CICLORUTAS",
                    "ejec_financiera": "0.320629490062992",
                    "porc_eficacia_proyecto": "0.5",
                    "poai": "13159.383382",
                    "ppto_ajustado": "5089.08367",
                    "ejecucion": "1631.710302",
                    "compromisos": "674.97164",
                    "pagos": "956.738662",
                    "facturas": "0",
                    "num_valstat": "2",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ],
                [
                  {
                    "cod_linea": "4",
                    "cod_componente": "4.4",
                    "cod_programa": "4.4.2",
                    "cod_dependencia": 741,
                    "cod_proyecto": "200080",
                    "nom_proyecto": "CONSTRUCCIÓN PARQUES DEL RÍO NORTE",
                    "ejec_financiera": "0",
                    "porc_eficacia_proyecto": "0.125",
                    "poai": "44000",
                    "ppto_ajustado": "18386.540064",
                    "ejecucion": "0",
                    "compromisos": "0",
                    "pagos": "0",
                    "facturas": "0",
                    "num_valstat": "1",
                    "tipo_proyecto": "0",
                    "corte": "2023-06-30T05:00:00.000Z"
                  }
                ]
              ]
            }
        })




  } catch (error) {
    console.error('Error getProyectosEspeciales: ', error);
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
  getEjecFinanciera_PI_PA,
  getAdminUsers,
  deleteUsers,
  putUser,
  getProyectosEspeciales
};