const { pool } = require('../sql/dbConfig');

const getDependencias= async(req, res)=>{
    try{
        const response =  await pool.query (' select * from dependencias.tbl_dependencias where cod_dep>700 and cod_dep<> 908 order by cod_dep');
        res.json({
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
            Def: "Total de cada vigencia",
            data: response.rows
        });
    }catch(e){ 
        console.log(e);
    }
 
}


const getQueryDep = async(req, res)=>{
    try {
        const cod_dep = parseInt(req.params.cod_dep);
        const response =  await pool.query (`select * from inverpublica.sp_dependencia($1)`, [cod_dep]);
        res.json({
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
            Def: "Total de cada vigencia",
            data: response.rows
        });
    } catch (error) {
        console.log(error)
    }
}

 const postDepVigencia = async(req, res)=>{
     try {
         
        const { dep, vigencia } = req.body;
        const response =  await pool.query (`select 
        territorio.tbl_comuna.cod_comuna,
        territorio.tbl_comuna.nom_corto_comuna,
        sum(inversion) as total  
        FROM territorio.tbl_comuna
        LEFT JOIN inverpublica.tbl_estructurado  ON tbl_comuna.cod_comuna = inverpublica.tbl_estructurado.comuna
        where cod_dep_actual= $1 and ano= $2
        group by  territorio.tbl_comuna.cod_comuna,
        territorio.tbl_comuna.nom_comuna
        order by territorio.tbl_comuna.cod_comuna`,[dep , vigencia]);
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
            Def: "Total de las vigencias consultadas",
            data: response.rows

        });

     } catch (error) {
         console.log(error)
     }
 }

module.exports= {
    getDependencias, getQueryDep , postDepVigencia
   
}
