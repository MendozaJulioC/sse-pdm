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
	        sum(ppto_ajustado-compromisos-pagos-facturas) as Disponible,
	        sum(pagos+facturas) as Ordenado,
	        sum(ppto_ajustado) as Total
	      
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
                sum(ppto_ajustado-compromisos-pagos-facturas) as Disponible,
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
        SELECT
	        plan_accion.tbl_accion.cod_linea,
	        plan_accion.tbl_accion.cod_componente,
	        plan_accion.tbl_accion.cod_programa,
            plan_accion.tbl_exec_financiera.cod_dependencia,
	        tbl_exec_financiera.cod_proyecto,
	        plan_accion.tbl_exec_financiera.nom_proyecto, 
            tipo_iniciativa,
	        porc_eficacia_proyecto,
	        ejec_financiera,poai,
	        plan_accion.tbl_exec_financiera.ppto_ajustado,ejecucion
        FROM plan_accion.tbl_exec_financiera 
        LEFT JOIN plan_accion.tbl_accion ON plan_accion.tbl_accion.cod_proyecto=plan_accion.tbl_exec_financiera.cod_proyecto
        WHERE plan_accion.tbl_exec_financiera.cod_dependencia=$1
        GROUP BY 
            plan_accion.tbl_accion.cod_linea,
	        plan_accion.tbl_accion.cod_componente,
	        plan_accion.tbl_accion.cod_programa,
            plan_accion.tbl_exec_financiera.cod_dependencia,
	        tbl_exec_financiera.cod_proyecto,
	        plan_accion.tbl_exec_financiera.nom_proyecto, 
            tipo_iniciativa,porc_eficacia_proyecto,
	        ejec_financiera,poai,plan_accion.tbl_exec_financiera.ppto_ajustado,ejecucion
        ORDER BY plan_accion.tbl_accion.cod_linea,
	        plan_accion.tbl_accion.cod_componente,
	        plan_accion.tbl_accion.cod_programa,cod_dependencia, tbl_exec_financiera.cod_proyecto`, [dependencia])

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
        cod_linea,nom_linea,
		cod_componente,nom_componente,
		cod_programa, nom_programa, y_dev_poai,y_dev_pptoajustado,y_dev_ejecucion,
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

const getEjecFisicaDep = async (req, res)=> {
    try {
        const response = await pool.query(`
            select cod_dependencia,nom_dependencia,
                sum(porc_eficacia_proyecto * ppto_ajustado)/ ( sum(ppto_ajustado) ) as porc_ejecfisica
            from plan_accion.tbl_exec_fisica 
            group  by cod_dependencia, nom_dependencia
            order by cod_dependencia`);
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
        console.log('Error getEjecFisicaDep  :>> ', error);
    }
}


const getEjecFinancieraDep = async (req, res)=> {
    try {
        const response = await pool.query(`
        select
            cod_dependencia, nom_dependencia, pptoajustado, pptoejecutado, sum(pptoejecutado/pptoajustado)as porcexec_financiera
            from plan_accion.view_exec_financ_dep
            group by cod_dependencia, nom_dependencia, pptoajustado, pptoejecutado
            order by cod_dependencia
        `);
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
        console.log('Error getEjecFisicaDep  :>> ', error);
    }
}

const getAvanceEjecucionProyect = async(req, res)=>{
    try {
        const cod = req.params.cod_proyecto;
        const response = await pool.query(`
            select cod_dependencia, nom_dependencia, cod_proyecto, nom_proyecto, porc_eficacia_proyecto, porc_ejec_financiera, tipo_iniciativa
            from plan_accion.view_ejeuciones_proyecto
            where cod_proyecto=$1`, [cod])
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
        console.error('Error getAvanceEjecucionProyect :>> ', error);
    }
}
module.exports ={ getAvanceFisico, getAvanceFinanciero, getAvanceFinancieroDep, getAvanceFisicoDep,getPlanAccionDep, getValStat, getEjecFisicaDep , getEjecFinancieraDep, getAvanceEjecucionProyect};