const { pool } = require('../sql/dbConfig');



const getAvanceFisico = async (req, res)=>{
    try {
        const response = await pool.query(`select  sum(ejec_fisica) as Ejec_Fisica from plan_accion.tbl_exec_fisica`);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            Def: 'Listado de los Indicadoes del Plan de Desarrollo Medellín Futuro PDM 2020-2023',
            data: response.rows
        });
      
        
    } catch (error) {
        console.error('Error getAvanceFisico ', error)
    }
}

const getAvanceFinanciero = async(req, res)=>{
 try {
     const response = await pool.query(` 
        select 
	        sum(poai) as poai,
	        sum(ppto_ajustado) as PptoAjustado,
	        sum(ejecucion) as PptoEjecutado,
	        sum(compromisos) as Compromisos,
	        sum(ppto_ajustado-ejecucion) as Disponible,
	        sum(pagos+facturas) as Ordenado,
	        sum(ppto_ajustado) as Total,
	        sum(porc_ejec_financiera) as Ejec_Financiera
            From plan_accion.tbl_exec_financiera   
     `)
     res.status(200).json({
        Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
        Fecha_Emision:'2020-08-30',
        Fecha_Inicial:'2020-01-31',
        Fecha_Final:'2023-12-31',
        Frecuencia_actualizacion:'Semestral',
        Version: '1.0',
        Cobertura:'Municipio de Medelín',
        Fecha_ultima__actualizacion:'2020-08-30',
        Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
        eMail_Contacto: 'bibiana.botero@medellin.gov.co',
        Def: 'Listado de los Indicadoes del Plan de Desarrollo Medellín Futuro PDM 2020-2023',
        data: response.rows
    });
     
     
 } catch (error) {
     console.log('Error getAvanceFinanciero ', error)
 }
}



module.exports ={ getAvanceFisico, getAvanceFinanciero} ;