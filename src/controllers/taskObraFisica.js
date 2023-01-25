const { local_pool } = require('../sql/dbConfig');

const getTotalesOF = async (req, res)=>{
    try {
        const response = await local_pool.query(`select sum(valor_total_acumulado)as total_inversion, count(cod_unico_obra) as total_obras, corte from obra_fisica.tbl_obra_fisica group by corte`);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            
            data: response.rows
        });
      
        
    } catch (error) {
        console.error('Error getAvanceFisico ', error)
    }
}


const getAlertasOF = async (req, res)=>{
    try {
        const response = await local_pool.query(`select cod_alerta, alerta, count(cod_alerta) as total_alerta from obra_fisica.tbl_obra_fisica  group by cod_alerta, alerta  order by cod_alerta`);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        });
      
        
    } catch (error) {
        console.error('Error getAvanceFisico ', error)
    }
}


const getEtapasOF = async(req, res)=>{
    try {
        const response= await local_pool.query(`select cod_etapa, etapa, count(cod_etapa) as total_etapa from obra_fisica.tbl_obra_fisica group by cod_etapa, etapa order by cod_etapa`)
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getEtpaOF: ',error);
        
    }
}

const getTemasOF = async(req, res)=>{
    try {
        const response= await local_pool.query(`select cod_tematica, tematica, count (cod_tematica) as total_tematica from obra_fisica.tbl_obra_fisica group by cod_tematica, tematica order by cod_tematica`)
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getTemasOF: ',error);
        
    }
}

const getIntervencionOF = async(req, res)=>{
    try {
        const response= await local_pool.query(`select cod_intervencion, tipo_intervencion, count(cod_intervencion) as Total_intervencion from obra_fisica.tbl_obra_fisica group by cod_intervencion, tipo_intervencion order by cod_intervencion`)
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getItervencionOF: ',error);
        
    }
}

const getTotalOFDep = async(req, res)=>{
    try {
        const response= await local_pool.query(`
            select obra_fisica.tbl_obra_fisica.cod_dep,
        	    dependencias.tbl_dependencias.nom_cortp,count (cod_unico_obra) total 
            FROM obra_fisica.tbl_obra_fisica
            LEFT JOIN dependencias.tbl_dependencias ON tbl_dependencias.cod_dep = obra_fisica.tbl_obra_fisica.cod_dep
            group by obra_fisica.tbl_obra_fisica.cod_dep, dependencias.tbl_dependencias.nom_cortp order by  obra_fisica.tbl_obra_fisica.cod_dep`)
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getTotalOFDep: ',error);
        
    }
}

const getTotalDepOF = async(req, res)=>{
    try {
        const dependencia = req.params.cod_dep;
        const response= await local_pool.query(`select sum(valor_total_acumulado) as total_dep, corte from obra_fisica.tbl_obra_fisica where cod_dep=$1 group by corte`, [dependencia])
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getTotalDepOF: ', error);
        
    }
}

const getIntervencionDepOF = async(req, res)=>{
    try {
        const dependencia = req.params.cod_dep;
        const response= await local_pool.query(`select cod_intervencion, tipo_intervencion, count(cod_intervencion) as Total_intervencion from obra_fisica.tbl_obra_fisica  where cod_dep=$1 group by cod_intervencion, tipo_intervencion order by cod_intervencion`, [dependencia])
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getIntervencionDepOF: ', error);
        
    }
}


const getAlertaDepOF= async (req, res)=>{
    try {
        const dependencia = req.params.cod_dep;
        const response= await local_pool.query(` select cod_alerta, alerta, count(cod_alerta) as total_alerta from obra_fisica.tbl_obra_fisica  where cod_dep=$1  group by cod_alerta, alerta  order by cod_alerta`, [dependencia])
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getAlertaDepOF: ', error);
        
    }
}


const getEtapaDepOF= async (req, res)=>{
    try {
        const dependencia = req.params.cod_dep;
        const response= await local_pool.query(`select cod_etapa, etapa, count(cod_etapa) as total_etapa from obra_fisica.tbl_obra_fisica where cod_dep=$1 group by cod_etapa, etapa order by cod_etapa`, [dependencia])
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getAlertaDepOF: ', error);
        
    }
}


const getHitosSIFOF= async (req, res)=>{
    try {
        
        const response= await local_pool.query(`select cod_hito,hito, count(cod_hito) as total_hito from obra_fisica.tbl_obra_fisica where cod_dep=741 and cod_hito >0 group by cod_hito, hito order by cod_hito`)
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getAlertaDepOF: ', error);
        
    }
}

const getGeoOF = async(req, res)=>{
    try {
        const response= await local_pool.query(`
        select 
            territorio.tbl_comuna.cod_comuna, 
            territorio.tbl_comuna.nom_comuna,
            count(cod_unico_obra) as obras 
        from obra_fisica.tbl_obra_fisica 
        LEFT JOIN territorio.tbl_comuna ON territorio.tbl_comuna.cod_comuna= obra_fisica.tbl_obra_fisica.cod_comuna
        group by territorio.tbl_comuna.cod_comuna order by cod_comuna`);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getGeoOF: ', error);
        
    }
}

const getGeoDepOF= async(req, res)=>{
    try {
        const comuna = req.params.cod_comuna;
        const response= await local_pool.query(` 
            select 
                dependencias.tbl_dependencias.cod_dep,
                dependencias.tbl_dependencias.nom_cortp,
                count(cod_unico_obra) num_obras
            from obra_fisica.tbl_obra_fisica
            left join dependencias.tbl_dependencias ON  tbl_dependencias.cod_dep = obra_fisica.tbl_obra_fisica.cod_dep
            where cod_comuna= $1
            group by 	dependencias.tbl_dependencias.cod_dep,	dependencias.tbl_dependencias.nom_cortp
            order by 	dependencias.tbl_dependencias.cod_dep`, [comuna]);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error ');
    }
}

const getGeoAlertaOF = async (req, res)=>{
    try {
        const comuna = req.params.cod_comuna;
        const response = await local_pool.query(`  
        select cod_alerta, alerta, count(cod_alerta) as total_alerta, corte from obra_fisica.tbl_obra_fisica where cod_comuna=$1  group by cod_alerta, alerta, corte  order by cod_alerta`,[comuna]);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error  getGeoAlertaOF', error);
        
    }
}


const getGeoIntervencionOF= async(req, res)=>{
    try {
        const comuna= req.params.cod_comuna;
        const response= await local_pool.query(` 
        select cod_intervencion, tipo_intervencion, count(cod_intervencion) as Total_intervencion from obra_fisica.tbl_obra_fisica where cod_comuna=$1 group by cod_intervencion, tipo_intervencion order by cod_intervencion`,[comuna]);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
            data: response.rows
        })
    } catch (error) {
        console.error('Error getGeoIntervencionOF: ', error);
        
    }
}

const getDepOFTerritorio = async (req, res)=>{
    const dep= req.params.cod_dep;
    const response = await local_pool.query(`
    select
    obra_fisica.tbl_obra_fisica.cod_comuna, 
    territorio.tbl_comuna.nom_comuna,
    count (obra_fisica.tbl_obra_fisica.cod_comuna) as tot_obra
    from obra_fisica.tbl_obra_fisica
    left join territorio.tbl_comuna  on obra_fisica.tbl_obra_fisica.cod_comuna= territorio.tbl_comuna.cod_comuna
    where cod_dep=$1
    group by obra_fisica.tbl_obra_fisica.cod_comuna,territorio.tbl_comuna.nom_comuna  order by obra_fisica.tbl_obra_fisica.cod_comuna`, [dep])
    res.status(200).json({
        Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
        Version: '1.0',
        Datos_Contacto:'Gabriel vasco Ayala - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
        eMail_Contacto: 'gabirel.vasco@medellin.gov.co',
        data: response.rows
    })
}

module.exports ={  getTotalesOF , getAlertasOF, getEtapasOF, getTemasOF, getIntervencionOF, getTotalOFDep , getTotalDepOF , getIntervencionDepOF, getAlertaDepOF, getEtapaDepOF ,
     getHitosSIFOF, getGeoOF, getGeoDepOF, getGeoAlertaOF, getGeoIntervencionOF, getDepOFTerritorio};