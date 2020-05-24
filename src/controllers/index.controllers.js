

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

//ojo: cambiar la consulta de esta función por la nueva mviwe que contiene el dato de percapita
//reevaluar esa mview en la base de datos

const getCuatrienioDetalleComuna= async (req, res)=>{
    try{
        //recibe dos valores el año incial al año final
        const comuna = req.params.cod_comuna;
        const response = await pool.query('select * from inverpublica.mview_detalle_inversion_cuatrienios where cod_comuna = $1', [comuna]);
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

const getDetalleAlonso= async (req, res)=>{
    try{
        //recibe dos valores el año incial al año final
       
        const response = await pool.query(process.env.sqlAlonso);
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
            Def:     "Total por tipo de inversión en las comunas en el cuatrienio 2008-2011 - Municipio de Medellín)",
            variables: [
                {
                    id:"cod_comuna",
                    type:"integer",
                    contenido:"Código de la comuna a la cual pertenece la inversión"
                },
                {
                    id:"localizada2008_2011",
                    type:"numeric",
                    contenido:"La sumatoria de la inversión localizada desde el 2008-2011"
                },
                {
                    id:"percapita2008_2011",
                    type:"numeric",
                    contenido:"La sumatoria del producto del número de población de cada comuna por el total de inversión de ciudad de los años 2008-2011"
                },
                {
                    id:"pp2008_2011",
                    type:"numeric",
                    contenido:"La sumatoria de la inversión por presupuesto participativo de los años 2008-2011"
                },
                {   
                    id:"total_alonso",
                    type:"numeric",
                    contenido:"La sumatoria de los diferentes tipos de inversión en cada comuna de los años 2008-2011"
                }
            ] ,
            data: response.rows
        });
    }catch(e){ 
        console.log(e);
    }
   
}

const getDetalleAnibal= async (req, res)=>{
    try{
        //recibe dos valores el año incial al año final
        const response = await pool.query(process.env.sqlAnibal);
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
            Def:     "Total por tipo de inversión en las comunas en el cuatrienio 2012-2015 - Municipio de Medellín)",
            variables: [
                {
                    id:"cod_comuna",
                    type:"integer",
                    contenido:"Código de la comuna a la cual pertenece la inversión"
                },
                {
                    id:"localizada2012_2015",
                    type:"numeric",
                    contenido:"La sumatoria de la inversión localizada desde el 2012 al 2015"
                },
                {
                    id:"percapita2012_2015",
                    type:"numeric",
                    contenido:"La sumatoria del producto del número de población de cada comuna por el total de inversión de ciudad de los años  2012 al 2015"
                },
                {
                    id:"pp2012_2015",
                    type:"numeric",
                    contenido:"La sumatoria de la inversión por presupuesto participativo de los años 2012 al 2015"
                },
                {   
                    id:"total_anibal",
                    type:"numeric",
                    contenido:"La sumatoria de los diferentes tipos de inversión en cada comuna de los años 2012 al 2015"
                }
            ],
            data: response.rows
        });
    }catch(e){ 
        console.log(e);
    }
}
const getDetalleFico= async (req, res)=>{
    try{
        //recibe dos valores el año incial al año final
        const response = await pool.query(process.env.sqlFico);
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
            Def:     "Total por tipo de inversión en las comunas en el cuatrienio 2016-2019 - Municipio de Medellín)",
            variables: [
                {
                    id:"cod_comuna",
                    type:"integer",
                    contenido:"Código de la comuna a la cual pertenece la inversión"
                },
                {
                    id:"localizada2016_2019",
                    type:"numeric",
                    contenido:"La sumatoria de la inversión localizada desde el 2016-2019"
                },
                {
                    id:"percapita2016_2019",
                    type:"numeric",
                    contenido:"La sumatoria del producto del número de población de cada comuna por el total de inversión de ciudad de los años 2016-2019"
                },
                {   
                    id:"pp2016_2019",
                    type:"numeric",
                    contenido:"La sumatoria de la inversión por presupuesto participativo de los años 2016-2019"
                },
                {   
                    id:"total_fico",
                    type:"numeric",
                    contenido:"La sumatoria de los diferentes tipos de inversión en cada comuna de los años 2016-2019"
                }
            ],
            data: response.rows
        });
    }catch(e){ 
        console.log(e);
    }
}

module.exports= {   
                    getTotales, getCuatrienio, 
                    getCuatriCompare, getCuatriComuna ,
                    getCuatrienioDetalleComuna,
                    getDetalleAlonso, getDetalleAnibal,
                    getDetalleFico
                
                }