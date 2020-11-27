const { pool } = require('../sql/dbConfig');



const getTipoInversion = async (req, res)=>{
    try {
        const response = await pool.query(`select * from inverpublica.sp_ciudad_fortinst()`);
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
            Def: 'Listado de los Indicadoes del Plan de Desarrollo Medellín Futuro PDM 2020-2023',
            data: response.rows
        });
      
        
    } catch (error) {
        console.error('Error getTipoInversion ', error)
    }
}

const getInverTerritorio = async(req, res)=>{
    try {
        const response = await pool.query(`
            select    
 		        sum(c1) as Popular,
		        sum(c2) as Santa_Cruz,
		        sum(c3) as Manrique,
		        sum(c4) as Aranjuez,
		        sum(c5) as Castilla,
		        sum(c6) as Doce_de_Octubre,
		        sum(c7) as Robledo,
		        sum(c8) as Villa_Hermosa,
		        sum(c9) as Buenos_Aires,
		        sum(c10) as La_Candelaria,
		        sum(c11) as Laureles_Estadio,
		        sum(c12) as La_America,
		        sum(c13) as San_Javier,
		        sum(c14) as El_Poblado,
		        sum(c15) as Guayabal,
		        sum(c16) as Belen,
		        sum(c50) as Palmitas,
		        sum(c60) as San_Cristobal,
		        sum(c70) as Altavista,
		        sum(c80) as San_Antonio,
		        sum(c90) as Santa_Elena,
		        sum(c99) as Ciudad,
		        sum(c97) as Fort_Inst
            from inverpublica.tbl_consolidado
        
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
            Datos_Contacto:'Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendoza@medellin.gov.co',
            Def: 'Listado de los Indicadoes del Plan de Desarrollo Medellín Futuro PDM 2020-2023',
            data: response.rows
        });


        
    } catch (error) {
        console.log('Error getInverTerritorio: ', error)
    }
}

const getInversionDep =  async(req, res)=>{
    try {
        const response = await pool.query(`
            select * from inverpublica.view_total_dep
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
            Datos_Contacto:'Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendoza@medellin.gov.co',
            Def: 'Listado de los Indicadoes del Plan de Desarrollo Medellín Futuro PDM 2020-2023',
            data: response.rows
        });
    } catch (error) {
        console.log('Error getInversionDep: ', error)
    }

}

const tipo_inversion_dep = async (req, res)=>{
    try {
        const dep =   req.params.cod_dependencia;
     
        const response = await pool.query(` 
        select * from inverpublica.sp_tipoinversion_dep($1)`,[dep]);
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
            Def: 'Listado de los Indicadoes del Plan de Desarrollo Medellín Futuro PDM 2020-2023',
            data: response.rows
        }); 


    } catch (error) {
        console.log('Error tipo_inversion_dep', error)
    
    }
}


const getInverTerritorioDep = async(req, res)=>{
    try {
        const dep =   req.params.cod_dependencia;
        const response = await pool.query(`
            select    
 		        sum(c1) as Popular,
		        sum(c2) as Santa_Cruz,
		        sum(c3) as Manrique,
		        sum(c4) as Aranjuez,
		        sum(c5) as Castilla,
		        sum(c6) as Doce_de_Octubre,
		        sum(c7) as Robledo,
		        sum(c8) as Villa_Hermosa,
		        sum(c9) as Buenos_Aires,
		        sum(c10) as La_Candelaria,
		        sum(c11) as Laureles_Estadio,
		        sum(c12) as La_America,
		        sum(c13) as San_Javier,
		        sum(c14) as El_Poblado,
		        sum(c15) as Guayabal,
		        sum(c16) as Belen,
		        sum(c50) as Palmitas,
		        sum(c60) as San_Cristobal,
		        sum(c70) as Altavista,
		        sum(c80) as San_Antonio,
		        sum(c90) as Santa_Elena,
		        sum(c99) as Ciudad,
		        sum(c97) as Fort_Inst
            from inverpublica.tbl_consolidado
            where cod_dependencia = $1`,
        [dep])
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
            Def: 'Listado de los Indicadoes del Plan de Desarrollo Medellín Futuro PDM 2020-2023',
            data: response.rows
        });


        
    } catch (error) {
        console.log('Error getInverTerritorio: ', error)
    }
}

module.exports ={ getTipoInversion, getInverTerritorio, getInversionDep, tipo_inversion_dep, getInverTerritorioDep} ;