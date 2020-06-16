const { pool } = require('../sql/dbConfig');

const getVigencias = async (req, res) =>{
    try{
        const response =  await pool.query (' select * from inverpublica.view_total_ano ');
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
    }catch(e){ 
        console.log(e);
    }
    
}

const getSearchVigencias = async (req, res) =>{
    try{
        const ano = req.params.ano;
        const response =  await pool.query ('select * from inverpublica.view_resumen where ano = $1 ',[ano]);
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
            Def: "Descripción de los totales por tipo de inversión de la vigencia consultada",
            data: response.rows
        });
    }catch(e){ 
        console.log(e);
    }

}


const getVig= async (req, res)=>{
    try {
        const { vigencia1, vigencia2 } = req.body;
        const response =  await pool.query ('select * from inverpublica.view_resumen where ano = $1 or ano= $2 ',[vigencia1 , vigencia2]);
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
        console.log(error);
    }
}


const getVigenciaDeps= async(req, res)=>{
    try{
        const ano = req.params.ano;
        const response =  await pool.query ('select * from inverpublica.view_total_dep  where ano = $1 ',[ano]);
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
            Def: "Descripción de los totales por tipo de inversión de la vigencia consultada",
            data: response.rows
        });
    }catch(e){ 
        console.log(e);
    }
}

const getVigenciaFortInst= async(req, res)=>{
try {
    const ano = req.params.ano;
    const response = await pool.query('select * from inverpublica.tbl_ejecpptal_comunas where ano= $1 and comuna=97', [ano]);
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
    
}
}

const getVigenciaComuna= async(req, res)=>{
    try {
        const ano= req.params.ano;
        const response= await pool.query('select * from inverpublica.tbl_ejecpptal_comunas where ano= $1',[ano]);
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
        
    }
}

module.exports= {
    getVigencias,
    getSearchVigencias,
    getVig,
    getVigenciaDeps,
    getVigenciaFortInst,
    getVigenciaComuna
   
}