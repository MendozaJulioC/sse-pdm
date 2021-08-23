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

}


module.exports= { 
    getValStatBot, getProyectoBot
}