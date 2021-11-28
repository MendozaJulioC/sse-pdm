const XLSX = require('xlsx');
const { pool, pool2, pool3 } = require('../sql/dbConfig');

const getPoblacion = async (req, res)=>{
    try {
       //ExcelToJson()
       //poblapdm()
      // dependencias()
        const response = await pool2.query(`select * from poblacion.tbl_poblacion_pdm`) 
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


const ExcelToJson = async (req, res)=>{
    try {
 
        const excel= XLSX.readFile('/Users/juliocesarmendoza/Desktop/pipApp/Backend-pi/src/public/uploads/Poblacion.xlsx') 
     
        var nombreHoja = excel.SheetNames;
        var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[2]]);
        //console.log(datos)
        
       // await pool2.query(` delete from reportes.tbl_reporte_estrtegico_sec`);
     
        for (let i=0; i<datos.length; i++){
      
          await pool.query(`
          INSERT INTO poblacion.tbl_proyeccion(
            codigo_comuna, hombres_2021, mujeres_2021, total_2021, hombres_2022, mujeres_2022, total_2022, hombres_2023, mujeres_2023, total_2023, hombres_2024, mujeres_2024, total_2024, hombres_2025, mujeres_2025, total_2025, hombres_2026, mujeres_2026, total_2026, hombres_2027, mujeres_2027, total_2027, hombres_2028, mujeres_2028, total_2028, hombres_2029, mujeres_2029, total_2029, hombres_2030, mujeres_2030, total_2030)
         VALUES (   ${datos[i].Codigo_comuna},
                    ${datos[i].Hombres_2021},${datos[i].Mujeres_2021},${datos[i].Total_2021},
                    ${datos[i].Hombres_2022},${datos[i].Mujeres_2022},${datos[i].Total_2022},
                    ${datos[i].Hombres_2023},${datos[i].Mujeres_2023},${datos[i].Total_2023},
                    ${datos[i].Hombres_2024},${datos[i].Mujeres_2024},${datos[i].Total_2024},
                    ${datos[i].Hombres_2025},${datos[i].Mujeres_2025},${datos[i].Total_2025},
                    ${datos[i].Hombres_2026},${datos[i].Mujeres_2026},${datos[i].Total_2026},
                    ${datos[i].Hombres_2027},${datos[i].Mujeres_2027},${datos[i].Total_2027},
                    ${datos[i].Hombres_2028},${datos[i].Mujeres_2028},${datos[i].Total_2028},
                    ${datos[i].Hombres_2029},${datos[i].Mujeres_2029},${datos[i].Total_2029},
                    ${datos[i].Hombres_2030},${datos[i].Mujeres_2030},${datos[i].Total_2030});`);  
          console.log(datos[i].Codigo_comuna, " ok")  
        
        }
   
     } catch (error) {
       console.log(error)
    }
}


const dependencias = async (req, res)=>{
  try {
    const excel= XLSX.readFile('/Users/juliocesarmendoza/Desktop/pipApp/Backend-pi/src/public/uploads/Dependencias.xlsx') 
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    for (let i=0; i<datos.length; i++){
      
      await pool3.query(`
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
    const response = await pool3.query('select * from poblacion.tbl_poblacion_pdm')
    //await pool3.end()
    res.status(200).json({ data: response.rows }); 


  

  } catch (error) {
    console.error('Error getPoblacionPDM: ', error);
    
  }

}


module.exports={getPoblacion, getPoblacionPDM}    
