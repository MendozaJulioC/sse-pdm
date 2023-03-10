// todas las rutas, tareas y consultas que tengan como eje principal las líneas del plan de desarrollo municipal

const { local_pool, aws_pool } = require('../sql/dbConfig');

const getLineTotalComp = async(req, res)=>{
    try {
        
        const {cod_linea } = req.body;
        const response = await aws_pool.query(`
            select  cod_linea, nom_linea, cod_componente, nom_componente, count(cod_componente) as total_ind 
            from indicativo.tbl_indicador where cod_linea= $1
            group by  cod_linea, nom_linea, cod_componente, nom_componente 
            order by cod_componente
        `,  [cod_linea]);

        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendoza@medellin.gov.co',
           
            data: response.rows
          });   

    } catch (error) {
        console.log('Error getLineTotalComp',error)
    }
}


const getLineTotalProg = async(req, res)=>{
    try {
        const {cod_linea}= req.body;
        const response = await aws_pool.query(`
        select  cod_linea, nom_linea,cod_componente,nom_componente,cod_programa, nom_programa,count(cod_programa) as total_ind 
        from indicativo.tbl_indicador where cod_linea=$1 and cod_programa<>'0'
        group by  cod_linea, nom_linea, cod_componente, nom_componente, cod_programa, nom_programa
        order by cod_programa
        `, [cod_linea]);

        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendoza@medellin.gov.co',
           
            data: response.rows
          });   

    } catch (error) {
        console.log('Error getLineTotalProg',error) 
    }
}


const getLineIndicadores= async (req, res)=>{

    try {
        const codlinea = req.params.cod_linea;
    
        const response = await aws_pool.query(`
        select 
		logro_acumulado,
		avance_cuatrienio,
		cod_linea, 
 		nom_linea, 
		cod_componente,
		nom_componente,  
		cod_programa,
		nom_programa,
		indicativo.tbl_indicador.cod_indicador,
		indicativo.tbl_indicador.nom_indicador,
		defincion,
		objetivo,
		normativa,
		tipo_ind,
		meta_plan,
		unidad, 
		sentido,
		comportamiento_deseado,fc,
		lb_ind,incluye_lb,
		vigencia_lb,tipo_lb,
		peso,periocidad_generacion,
		formula_indicador,
		variable_operativa,
		meta_2020,logro_2020,cumple_2020,
		meta_2021,logro_2021,cumple_2021,
		meta_2022,logro_2022,cumple_2022,
		meta_2023,logro_2023,cumple_2023,
		fuente,
		tipo_fuente,
		responsable_plan,
		cod_responsable_reporte,
		nombre_dep,
		responsable_reporte,
		instrumento_recoleccion,
		observaciones
		from indicativo.tbl_indicador
		LEFT JOIN indicativo.tbl_ficha_indicador ON indicativo.tbl_ficha_indicador.cod_indicador = indicativo.tbl_indicador.cod_indicador  
		LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
		where cod_linea=$1
        `, [codlinea]);

        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendoza@medellin.gov.co',
           
            data: response.rows
          });   
        
    } catch (error) {
        console.log('Error getLineIndicadores',error) 
    }
}
const getAvanceLinea= async(req, res)=>{
    try {
        const codlinea = req.params.cod_linea;
        const response = await aws_pool.query(`
        select cod_linea, nom_linea, sum((total_plan/peso_linea)*100) from indicativo.view_avance  where cod_linea=$1 group by cod_linea, nom_linea`, [codlinea]);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendoza@medellin.gov.co',
        
            data: response.rows
        });

    } catch (error) {
        console.log('Error getAvanceLinea: ',error)
    }
}

const getLineIndResumen= async(req, res)=>{
    try {
        const codlinea = req.params.cod_linea;
        const response = await aws_pool.query(` select
        cod_linea, 
                cod_componente,
                cod_programa,
                indicativo.tbl_indicador.cod_indicador,
                indicativo.tbl_indicador.nom_indicador,
                tipo_ind, lb_ind, meta_plan,unidad, 
               pesoxavnt, peso,
				semafav,
                cod_responsable_reporte,
                nombre_dep
    from indicativo.tbl_indicador
    LEFT JOIN indicativo.tbl_ficha_indicador ON indicativo.tbl_ficha_indicador.cod_indicador = indicativo.tbl_indicador.cod_indicador  
    LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
    where cod_linea=$1 and tipo_ind='Producto'
    group by 
        cod_linea, cod_componente,cod_programa,indicativo.tbl_indicador.cod_indicador,indicativo.tbl_indicador.nom_indicador,
        tipo_ind, lb_ind, meta_plan,unidad, logro_2020,cod_responsable_reporte,nombre_dep
    order by indicativo.tbl_indicador.cod_indicador
                `,
        [codlinea]);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Trimestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendoza@medellin.gov.co',
           
            data: response.rows
        });

    } catch (error) {
        console.log('Error getAvanceLinea: ',error)
    }
}
 const getSemafavLinea =  async(req, res)=>{
     try {
         
        const codlinea = req.params.cod_linea;
         const response = await aws_pool.query(`select * from indicativo.sp_total_semaforo_linea($1)`, [codlinea])
         res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendoza@medellin.gov.co',
          
            data: response.rows
          });   
     } catch (error) {
         console.error('Error getSemafavLinea ', error)
     }
 }

 const getEjecFinLinea =  async(req, res)=>{
    try {
       const codlinea = req.params.cod_linea;
        const response = await aws_pool.query(`select  sum(ppto_ajustado) as pptoajustado, sum(ejecutado) as ejecutado 
                        from indicativo.tbl_ejec_finan_plan where cod_linea=$1`, [codlinea])
        res.status(200).json({
           Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
           Fecha_Emision:'2020-08-30',
           Fecha_Inicial:'2020-01-31',
           Fecha_Final:'2023-12-31',
           Frecuencia_actualizacion:'Semestral',
           Version: '1.0',
           Cobertura:'Municipio de Medelín',
           Fecha_ultima__actualizacion:'2020-08-30',
           Datos_Contacto:'Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
           eMail_Contacto: 'julio.mendoza@medellin.gov.co',
          
           data: response.rows
         });   
    } catch (error) {
        console.error('Error getEjecFinLinea ', error)
    }
}




module.exports={ getLineTotalComp, getLineTotalProg, getLineIndicadores, getAvanceLinea,
                 getLineIndResumen, getSemafavLinea , getEjecFinLinea}    