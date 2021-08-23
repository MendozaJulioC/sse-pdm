
const { pool } = require('../sql/dbConfig');

const getIndicador = async(req, res)=>{
    try {

        const indicador = req.params.cod_indicador;
        const response = await pool.query(`
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
		observaciones, peso, pesoxavnt, observaciones_indicador, avnorm
		from indicativo.tbl_indicador
		LEFT JOIN indicativo.tbl_ficha_indicador ON indicativo.tbl_ficha_indicador.cod_indicador = indicativo.tbl_indicador.cod_indicador  
		LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
		where indicativo.tbl_indicador.cod_indicador=$1
        `,  [indicador]);

        res.status(200).json({
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
          });   

        
    } catch (error) {
        console.log('Error getIndicador: '),error
    }
}
 const getListIndicador = async(req, res)=>{
     try {
        const response = await pool.query(`select cod_indicador, nom_indicador from indicativo.tbl_indicador order by nom_indicador`);
        res.status(200).json({
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
         console.log('Error getListIndicador', error)
     }
 }

const getBuscaNombreIndicador= async(req, res)=>{
    try {

        const nombreIndicador = req.params.nom_indicador;
        const response = await pool.query(`
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
		observaciones, pesoxavnt, observaciones_indicador, avnorm
		from indicativo.tbl_indicador
		LEFT JOIN indicativo.tbl_ficha_indicador ON indicativo.tbl_ficha_indicador.cod_indicador = indicativo.tbl_indicador.cod_indicador  
		LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
		where indicativo.tbl_indicador.nom_indicador=$1
		
		
		`, [nombreIndicador]);
        res.status(200).json({
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
        console.log('Error getBuscaNombreIndicador')
    }
}


const getGeneralPI = async (req, res)=>{
	try {
		const response = await pool.query(`select * from indicativo.tbl_avance_cumple_pdm`);
		res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
            data: response.rows
          });   



	} catch (error) {
		console.error('Error getGeneralPI: ', error);
		
	}
}

const getGeneralLineasPI= async (req, res)=>{
	try {
		const response = await pool.query(`select * from indicativo.tbl_comportamiento_lineas`)
		res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
            data: response.rows
          });   

	} catch (error) {
		console.error('Error getGeneralLineasPI');
		
	}
}

const getIndicadorBot = async(req, res)=>{
    try {

        const indicador = req.params.cod_indicador;
        const response = await pool.query(`
        select 
			avance_cuatrienio,
	        indicativo.tbl_indicador.cod_indicador,
		    indicativo.tbl_indicador.nom_indicador,
		    defincion,
		    objetivo,
		    tipo_ind,
		    meta_plan,
		    unidad, 
		    sentido,
		    lb_ind,
		    responsable_plan,observaciones,
		    semafav
		    from indicativo.tbl_indicador
		LEFT JOIN indicativo.tbl_ficha_indicador ON indicativo.tbl_ficha_indicador.cod_indicador = indicativo.tbl_indicador.cod_indicador  
		LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
		where indicativo.tbl_indicador.cod_indicador=$1
        `,  [indicador]);

        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
            data: response.rows
        });   
    } catch (error) {
        console.log('Error getIndicador: '),error
    }
}
module.exports = {getIndicador, getListIndicador, getBuscaNombreIndicador, getGeneralPI, getGeneralLineasPI, getIndicadorBot} 