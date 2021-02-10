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
           
            data: response.rows
        })
    } catch (error) {
        console.log('Error getAvanceDepPDM: ', error)
    }
}
const getAvancePDMxDEpendencias = async(req, res)=>{
    try {
        const response = await pool.query(`
        select 
	        cod_responsable_reporte,
	        nombre_dep,
	        sum(pesoxavnt) as avance,sum(peso) as peso
            from indicativo.tbl_indicador
            LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
            group by  cod_responsable_reporte, nombre_dep
            order by  cod_responsable_reporte`)
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
        console.log('Error getAvancePDMxDEpendencias ', error)
    }
}

const getAvancePDMxLineasDep = async(req, res)=>{
    try {
        const dependencia = req.params.cod_dependencia;
        const response = await pool.query(`
        select 
	        cod_responsable_reporte,cod_linea,nom_linea, sum(pesoxavnt) as avance,sum(peso) as peso
        from indicativo.tbl_indicador
        LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
        where cod_responsable_reporte=$1
        group by  cod_responsable_reporte, cod_linea, nom_linea
        order by  cod_responsable_reporte
        `, [dependencia])
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
        console.log('ERROR  getAvancePDMxLineasDep', error)
    }
}


const getAvancePDMxComponentesDep = async(req, res)=>{
    try {
        const dependencia = req.params.cod_dependencia;
        const response = await pool.query(`
        select 
            cod_responsable_reporte,cod_componente,nom_componente,sum(pesoxavnt) as avance,sum(peso) as peso
        from indicativo.tbl_indicador
        LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
        where cod_responsable_reporte=$1
        group by cod_responsable_reporte, nombre_dep , cod_componente, nom_componente
        order by cod_responsable_reporte
        `, [dependencia])
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
        console.log('ERROR  getAvancePDMxComponentesDep', error)
    }
}

const getAvancePDMxProgramasDep = async(req, res)=>{
    try {
        const dependencia = req.params.cod_dependencia;
        const response = await pool.query(`
        select 
            cod_responsable_reporte,cod_programa,nom_programa,sum(pesoxavnt) as avance,sum(peso) as peso
        from indicativo.tbl_indicador
        LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
        where cod_responsable_reporte=$1 and cod_programa<>'0'
        group by   cod_responsable_reporte,cod_programa,nom_programa
        order by  cod_responsable_reporte
        `, [dependencia])
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
        console.log('ERROR  getAvancePDMxComponentesDep', error)
    }
}


module.exports={ getDependencias , getAvanceDepPDM, getAvancePDMxDEpendencias,
     getAvancePDMxLineasDep, getAvancePDMxComponentesDep, getAvancePDMxProgramasDep
    }    