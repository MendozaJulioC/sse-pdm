const { pool } = require('../sql/dbConfig');


const getComuna = async (req, res) =>{
   
    try{
        //const comuna = req.params.comuna;
        const {comuna} = req.body;
        const response =  await pool.query ('select * from inverpublica.sp_total_comuna( $1 ) ', [comuna]);
        res.status(200).json({
            Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
            Fecha_Emision:"2020-04-15",
            Fecha_Inicial:"2004-12-31",
            Fecha_Final:"2019-12-31",
            Frecuencia_actualizacion:"Anual",
            Version: "1.0",
            Cobertura:"Municipio de Medelín",
            Fecha_ultima__actualizacion:"2020-01-30",
            Datos_Contacto:"Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272",
            eMail_Contacto: "julio.mendoza@medellin.gov.co",
            Def: "Totales desde el año 2004 al 2019 de la inversión pública del Municipio d Medellín en la comuna consultada",
            data: response.rows
        });
    }catch (error) {
        console.log(error);
    }
}


const getComunaVigencia = async (req, res)=>{

    try {
        const { comuna , vigencia } = req.body;
        const response = await pool.query (' select * from inverpublica.sp_inversion_comuna_year( $1 , $2) ',[ comuna, vigencia] );
        res.status(200).json({
            Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
            Fecha_Emision:"2020-04-15",
            Fecha_Inicial:"2004-12-31",
            Fecha_Final:"2019-12-31",
            Frecuencia_actualizacion:"Anual",
            Version: "1.0",
            Cobertura:"Municipio de Medelín",
            Fecha_ultima__actualizacion:"2020-01-30",
            Datos_Contacto:"Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272",
            eMail_Contacto: "julio.mendoza@medellin.gov.co",
            Def: "Total de la inversión pública en la comuna y año consultado  del Municipio d Medellín",
            data: response.rows
        });
        
    } catch (error) {
        console.log(error)
        
    }
}


const getComunaDep= async(req, res)=>{
    try {
       const {comuna}= req.body;
       const response = await pool.query(' select * from inverpublica.sp_comuna_dependencias($1)', [comuna]);
       res.status(200).json({
        Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
        Fecha_Emision:"2020-04-15",
        Fecha_Inicial:"2004-12-31",
        Fecha_Final:"2019-12-31",
        Frecuencia_actualizacion:"Anual",
        Version: "1.0",
        Cobertura:"Municipio de Medelín",
        Fecha_ultima__actualizacion:"2020-01-30",
        Datos_Contacto:"Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272",
        eMail_Contacto: "julio.mendoza@medellin.gov.co",
        Def: "Total de la inversión pública en la comuna consultados detallando las diferentes dependencias del Municipio d Medellín",
        data: response.rows
    });
    } catch (error) {
        console.log(error)
    }

}

module.exports= {
    getComuna,
    getComunaVigencia,
    getComunaDep

}