const { pool } = require('../sql/dbConfig');


const getDependencias = async(req, res)=>{
    try {
        const response = await pool.query(`select * from dependencias.tbl_dependencias where cod_dep>700 and cod_dep<> 908 order by cod_dep`);
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Julio César Mendoza  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendozar@medellin.gov.co',
            Def: 'Listado de los dependencias Municipio de  Medellín',
            data: response.rows
        })
        
    } catch (error) {
        console.log('Error getDependencias', error)
    }
}
const getAvanceDepPDM = async (req, res)=>{
    try {
        const dependencia = req.params.cod_dependencia;
        const response = await pool.query(`select   sum(pesoxavnt) as avance, sum(peso) as peso from indicativo.tbl_indicador where cod_responsable_reporte=$1`,[dependencia])
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
            Def: 'Avance en el  Plan de Desarrollo Medellín Futuro PDM 2020-2023 de la dependencia consultada',
            data: response.rows
        })
    } catch (error) {
        console.log('Error getAvanceDepPDM: ', error)
    }
}
module.exports={ getDependencias , getAvanceDepPDM}    