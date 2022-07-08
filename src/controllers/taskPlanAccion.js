const res = require('express/lib/response');
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
        cod_linea,nom_linea,cod_proyecto,nom_proyecto,
		cod_componente,nom_componente,
		cod_programa, nom_programa, y_dev_poai,y_dev_pptoajustado,y_dev_ejecucion,
        cod_val_stat,
        nom_val_stat,
        u_medida,q_plan,q_real,eficacia_ve,
        obs_val_stat,cod_siufp_catal,obs_cod_siufp, corte_ejecucion
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

const getBuscaValStat = async(req, res)=>{
    try {
        const valstat = req.params.cod_val_stat;
        const response = await pool.query(` 
        select
            cod_dependencia,nombre_dep,
            cod_linea,nom_linea,cod_componente,nom_componente,cod_programa,nom_programa,
            cod_proyecto,nom_proyecto,
            cod_val_stat,nom_val_stat,
            u_medida,q_plan,q_real,eficacia_ve,
            obs_val_stat,
            cod_siufp_catal,obs_cod_siufp, corte_ejecucion 
            from plan_accion.tbl_accion
            left join dependencias.tbl_dependencias on plan_accion.tbl_accion.cod_dependencia = dependencias.tbl_dependencias.cod_dep
            where cod_val_stat = $1
        `,[valstat]);
        res.status(200). json({
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
        })

    } catch (error) {
        
        console.log("Error getBuscaVal Stat: ",error);
    }
}

const getAlertaFinanciera= async  (req, res)=>{
    try {
        const alerta = req.params.alerta
        const response = await pool.query(`select * from plan_accion.view_ejeuciones_proyecto where porc_ejec_financiera < $1 and tipo_iniciativa <= 2`, [alerta])

        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            data: response.rows
        })

    } catch (error) {
        console.error('Error getAlertaFinanciera: ', error);
        
    }
}

const getAlertaFisica = async(req, res)=>{
    try {
        const alerta = req.params.alerta
        const response = await pool.query(`select * from plan_accion.tbl_exec_fisica where porc_eficacia_proyecto <$1 and num_valstat > 0`, [alerta])
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error  getAlertaFisica: ', error);
        
    }
}

const getCorteAlertaPA = async(req, res)=>{
    const response = await pool.query(`select corte from plan_accion.tbl_exec_financiera group by corte`)
        res.status(200). json({
        Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
        Version: '1.0',
        Cobertura:'Municipio de Medelín',
        Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
        eMail_Contacto: 'bibiana.botero@medellin.gov.co',
        data: response.rows
    })
}

const getvaloraAlerta = async (req, res)=>{
    try {
        const mesvigencia= req.params.mes
        const response = await pool.query(`select mesvigencia, mes, verde, rojo, alerta from plan_accion.tbl_cortes_pa where mesvigencia=$1`, [mesvigencia])
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getvalorAlerta ', getvalorAlerta);
        
    }
}

const getAlertaFisicaFinanciera = async(req, res)=>{
    try {
        const alerta = req.params.alerta

        const response = await pool.query(`select * from plan_accion.view_ejeuciones_proyecto where porc_ejec_financiera > 0.80 and tipo_iniciativa<=2 and porc_eficacia_proyecto <$1`, [alerta])
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getAlertaFisicaFinanciera: ', error);
        
    }
}

const getAlertaPonderadoPA = async(req, res)=>{
    try {
        let alerta =[];
        const response = await pool.query(`
            select cod_dependencia,nom_dependencia, cod_proyecto, nom_proyecto,  poai,ppto_ajustado, porc_ejec_financiera, porc_eficacia_proyecto , sum(porc_eficacia_proyecto*0.50)+sum(porc_ejec_financiera*0.50) as ponderado
            from plan_accion.view_ejeuciones_proyecto
            group by  cod_dependencia,nom_dependencia, cod_proyecto, nom_proyecto,  poai,ppto_ajustado, porc_ejec_financiera, porc_eficacia_proyecto
            order by cod_dependencia`)
            
            for (let index = 0; index < response.rows.length; index++) {
                if (response.rows[index].ponderado<=0.40) {
                    alerta.push({
                        "cod_dependencia": response.rows[index].cod_dependencia,
                        "nom_dependencia": response.rows[index].nom_dependencia,
                        "cod_proyecto": response.rows[index].cod_proyecto,
                        "nom_proyecto": response.rows[index].nom_proyecto,
                        "poai": response.rows[index].poai,
                        "ppto_ajustado": response.rows[index].ppto_ajustado,
                        "ejec_financiera":response.rows[index].porc_ejec_financiera,
                        "porc_eficacia_proyecto": response.rows[index].porc_eficacia_proyecto,
                        "ponderado": response.rows[index].ponderado
                    })
                }
             
            }
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            data: alerta
        })
        
    } catch (error) {
        console.error('Error getAlertaPonderadoPA: ', error);
    }
}

const getAlertaCuentaDep = async(req, res)=>{
    try {
        const alerta = req.params.alerta
        const response = await pool.query(`
        select 
            count (cod_dependencia) as total_dep,
            cod_dependencia,
            nom_dependencia
        from plan_accion.view_ejeuciones_proyecto
        where tipo_iniciativa<=2 and porc_eficacia_proyecto <$1
        group by cod_dependencia, nom_dependencia
        order by  total_dep desc
    `, [alerta]) 
    res.status(200). json({
        Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
        Version: '1.0',
        Cobertura:'Municipio de Medelín',
        Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
        eMail_Contacto: 'bibiana.botero@medellin.gov.co',
        data: response.rows
    })
    
    } catch (error) {
        console.error('Error  getAlertaCuentaDep');
        
    }
}

const getDetalleFinanceroDep = async(req, res)=>{
    try {
        const dep = req.params.dep;
        const response = await pool.query(`select * from plan_accion.sp_detalle_pa_dep(${dep})`);
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            data: response.rows
        })

    } catch (error) {
        console.error('Error', error);
        
    }
}

const getPAFisInt = async(req, res)=>{
try {
    const response = await pool.query(`
    select 
	    sum(porc_eficacia_proyecto * ppto_ajustado)/ ( sum(ppto_ajustado) ) as porc_ejecfisica
from plan_accion.tbl_exec_fisica 
where tipo_proyecto='0'`);
    res.status(200). json({
        Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
        Version: '1.0',
        Cobertura:'Municipio de Medelín',
        Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
        eMail_Contacto: 'bibiana.botero@medellin.gov.co',
        data: response.rows
    })
    
} catch (error) {
    console.error('ERROR getPAFisInt:', error);
}

}

const getPAFisPP = async (req, res)=>{
    try {
        const response = await pool.query(`
        select 
            sum(porc_eficacia_proyecto * ppto_ajustado)/ ( sum(ppto_ajustado) ) as porc_ejecfisica
    from plan_accion.tbl_exec_fisica 
    where tipo_proyecto='1'`);

        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            data: response.rows
        })   
    } catch (error) {
        console.error('Error getPAFisPP', error);
    }
}

const getPAFinanInst = async(req, res)=>{
    try {
          const response = await pool.query(`select sum(ejecucion)/sum(ppto_ajustado) as porc_finan from plan_accion.tbl_exec_financiera where tipo_proyecto='0'`);
    
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            data: response.rows
        })   
    } catch (error) {
        console.error('Error getPAFinanInst:', error);
    }
}

const getPAFinanPP = async(req, res)=>{
    try {
          const response = await pool.query(`select sum(ejecucion)/sum(ppto_ajustado) as porc_finan from plan_accion.tbl_exec_financiera where tipo_proyecto='1'`);
    
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            data: response.rows
        })   
    } catch (error) {
        console.error('Error getPAFinanInst:', error);
    }
}

const getRankPPFisico = async (req, res)=>{
try {
    const response = await pool.query(`
    select cod_dependencia,nom_dependencia,
        sum(porc_eficacia_proyecto * ppto_ajustado)/ ( sum(ppto_ajustado) ) as porc_ejecfisica
    from plan_accion.tbl_exec_fisica 
    where tipo_proyecto='1'
    group  by cod_dependencia, nom_dependencia
    order by cod_dependencia`);
    res.status(200). json({
        Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
        Version: '1.0',
        Cobertura:'Municipio de Medelín',
        Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
        eMail_Contacto: 'bibiana.botero@medellin.gov.co',
        data: response.rows
    })   

} catch (error) {
    console.error('Error getRankPPFisico: ', error);
}
}

const getRankPPFinan= async(req,res)=>{
    try {
        const response = await pool.query(` 
        select
        cod_dependencia, nom_dependencia, sum(ejecucion)/sum(ppto_ajustado)as porcexec_financiera
        from plan_accion.tbl_exec_financiera
        where tipo_proyecto='1'
        group by cod_dependencia, nom_dependencia
        order by cod_dependencia
        
        `)
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            data: response.rows
        })   
    } catch (error) {
        console.error('Error getRankPPFinan:', error);
    }
}

const getProjectPP = async(req, res)=>{
    try {
        const response = await pool.query(` select * from plan_accion.tbl_exec_fisica where tipo_proyecto='1'`);
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            data: response.rows
        }) 

    } catch (error) {
        console.error('Error getProjectPP:', error);
    }

}
module.exports ={   getAvanceFisico, getAvanceFinanciero, getAvanceFinancieroDep, getAvanceFisicoDep,getPlanAccionDep, getValStat, getEjecFisicaDep , getEjecFinancieraDep,
                    getAvanceEjecucionProyect, getBuscaValStat, getAlertaFinanciera, getCorteAlertaPA, getvaloraAlerta, getAlertaFisica, getAlertaFisicaFinanciera, getAlertaPonderadoPA,
                    getAlertaCuentaDep, getDetalleFinanceroDep, getPAFisInt, getPAFisPP, getPAFinanInst, getPAFinanPP, getRankPPFisico, getRankPPFinan, getProjectPP
    
    };