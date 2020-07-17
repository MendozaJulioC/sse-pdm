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


const postComunaVigencia = async (req, res)=>{

    try {
        const { comuna , vigencia } = req.body;
        const response = await pool.query (' select * from inverpublica.tbl_ejecpptal_comunas where comuna= $1 and ano =$2',[ comuna, vigencia] );
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


const postComunaDep= async(req, res)=>{
    try {
       const {vigencia, comuna}= req.body;
       const response = await pool.query(`select 
                                            tbl_estructurado.cod_dep,
                                            tbl_dependencias.nom_cortp,
                                            sum(tbl_estructurado.inversion)as total
                                        from inverpublica.tbl_estructurado 
                                        LEFT JOIN dependencias.tbl_dependencias ON tbl_dependencias.cod_dep = tbl_estructurado.cod_dep	
                                        where ano= $1 and comuna=$2
                                        group by
                                            inverpublica.tbl_estructurado.cod_dep,
                                            tbl_dependencias.nom_cortp
                                        order by
                                        cod_dep`, [vigencia, comuna]);
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



const postComunaProyectos = async (req, res)=>{
    try {
        let perPage = 25;
        let {comuna , vigencia, page  }= req.body;
        let skip = (perPage * page) - perPage;
    
        const responseTotal = await pool.query('select * from inverpublica.tbl_estructurado where comuna =$1 and ano= $2',[comuna , vigencia])
        const response = await pool.query(`  select 
                                                tbl_estructurado.cod_dep,
                                                tbl_dependencias.nombre_dep, 
                                                tbl_estructurado.cod_bpin,
                                                tbl_estructurado.nomproy, 
                                                tbl_estructurado.comuna, 
                                                tbl_estructurado.inversion, 
                                                tbl_estructurado.ano, 
                                                tbl_estructurado.fecha_corte, 
                                                tbl_estructurado.espp
                                            from dependencias.tbl_dependencias
                                            left join inverpublica.tbl_estructurado on dependencias.tbl_dependencias.cod_dep = inverpublica.tbl_estructurado.cod_dep
                                            where tbl_estructurado.comuna =$1 and tbl_estructurado.ano= $2
                                            order by  inverpublica.tbl_estructurado.cod_dep, inverpublica.tbl_estructurado.id, inverpublica.tbl_estructurado.espp
                                            OFFSET $3 ROWS
                                            fetch next $4 rows only
                                        `,[comuna, vigencia, skip, perPage]);
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
            dataTam: responseTotal.rows.length,
            Current: page,
            pages: Math.ceil(responseTotal.rows.length/perPage),
            data: response.rows
           
        })

        
    } catch (error) {
        console.log(error)
    }
}
module.exports= {
    getComuna,
    postComunaVigencia,
    postComunaDep,
    postComunaProyectos

}