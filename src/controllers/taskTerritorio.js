// aquí colocaré todas las rutas y consultas que tengas como eje principal programas del pdmconst { pool } = require('../sql/dbConfig');
const { pool } = require('../sql/dbConfig');


const getComuna = async (req, res)=>{
    try {
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


module.exports={getComuna}    
