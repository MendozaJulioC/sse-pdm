
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

const getDetalleAlonsoTotal = async(req, res)=>{
    try{
        const response = await pool.query(process.env.sqlTotalAlonso);
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
                    id:"total_localizada_alonso",
                    type:"numeric",
                    contenido:"Sumatoria de la inversión tipo Localizada"
                },
                {
                    id:"localizadatotal_inversión_ciudad",
                    type:"numeric",
                    contenido:"La sumatoria de la inversión  de ciudad  desde el 2008-2011"
                },
                {
                    id:"ppalonso",
                    type:"numeric",
                    contenido:"La sumatoria de la inversión por presupuesto participativo desde el 2008-2011"
                }
            ] ,
            data: response.rows
        });
    }catch(e){ 
        console.log(e);
    }
}

const postAlonsoDepComuna = async(req, res)=>{

    try{
        //recibe dos valores el año incial al año final
        const { vigencia1, vigencia2 , cod_comuna} = req.body;
        const response = await pool.query('select * from inverpublica.sp_alonso_dep_comuna($1, $2, $3)', [vigencia1, vigencia2, cod_comuna]);
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

const getDetalleAnibalTotal= async(req, res)=>{
    try{
        const response = await pool.query(process.env.sqlTotalAnibal);
       
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
                    id:"total_localizada_anibal",
                    type:"numeric",
                    contenido:"Sumatoria de la inversión tipo Localizada"
                },
                {
                    id:"localizadatotal_inversión_ciudad",
                    type:"numeric",
                    contenido:"La sumatoria de la inversión  de ciudad  desde el 2012-2015"
                },
                {
                    id:"ppanibal",
                    type:"numeric",
                    contenido:"La sumatoria de la inversión por presupuesto participativo desde el 2012-2015"
                }
            ] ,
            data: response.rows
        });
    }catch(e){ 
        console.log(e);
    }

}

const postAnibalDepComuna = async(req, res)=>{

    try{
        //recibe dos valores el año incial al año final
        const { vigencia1, vigencia2 , cod_comuna} = req.body;
        const response = await pool.query('select * from inverpublica.sp_alonso_dep_comuna($1, $2, $3)', [vigencia1, vigencia2, cod_comuna]);
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

const getDetalleFicoTotal = async(req, res)=>{
    try{
        const response = await pool.query(process.env.sqlTotalFico);
       
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
                    id:"total_localizada_fico",
                    type:"numeric",
                    contenido:"Sumatoria de la inversión tipo Localizada"
                },
                {
                    id:"localizadatotal_inversión_ciudad",
                    type:"numeric",
                    contenido:"La sumatoria de la inversión  de ciudad  desde el 2016-2019"
                },
                {
                    id:"ppfico",
                    type:"numeric",
                    contenido:"La sumatoria de la inversión por presupuesto participativo desde el 2016-2019"
                }
            ] ,
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

const postFicoDepComuna= async(req, res)=>{
    try{
        //recibe dos valores el año incial al año final
        const { vigencia1, vigencia2 , cod_comuna} = req.body;
        const response = await pool.query('select * from inverpublica.sp_alonso_dep_comuna($1, $2, $3)', [vigencia1, vigencia2, cod_comuna]);
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

const getFortalecimientoFico = async(req, res)=>{
    try{
        //recibe dos valores el año incial al año final
        
        const response = await pool.query(` SELECT tbl_comuna.cod_comuna,tbl_comuna.nom_comuna, mview_cuatrienio_detalle.localizada2016_2019
                                            FROM territorio.tbl_comuna
                                                LEFT JOIN inverpublica.mview_cuatrienio_detalle ON tbl_comuna.cod_comuna = mview_cuatrienio_detalle.cod_comuna
                                            WHERE tbl_comuna.cod_comuna = 97
                                            GROUP BY tbl_comuna.cod_comuna, mview_cuatrienio_detalle.localizada2016_2019
                                            ORDER BY tbl_comuna.cod_comuna`);
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

const getHome= async(req, res)=>{
    try {
        res.send(
                ` 
                <!-- CSS only -->
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
              
                <!-- JS, Popper.js, and jQuery -->
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
                <section class="container mt-2">
                <!-- Jumbotron -->
                <div class="card card-image " style="background-image: url(https://i0.wp.com/www.acimedellin.org/wp-content/uploads/2019/11/medellin-newsweek-1.jpg?w=1584&ssl=1);">
                  <div class="text-white text-center rgba-stylish-strong py-5 px-4">
                    <div class="py-5">
                
                      <!-- Content -->
                      <h5 class="h5 orange-text"><i class="fas fa-camera-retro"></i> </h5>
                      <h2 class="card-title h2 my-4 py-2" style="color:yellow">geoInverApp</h2>
                      <p class="mb-4 pb-2 px-md-5 mx-md-5"></p>
                      <a href="http://localhost:5000"class="btn peach-gradient"><i class="fas fa-clone left"></i> View project</a>
                
                    </div>
                  </div>
                </div>
                <nav>
                  <div class="accordion" id="accordionExample">
                    <div class="card">
                      <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                          <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Cuatrienios
                          </button>
                        </h2>
                      </div>
                      <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                        <a href="http://localhost:4000/api/totales">/api/totales</a>
                         <pre><code>
                         {
                            "Autor": "Alcaldía de Medellin - Departamento Administrativo de Planeación ",
                            "Fecha_Emision": "2020-04-15",
                            "Fecha_Inicial": "2004-12-31",
                            "Fecha_Final": "2019-12-31",
                            "Frecuencia_actualizacion": "Anual",
                            "Version": "1.0",
                            "Cobertura": "Municipio de Medelín",
                            "Fecha_ultima__actualizacion": "2020-01-30",
                            "Datos_Contacto": "Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272",
                            "eMail_Contacto": "julio.mendoza@medellin.gov.co",
                            "Def": "Suma totales por año y tipo de inversión pública del Municipio d Medellín",  
                            "data": []//12 ítems
                         }
                                         
                      </code></pre>  

                      <a href="http://localhost:4000/api/cuatrienios">/api/cuatrienios</a>
                         <pre><code>
                         {
                            "Autor": "Alcaldía de Medellin - Departamento Administrativo de Planeación ",
                            "Fecha_Emision": "2020-04-15",
                            "Fecha_Inicial": "2004-12-31",
                            "Fecha_Final": "2019-12-31",
                            "Frecuencia_actualizacion": "Anual",
                            "Version": "1.0",
                            "Cobertura": "Municipio de Medelín",
                            "Fecha_ultima__actualizacion": "2020-01-30",
                            "Datos_Contacto": "Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272",
                            "eMail_Contacto": "julio.mendoza@medellin.gov.co",
                            "Def": "Suma totales por año y tipo de inversión pública del Municipio d Medellín",  
                            "data": []//12 ítems
                         }
                                         
                      </code></pre>  
                       
              
                        </div>

                        
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Vigencias
                          </button>
                        </h2>
                      </div>
                      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                           Comunas
                          </button>
                        </h2>
                      </div>
                      <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                      </div>
                    </div>

                    <div class="card">
                    <div class="card-header" id="headingThree">
                      <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                         Dependencias
                        </button>
                      </h2>
                    </div>
                    <div id="collapseFour" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                      <div class="card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                    </div>
                  </div>
                  </div>
              
                </section>
              
              
              
              <style>
                  @import url('https://fonts.googleapis.com/css?family=Cardo:400i|Rubik:400,700&display=swap');
              
                  $imageIds: '1517021897933-0e0319cfbc28',
                  '1533903345306-15d1c30952de',
                  '1545243424-0ce743321e11',
                  '1531306728370-e2ebd9d7bb99';
              
                  $bp-md: 600px;
                  $bp-lg: 800px;
              
                  :root {
                      --d: 700ms;
                      --e: cubic-bezier(0.19, 1, 0.22, 1);
                      --font-sans: 'Rubik', sans-serif;
                      --font-serif: 'Cardo', serif;
                  }
              
                  * {
                      box-sizing: border-box;
                  }
              
                  html,
                  body {
                      height: 100%;
                  }
              
                  body {
                      display: grid;
                    
                  }
              
                  .page-content {
                      display: grid;
                      grid-gap: 1rem;
                      padding: 1rem;
                      max-width: 1024px;
                      margin: 0 auto;
                      font-family: var(--font-sans);
              
                      @media (min-width: $bp-md) {
                          grid-template-columns: repeat(2, 1fr);
                      }
              
                      @media (min-width: $bp-lg) {
                          grid-template-columns: repeat(4, 1fr);
                      }
                  }
                  .card {
                      display: flex;
                     
                      overflow: hidden;
                      padding: 1rem;
                      width: 100%;
                     
              
                      background-color: whitesmoke;
                      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1),
                          0 2px 2px rgba(0, 0, 0, 0.1),
                          0 4px 4px rgba(0, 0, 0, 0.1),
                          0 8px 8px rgba(0, 0, 0, 0.1),
                          0 16px 16px rgba(0, 0, 0, 0.1);
              
                      @media (min-width: $bp-md) {
                          height: 350px;
                      }
              
                      &:before {
                       
                          position: absolute;
                          top: 0;
                          left: 0;
                          width: 100%;
                          height: 110%;
                          background-size: cover;
                          background-position: 0 0;
                          transition: transform calc(var(--d) * 1.5) var(--e);
                          pointer-events: none;
                      }
              
                      &:after {
                          content: '';
                          display: block;
                          position: absolute;
                          top: 0;
                          left: 0;
                          width: 100%;
                          height: 200%;
                          pointer-events: none;
                          background-image: linear-gradient(to bottom,
                                  hsla(0, 0%, 0%, 0) 0%,
                                  hsla(0, 0%, 0%, 0.009) 11.7%,
                                  hsla(0, 0%, 0%, 0.034) 22.1%,
                                  hsla(0, 0%, 0%, 0.072) 31.2%,
                                  hsla(0, 0%, 0%, 0.123) 39.4%,
                                  hsla(0, 0%, 0%, 0.182) 46.6%,
                                  hsla(0, 0%, 0%, 0.249) 53.1%,
                                  hsla(0, 0%, 0%, 0.320) 58.9%,
                                  hsla(0, 0%, 0%, 0.394) 64.3%,
                                  hsla(0, 0%, 0%, 0.468) 69.3%,
                                  hsla(0, 0%, 0%, 0.540) 74.1%,
                                  hsla(0, 0%, 0%, 0.607) 78.8%,
                                  hsla(0, 0%, 0%, 0.668) 83.6%,
                                  hsla(0, 0%, 0%, 0.721) 88.7%,
                                  hsla(0, 0%, 0%, 0.762) 94.1%,
                                  hsla(0, 0%, 0%, 0.790) 100%);
                          transform: translateY(-50%);
                          transition: transform calc(var(--d) * 2) var(--e);
                      }
              
                      @each $id in $imageIds {
                          $i: index($imageIds, $id);
              
                          &:nth-child(#{$i}):before {
                              background-image: url(https://images.unsplash.com/photo-#{$id}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
                          }
                      }
                  }
              
                  .content {
                      position: relative;
                      display: flex;
                      flex-direction: column;
                   
                      width: 100%;
                      padding: 1rem;
                      transition: transform var(--d) var(--e);
                      z-index: 1;
              
                      >*+* {
                          margin-top: 1rem;
                      }
                  }
              
                  .title {
                      font-size: 1.3rem;
                      font-weight: bold;
                      line-height: 1.2;
                  }
              
                  .copy {
                      font-family: var(--font-serif);
                      font-size: 1.125rem;
                      font-style: italic;
                      line-height: 1.35;
                  }
              
                  .btn {
                      cursor: pointer;
                      margin-top: 1.5rem;
                      padding: 0.75rem 1.5rem;
                      font-size: 0.65rem;
                      font-weight: bold;
                      letter-spacing: 0.025rem;
                      text-transform: uppercase;
                      color: white;
                      background-color: black;
                      border: none;
              
                      &:hover {
                          background-color: lighten(black, 5%);
                      }
              
                      &:focus {
                          outline: 1px dashed yellow;
                          outline-offset: 3px;
                      }
                  }
              
                  @media (hover: hover) and (min-width: $bp-md) {
                      .card:after {
                          transform: translateY(0);
                      }
              
                      .content {
                          transform: translateY(calc(100% - 4.5rem));
              
                          >*:not(.title) {
                              opacity: 0;
                              transform: translateY(1rem);
                              transition:
                                  transform var(--d) var(--e),
                                  opacity var(--d) var(--e);
                          }
                      }
              
                      .card:hover,
                      .card:focus-within {
                          align-items: center;
              
                          &:before {
                              transform: translateY(-4%);
                          }
              
                          &:after {
                              transform: translateY(-50%);
                          }
              
                          .content {
                              transform: translateY(0);
              
                              >*:not(.title) {
                                  opacity: 1;
                                  transform: translateY(0);
                                  transition-delay: calc(var(--d) / 8);
                              }
                          }
                      }
              
                      .card:focus-within {
              
                          &:before,
                          &:after,
                          .content,
                          .content>*:not(.title) {
                              transition-duration: 0s;
                          }
                      }
                  }
              </style>
                `

        )
    } catch (e) {
        console.log(e);
    }
}
module.exports= {   
                    getTotales, getCuatrienio, 
                    getCuatriCompare, getCuatriComuna ,
                    getCuatrienioDetalleComuna,
                    getDetalleAlonso, getDetalleAnibal,
                    getDetalleFico, getDetalleAlonsoTotal,
                    getDetalleAnibalTotal, getDetalleFicoTotal,
                    postAlonsoDepComuna, postAnibalDepComuna, postFicoDepComuna,
                    getFortalecimientoFico, getHome
                }