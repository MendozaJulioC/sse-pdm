const { pool } = require('../sql/dbConfig');

const getValStatBot= async (req, res)=>{
    try {
        const cod_valstat= req.params.cod_valstat;
        const response = await pool.query(` 
        select
            cod_dependencia,nombre_dep,
            cod_linea,nom_linea,cod_componente,nom_componente,cod_programa,nom_programa,
            cod_proyecto,nom_proyecto,
            cod_val_stat,nom_val_stat,
            u_medida,q_plan,q_real,eficacia_ve,
            eficacia_proyecto,
            obs_val_stat,
            cod_siufp_catal,
            obs_cod_siufp, 
            corte_ejecucion 
        from plan_accion.tbl_accion
        left join dependencias.tbl_dependencias on plan_accion.tbl_accion.cod_dependencia = dependencias.tbl_dependencias.cod_dep
        where cod_val_stat = $1`, [cod_valstat]);
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
            data: response.rows
        })
    } catch (error) {
        console.error('Error getValStatBot',error);
    }
}


const getProyectoBot = async (req, res)=>{
    try {
        const cod_proyecto = req.params.cod_proyecto;
        const response = await pool.query(` 
        SELECT 
 	        indicativo.tbl_ejec_finan_plan.cod_linea,
	        indicativo.tbl_ejec_finan_plan.cod_componente,
	        indicativo.tbl_ejec_finan_plan.cod_programa,
	        indicativo.tbl_ejec_finan_plan.cod_dependencia,
	        plan_accion.tbl_exec_financiera.cod_proyecto,
	        plan_accion.tbl_exec_financiera.nom_proyecto,
	        plan_accion.tbl_exec_financiera.ejec_financiera,
	        plan_accion.tbl_exec_fisica.porc_eficacia_proyecto,
	        plan_accion.tbl_exec_financiera.poai,
	        plan_accion.tbl_exec_financiera.ppto_ajustado,
	        plan_accion.tbl_exec_financiera.ejecucion,
	        plan_accion.tbl_exec_financiera.compromisos,
	        plan_accion.tbl_exec_financiera.pagos,
	        plan_accion.tbl_exec_financiera.facturas,
	        plan_accion.tbl_exec_financiera.num_valstat,
	        plan_accion.tbl_exec_financiera.tipo_proyecto,
	        plan_accion.tbl_exec_financiera.corte
        FROM plan_accion.tbl_exec_fisica
        LEFT JOIN plan_accion.tbl_exec_financiera ON tbl_exec_financiera.cod_proyecto = tbl_exec_fisica.cod_proyecto
        LEFT JOIN indicativo.tbl_ejec_finan_plan ON indicativo.tbl_ejec_finan_plan.cod_proyecto = tbl_exec_financiera.cod_proyecto
        WHERE plan_accion.tbl_exec_financiera.cod_proyecto=$1
        GROUP BY 
            indicativo.tbl_ejec_finan_plan.cod_linea,
	        indicativo.tbl_ejec_finan_plan.cod_componente,
	        indicativo.tbl_ejec_finan_plan.cod_programa,
	        indicativo.tbl_ejec_finan_plan.cod_dependencia,
	        plan_accion.tbl_exec_financiera.cod_proyecto,
	        plan_accion.tbl_exec_financiera.nom_proyecto,
	        plan_accion.tbl_exec_financiera.ejec_financiera,
	        plan_accion.tbl_exec_fisica.porc_eficacia_proyecto,
	        plan_accion.tbl_exec_financiera.poai,
	        plan_accion.tbl_exec_financiera.ppto_ajustado,
	        plan_accion.tbl_exec_financiera.ejecucion,
	        plan_accion.tbl_exec_financiera.compromisos,
	        plan_accion.tbl_exec_financiera.pagos,
	        plan_accion.tbl_exec_financiera.facturas,
	        plan_accion.tbl_exec_financiera.num_valstat,
	        plan_accion.tbl_exec_financiera.tipo_proyecto,
	        plan_accion.tbl_exec_financiera.corte
        ORDER BY 
            indicativo.tbl_ejec_finan_plan.cod_linea,
	        indicativo.tbl_ejec_finan_plan.cod_componente,
	        indicativo.tbl_ejec_finan_plan.cod_programa,
	        indicativo.tbl_ejec_finan_plan.cod_dependencia,
	        plan_accion.tbl_exec_financiera.cod_proyecto,
	        plan_accion.tbl_exec_financiera.nom_proyecto,
	        plan_accion.tbl_exec_financiera.ejec_financiera,
	        plan_accion.tbl_exec_fisica.porc_eficacia_proyecto,
	        plan_accion.tbl_exec_financiera.poai,
	        plan_accion.tbl_exec_financiera.ppto_ajustado,
	        plan_accion.tbl_exec_financiera.ejecucion,
	        plan_accion.tbl_exec_financiera.compromisos,
	        plan_accion.tbl_exec_financiera.pagos,
	        plan_accion.tbl_exec_financiera.facturas,
	        plan_accion.tbl_exec_financiera.num_valstat,
	        plan_accion.tbl_exec_financiera.tipo_proyecto,
	        plan_accion.tbl_exec_financiera.corte
        `, [cod_proyecto]);
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
            data: response.rows
        })

        
    } catch (error) {
        console.error('ERROR GETPROYECTOBOT:'. error);
        
    }
}



const getTerritorioBot = async (req, res)=>{
    try {
        const cod_territorio = req.params.cod_territorio;
        const response = await pool.query(`
        select 
            territorio.tbl_comuna.cod_comuna,territorio.tbl_comuna.nom_comuna,
            localizada,ciudad,pp,total    
        from inverpublica.tbl_tipoinver_geo 
        LEFT JOIN  territorio.tbl_comuna ON territorio.tbl_comuna.cod_comuna = inverpublica.tbl_tipoinver_geo.cod_comuna
        where inverpublica.tbl_tipoinver_geo.cod_comuna =$1`, [cod_territorio])
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
            data: response.rows
        })

    } catch (error) {
        console.error("Error getTerritorioBot: ", error);
        
    }
}

const getDependenciaBot = async(req, res)=>{
    try {
        const cod_dependencia= req.params.cod_dependencia;
        const response = await pool.query(` select * from dependencias.sp_bot_dep($1)`,[cod_dependencia]);
        res.status(200). json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
            data: response.rows
        })

    } catch (error) {
        console.error('Error getDependenciaBot: ', error);
        
    }
}

module.exports= { 
    getValStatBot, getProyectoBot, getTerritorioBot, getDependenciaBot
}