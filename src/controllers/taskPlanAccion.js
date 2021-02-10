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
       
        data: response.rows
    });
     
     
 } catch (error) {
     console.log('Error getAvanceFinanciero ', error)
 }
}

const getAvanceFinancieroDep = async (req, res)=>{
    try {
        const dependencia = req.params.cod_dependencia;
        const response = await pool.query(` 
            select 
                sum(poai) as poai,
                sum(ppto_ajustado) as PptoAjustado,
                sum(ejecucion) as PptoEjecutado,
                sum(compromisos) as Compromisos,
                sum(ppto_ajustado-ejecucion) as Disponible,
                sum(pagos+facturas) as Ordenado,
                sum(ppto_ajustado) as Total
           From plan_accion.tbl_exec_financiera  
           where cod_dependencia =$1`,[dependencia])
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
          
            data: response.rows
        });
    } catch (error) {
        console.log('Error getAvanceFinancieroDep: ', error)
    }
}


const getAvanceFisicoDep = async(req, res)=>{
    try {
        const  dependencia = req.params.cod_dependencia;
        const response = await pool.query(`  
        select 
	        sum((porc_eficacia_proyecto * ppto_ajustado)/ (select sum(ppto_ajustado) as ppto from plan_accion.tbl_exec_fisica where cod_dependencia =$1 )) as avance_fisico
            from plan_accion.tbl_exec_fisica 	where cod_dependencia =$1
        `, [dependencia])
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
          
            data: response.rows
        });
    } catch (error) {
        console.log('Error getAvanceFisicoDep', error )
    }
}

const getPlanAccionDep = async(req, res)=>{
    try {
        const dependencia = req.params.cod_dependencia;
        const response = await pool.query(`
        select
            cod_dependencia,tbl_exec_financiera.cod_proyecto,plan_accion.tbl_exec_financiera.nom_proyecto, 
            tipo_iniciativa,porc_eficacia_proyecto, ejec_financiera,poai,ppto_ajustado,ejecucion
        from plan_accion.tbl_exec_financiera 
        where cod_dependencia=$1
        group by 
            cod_dependencia,
            tbl_exec_financiera.cod_proyecto, plan_accion.tbl_exec_financiera.nom_proyecto, 
            tipo_iniciativa,porc_eficacia_proyecto, ejec_financiera,poai,ppto_ajustado,ejecucion
        order by cod_dependencia, tbl_exec_financiera.cod_proyecto 
        `, [dependencia])

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
          
            data: response.rows
        });
    } catch (error) {
    
    }
}

const getValStat= async(req, res)=>{
    try {
        const cod = req.params.cod_proyecto;
        const response = await pool.query(`select 
        cod_val_stat,
        nom_val_stat,
        u_medida,q_plan,q_real,eficacia_ve,
        obs_val_stat,cod_siufp_catal,obs_cod_siufp
        from plan_accion.tbl_accion where cod_proyecto=$1 `, [cod])
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
          
            data: response.rows
        });


    } catch (error) {
        console.log('Error getValStat ', error)
    }
}

module.exports ={ getAvanceFisico, getAvanceFinanciero, getAvanceFinancieroDep, getAvanceFisicoDep,getPlanAccionDep, getValStat}  ;