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
  } catch (error) {
    console.error('Error getFichaCarga: ', error);
  } 
}

//ruta para cargar datos indicador para tabla tbl_indicador

const getFichMain = async(req, res)=>{
  
}



module.exports={getFichaCarga}


