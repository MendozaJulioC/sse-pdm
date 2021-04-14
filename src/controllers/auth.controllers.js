

const { pool } = require('../sql/dbConfig');

const getEmail =  async (req, res)=> {
    try {
        
        const email =  req.params.email;
        const response = await pool.query(`select * from auth.tbl_users where email=$1`, [email]);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'A solicitud',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Julio César Mendoza  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendoza@medellin.gov.co',
           
            
            data: response.rows
        });   
    
    } catch (error) {
        console.log('Error getEmail: ', error);
    }
    
}

const postRegisterUser = async(req, res)=>{
    try {
        const{email, password, fullname,  cargo, tel_contacto, dependencias }= req.body;
        const results = await pool.query(`
            INSERT INTO auth.tbl_users(
                email, password, nom_usuario, id_cargo, tel_contacto, cod_dependencia)
            VALUES ( $1 , $2, $3,$4, $5, $6) RETURNING nom_usuario;`,
            [email, password, fullname,  cargo,  tel_contacto, dependencias]);
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
             
                data: results.rows
                
            });

    } catch (error) {
        console.log('Error postRegisterUser: ', error);
        
    }
}

const getIdLoguin =  async (req, res)=> {
    try {
        
        const id =  req.params.id;
        const response = await pool.query(`select id, nom_usuario,email, tel_contacto, cod_dependencia, id_cargo from auth.tbl_users where id=$1 `, [id]);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'A solicitud',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Julio César Mendoza  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendoza@medellin.gov.co',
            data: response.rows
        });   
    
    } catch (error) {
        console.log('Error getEmail: ', error);
    }
    
}
module.exports= { getEmail , postRegisterUser, getIdLoguin}
