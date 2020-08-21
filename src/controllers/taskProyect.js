const { pool } = require('../sql/dbConfig');

const getProyectos = async (req, res)=>{
    try{
        const response =  await pool.query (' select  nomproy from inverpublica.tbl_estructurado  where ano >=2008 group by nomproy order by  nomproy asc');

      
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


const getBuscaProyect = async (req, res)=>{
    try {
        
        const nomproy = req.params.nomproy;
        const response = await pool.query(`
        select ano,nomproy,tbl_estructurado.cod_dep,dependencias.tbl_dependencias.nombre_dep, cod_dep_actual ,sum(inversion) as total 
FROM dependencias.tbl_dependencias
     LEFT JOIN inverpublica.tbl_estructurado ON tbl_estructurado.cod_dep_actual = tbl_dependencias.cod_dep
where nomproy = 
$1

group by ano, nomproy, tbl_estructurado.cod_dep, dependencias.tbl_dependencias.nombre_dep,cod_dep_actual 
order by ano `, [nomproy]
        );
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
            Def: "Total de cada vigencia",
            data: response.rows
        });


    } catch (error) {
        console.log(error)
    }
}

const getDetalleProyect = async (req, res)=>{

    try {
        
        const nomproy = req.params.nomproy;
        const response = await pool.query(`
        select
        ano,inverpublica.tbl_estructurado.cod_dep,cod_bpin,
        nomproy,cod_dep_actual,dependencias.tbl_dependencias.nombre_dep,comuna,
        sum(inversion) as total 
        FROM dependencias.tbl_dependencias
        LEFT JOIN inverpublica.tbl_estructurado ON tbl_estructurado.cod_dep_actual = tbl_dependencias.cod_dep
        where nomproy = $1
        group by ano,cod_bpin,  nomproy, inverpublica.tbl_estructurado.cod_dep,dependencias.tbl_dependencias.nombre_dep,cod_dep_actual, comuna
        order by ano `, [nomproy]
        );
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
            Def: "Total de cada vigencia",
            data: response.rows
        });



    } catch (error) {
        
    }
}
module.exports= {
    getProyectos,
    getBuscaProyect,
    getDetalleProyect
   
}
