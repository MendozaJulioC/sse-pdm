

const { pool } = require('../sql/dbConfig');


const getTotales = async (req, res) =>{
    try{
        const response =  await pool.query ('select * from inverpublica.view_resumen ');
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
            Def: "Suma totales por año y tipo de inversión pública del Municipio d Medellín",
            data: response.rows
        });
    }catch(e){ 
        console.log(e);
    }

}

const getCuatrienio = async (req , res)=>{
    try{
        const response = await pool.query('select * from inverpublica.sp_cuatrienios()');
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
            Def:     "Totales última tres administraciones del Municipio de Medellín",
            data: response.rows
         });
    }
    catch(e){ 
        console.log(e);
    }
   
}

const getCuatriCompare= async (req, res)=>{
    try{
        //recibe dos valores el año incial al año final
        const { vigencia1, vigencia2 } = req.body;
        const response = await pool.query('select * from inverpublica.sp_cuatrienios_compare($1, $2)', [vigencia1, vigencia2]);
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
            Def:     "Comparación entre rangos de vigencias (Cuatrienios- Municipio de Medellín)",
            data: response.rows
        });
    }catch(e){ 
        console.log(e);
    }
   
}

const getCuatriComuna = async(req, res)=>{
    try {
        const response = await pool.query('select * from inverpublica.mview_comuna_total_Cuatrienio');
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
            Def:     "Total cuatrienios por comunas",
            data: response.rows
        });

        
    } catch (error) {
        console.log(e);
    }
}


const getCuatrienioDetalleComuna= async (req, res)=>{
    try{
        //recibe dos valores el año incial al año final
        const comuna = req.params.cod_comuna;
        const response = await pool.query('select * from inverpublica.mview_cuatrienio_detalle where cod_comuna = $1', [comuna]);
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
            Def:     "Total por tipo de inversión por cuatrienios de la comuna seleccionada (Cuatrienios- Municipio de Medellín)",
            data: response.rows
        });
    }catch(e){ 
        console.log(e);
    }
   
}


module.exports= {    getTotales, getCuatrienio, 
                    getCuatriCompare, getCuatriComuna ,
                    getCuatrienioDetalleComuna
                
                }