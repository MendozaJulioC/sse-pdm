const XLSX = require('xlsx');
const { pool, pool2 } = require('../sql/dbConfig');

const getComuna = async (req, res)=>{
    try {
       ExcelToJson()
        const response = await pool.query(`select * from territorio.tbl_comuna`) 
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
    const excel= XLSX.readFile('/Users/juliocesarmendoza/Desktop/pipApp/Backend-pi/src/public/uploads/Logros_ES.xlsm') 
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[2]]);
    console.log(datos)
    await pool2.query(` delete from reportes.tbl_reporte_estrtegico_sec`);
    for (let i=0; i<datos.length; i++){
      await pool2.query(`
        INSERT INTO reportes.tbl_reporte_estrtegico_sec(nombre, fecha, cod_dep, dpendencias, comuna, nom_comuna, logro, cifras)
        VALUES ( ${datos[i].Nombre},'${datos[i].Fecha}',${datos[i].Cod_dep},'${datos[i].Dependencia}','${datos[i].cod_comuna}','${datos[i].Comuna}','${datos[i].Logro}','${datos[i].Cifras}');`);  
        console.log(datos[i].Nombre, " ok")  
      }
     } catch (error) {
       console.log(error)
  }
}

const getReportSecretarios = async(req, res)=>{
  try {
    const comuna = req.params.comuna;
    const response = await pool2.query(`select * from reportes.tbl_reporte_estrtegico_sec where comuna=$1 order by cod_dep`,[comuna] ) 
    res.status(200).json({
      Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
      Version: '1.0',
      Cobertura:'Municipio de Medelín',
      Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
      eMail_Contacto: 'jhon.betancur@medellin.gov.co',
      data: response.rows
    });   

  } catch (error) {
    console.error('Error getReportSecretarios');
  }
}

module.exports={getComuna, getReportSecretarios}    
