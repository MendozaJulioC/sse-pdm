const XLSX = require('xlsx');
const { local_pool,  aws_pool } = require('../sql/dbConfig');

const getPoblacion = async (req, res)=>{
    try {
     
        const response = await local_pool.query(`select * from poblacion.tbl_poblacion_pdm`) 
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
            data: response.rows
          });   

    } catch (error) {
        console.error('Error getComuna: ', error);
    }
}




const dependencias = async (req, res)=>{
  try {
    const excel= XLSX.readFile('/Users/juliocesarmendoza/Desktop/pipApp/Backend-pi/src/public/uploads/Dependencias.xlsx') 
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    for (let i=0; i<datos.length; i++){
      
      await local_pool.query(`
      INSERT INTO dependencias.tbl_dependencias(
        cod_dependencias,nom_dependencia,nom_corto_dep,cod_dep_actual,cod_sector_admon)
        VALUES	(${datos[i].cod_dep},'${datos[i].nombre_dep}','${datos[i].nom_cortp}',${datos[i].cod_actual},'${datos[i].COD_SDA}');`);  


      console.log(datos[i].cod_dep, " - ",datos[i].nom_cortp," -Ok" )  
    
    }

  } catch (error) {
    console.error('Error dependencias', error);
    
  }
}

const poblapdm= async (req, res)=>{
    try {
 
        const excel= XLSX.readFile('/Users/juliocesarmendoza/Desktop/pipApp/Backend-pi/src/public/uploads/Poblacion.xlsx') 
     
        var nombreHoja = excel.SheetNames;
        var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[3]]);
        //console.log(datos)
        
             // await pool2.query(` delete from poblacion.tbl_poblacion_pdm`);
     
        for (let i=0; i<datos.length; i++){
      
          await pool.query(`
          INSERT INTO poblacion.tbl_poblacion_pdm(codigo_comuna, vigencia, hombres, mujeres, total)
            VALUES ( ${datos[i].cod_comuna},${datos[i].vigencia},${datos[i].hombres},${datos[i].mujeres},${datos[i].total});`);  


          console.log(datos[i].cod_comuna, " - ",datos[i].vigencia," -Ok" )  
        
        }
        
   
     } catch (error) {
       console.log(error)
    }
}

const getPoblacionPDM = async (req, res)=>{
  try {
    const response = await local_pool.query('select * from poblacion.tbl_poblacion_pdm')

    res.status(200).json({ data: response.rows }); 

  } catch (error) {
    console.error('Error getPoblacionPDM: ', error);
    
  }

}


module.exports={getPoblacion, getPoblacionPDM}    
