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


const getConsolidadoGeo = async (req, res)=>{
  try {

   const excel = XLSX.readFile('/Users/jcmendoza/Desktop/pipApp/sse-pdm/src/public/uploads/Estructuracion.xlsx');
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    //console.log(datos)
    await local_pool.query(` delete from inverpublica.tbl_consolidado`);
    for (let i=0; i<datos.length; i++){
      
      await local_pool.query(`  
            INSERT INTO inverpublica.tbl_consolidado(
               cod_dependencia, espp, cod_proyecto, nom_proyecto, inversion_real, vigencia, corte, total_geo, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c50, c60, c70, c80, c90, c99, c97)
            VALUES ('${datos[i].CodDep}','${datos[i].EsPP}','${datos[i].CodProyecto}','${datos[i].NombreProyecto}', ${datos[i].inversion_real},${datos[i].vigencia},'${datos[i].corte}',${datos[i].Total_Georreferenciado},
                    ${datos[i].c1},${datos[i].c2}, ${datos[i].c3},${datos[i].c4}, ${datos[i].c5},${datos[i].c6}, ${datos[i].c7},${datos[i].c8}, ${datos[i].c9},${datos[i].c10}, ${datos[i].c11}, ${datos[i].c12}, ${datos[i].c13},
                    ${datos[i].c14}, ${datos[i].c15}, ${datos[i].c16}, ${datos[i].c50}, ${datos[i].c60},  ${datos[i].c70},  ${datos[i].c80},  ${datos[i].c90}, ${datos[i].c99}, ${datos[i].c97});
                 `);
            console.log(datos[i].CodProyecto, " ok")   
      
      /*
        await pool.query(`INSERT INTO inverpublica.tbl_tipoinver_geo(cod_comuna, localizada, ciudad, pp, total)
        VALUES (  ${datos[i].Cod_Comuna},
                ${datos[i].Localizada},
                ${datos[i].Ciudad},
                ${datos[i].PP},
                ${datos[i].Total}
             );`)
        console.log(datos[i].Cod_Comuna, " ok")   
        */ 
   }
  } catch (error) {
     console.log(error)
  }
}


module.exports={getFichaCarga, getFichaMain, getConsolidadoGeo}


