const XLSX = require('xlsx');
const { local_pool , aws_pool} = require('../sql/dbConfig');




const getLineas = async (req, res)=>{
  try {


    const response = await aws_pool.query(`select * from indicativo.sp_total_lineas()`);
    res.status(200).json({
      Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
      Fecha_Emision:'2020-08-30',
      Fecha_Inicial:'2020-01-31',
      Fecha_Final:'2023-12-31',
      Frecuencia_actualizacion:'Semestral',
      Version: '1.0',
      Cobertura:'Municipio de Medelín',
      Fecha_ultima__actualizacion:'2020-08-30',
      Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
      eMail_Contacto: 'jhon.betancur@medellin.gov.co',
      
      data: response.rows
    });
  } catch (error) { console.log('Error getLineas', error)}
}

const getTotal = async (req, res)=>{
  try {
    const response = await aws_pool.query('select  sum(pesoxavnt*100) as total_plan,sum(pesoxavnt)as avancepond, sum(peso)as peso, sum(prog2022) as programado from indicativo.tbl_indicador');
    res.status(200).json({
      Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
      Fecha_Emision:'2020-08-30',
      Fecha_Inicial:'2020-01-31',
      Fecha_Final:'2023-12-31',
      Frecuencia_actualizacion:'Semestral',
      Version: '1.0',
      Cobertura:'Municipio de Medelín',
      Fecha_ultima__actualizacion:'2020-08-30',
      Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
      eMail_Contacto: 'jhon.betancur@medellin.gov.co',
    
      data: response.rows
  }); 


  } catch (error) {
    console.log('Error: getTotal ', error)
  }
}

const getAvanceLineas= async(req, res)=>{
  try {
  
    const response = await aws_pool.query(`SELECT cod_linea,nom_linea,(sum(total_plan/peso_linea)*100) as avance_linea 
    from indicativo.view_avance group by cod_linea, nom_linea order by cod_linea`);
    res.status(200).json({
      Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
      Fecha_Emision:'2020-08-30',
      Fecha_Inicial:'2020-01-31',
      Fecha_Final:'2023-12-31',
      Frecuencia_actualizacion:'Semestral',
      Version: '1.0',
      Cobertura:'Municipio de Medelín',
      Fecha_ultima__actualizacion:'2020-08-30',
      Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
      eMail_Contacto: 'jhon.betancur@medellin.gov.co',
     
      data: response.rows
    });
  } catch (error) { console.log('Error getLineas', error)}
}

const getComponentes = async (req, res)=>{
  try {

    const response = await aws_pool.query(`
      select 
        cod_linea,nom_linea,cod_componente, nom_componente, count (cod_componente) , sum(pesoxavnt) as peso_avance, sum(peso) as peso
      from indicativo.tbl_indicador 
      group by cod_linea,nom_linea, cod_componente, nom_componente 
      order by cod_linea, cod_componente
    `);
    res.status(200).json({
      Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
      Fecha_Emision:'2020-08-30',
      Fecha_Inicial:'2020-01-31',
      Fecha_Final:'2023-12-31',
      Frecuencia_actualizacion:'Semestral',
      Version: '1.0',
      Cobertura:'Municipio de Medelín',
      Fecha_ultima__actualizacion:'2020-08-30',
      Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
      eMail_Contacto: 'jhon.betancur@medellin.gov.co',
      Def: 'Listado de los Indicadoes del Plan de Desarrollo Medellín Futuro PDM 2020-2023',
      data: response.rows
    });

    
  } catch (error) {console.log('Error getComponentes', error)}
}

const getProgramas= async( req, res)=>{
  try {
    
    const response = await aws_pool.query(`
    select cod_linea, nom_linea,cod_componente, nom_componente, cod_programa, nom_programa, count (cod_programa)
    from indicativo.tbl_indicador where cod_programa<>'0' 
    group by cod_linea,nom_linea, nom_linea,cod_componente, nom_componente,cod_programa, nom_programa order by cod_linea, cod_programa
      
    `);
    res.status(200).json({
      Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
      Fecha_Emision:'2020-08-30',
      Fecha_Inicial:'2020-01-31',
      Fecha_Final:'2023-12-31',
      Frecuencia_actualizacion:'Semestral',
      Version: '1.0',
      Cobertura:'Municipio de Medelín',
      Fecha_ultima__actualizacion:'2020-08-30',
      Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
      eMail_Contacto: 'jhon.betancur@medellin.gov.co',
    
      data: response.rows
  });

  } catch (error) {console.log('Error getProgramas', error)}
}

const getTipoIndicador= async(req, res)=>{
  try {
    const response = await aws_pool.query(`
      select tipo_ind,count(tipo_ind) as tipo_indicador from indicativo.tbl_indicador group by  tipo_ind
    `);
    res.status(200).json({
      Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
           
            data: response.rows
    });   
  } catch (error) {console.log('Error getTipoIndicador', error)}
}

const getTotalReportDep = async(req, res)=>{
  try {
      const response = await aws_pool.query(`
        select cod_responsable_reporte, dependencias.tbl_dependencias.nombre_dep,
        count(indicativo.tbl_indicador.cod_responsable_reporte) total_indicadores 
        from dependencias.tbl_dependencias
        LEFT JOIN indicativo.tbl_indicador ON indicativo.tbl_indicador.cod_responsable_reporte =  dependencias.tbl_dependencias.cod_dep
        where cod_responsable_reporte> 700
        group by cod_responsable_reporte, dependencias.tbl_dependencias.nombre_dep
        order by cod_responsable_reporte
      `);
      res.status(200).json({
        Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
         
            data: response.rows
    });
  } catch (error) {console.log('Error: getTotalReportDep', error)}
}

const getTotalResponsable = async (req, res)=>{

  try {
    
    const response = await aws_pool.query(`
      select responsable_plan, count(indicativo.tbl_indicador.cod_responsable_reporte) total_indicadores 
      from indicativo.tbl_indicador
      group by responsable_plan
      order by responsable_plan
    `);
    res.status(200).json({
      Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
            Def: 'Listado de los Indicadoes del Plan de Desarrollo Medellín Futuro PDM 2020-2023',
            data: response.rows
    })

  } catch (error) { console.log('Error getTotalResponsable', error)}
}

const getHome = async(req, res)=>{
    try {
        res.send(
                ` 
                <!-- CSS only -->
                <meta name='viewport' content='width=device-width, initial-scale=1'>
                <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css' integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk' crossorigin='anonymous'>
              
                <!-- JS, Popper.js, and jQuery -->
                <script src='https://code.jquery.com/jquery-3.5.1.slim.min.js' integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj' crossorigin='anonymous'></script>
                <script src='https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js' integrity='sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo' crossorigin='anonymous'></script>
                <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js' integrity='sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI' crossorigin='anonymous'></script>
                <section class='container mt-2'>
                <!-- Jumbotron -->
                <div class='card card-image ' style='background-image: url(https://i0.wp.com/www.acimedellin.org/wp-content/uploads/2019/11/medellin-newsweek-1.jpg?w=1584&ssl=1);'>
                  <div class='text-white text-center rgba-stylish-strong py-5 px-4'>
                    <div class='py-5'>
                      <!-- Content -->
                      <h5 class='h5 orange-text'><i class='fas fa-camera-retro'></i> </h5>
                      <h2 class='card-title h2 my-4 py-2' style='color:yellow'></h2>
                      <p class='mb-4 pb-2 px-md-5 mx-md-5'></p>
                      <a href='http://localhost:5000'class='btn peach-gradient'><i class='fas fa-clone left'></i> View project</a>
                    </div>
                  </div>
                </div>
                <nav>
                  <div class='accordion' id='accordionExample'>
                    <div class='card'>
                      <div class='card-header' id='headingOne'>
                        <h2 class='mb-0'>
                          <button class='btn btn-link btn-block text-left' type='button' data-toggle='collapse' data-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
                            Cuatrienios
                          </button>
                        </h2>
                      </div>
                    </div>  
                      </div>
                    </div>
                    <div class='card'>
                      <div class='card-header' id='headingTwo'>
                        <h2 class='mb-0'>
                          <button class='btn btn-link btn-block text-left collapsed' type='button' data-toggle='collapse' data-target='#collapseTwo' aria-expanded='false' aria-controls='collapseTwo'>
                            Vigencias
                          </button>
                        </h2>
                      </div>
                      <div id='collapseTwo' class='collapse' aria-labelledby='headingTwo' data-parent='#accordionExample'>
                        <div class='card-body'>
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                      </div>
                    </div>
                    <div class='card'>
                      <div class='card-header' id='headingThree'>
                        <h2 class='mb-0'>
                          <button class='btn btn-link btn-block text-left collapsed' type='button' data-toggle='collapse' data-target='#collapseThree' aria-expanded='false' aria-controls='collapseThree'>
                           Comunas
                          </button>
                        </h2>
                      </div>
                      <div id='collapseThree' class='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
                        <div class='card-body'>
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                      </div>
                    </div>

                    <div class='card'>
                    <div class='card-header' id='headingThree'>
                      <h2 class='mb-0'>
                        <button class='btn btn-link btn-block text-left collapsed' type='button' data-toggle='collapse' data-target='#collapseFour' aria-expanded='false' aria-controls='collapseFour'>
                         Dependencias
                        </button>
                      </h2>
                    </div>
                    <div id='collapseFour' class='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
                      <div class='card-body'>
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

const postCorteSemaforo = async( req, res)=>{
  try {
    const { vigencia, mesplan } = req.body;
    const response = await aws_pool.query(`  
      select * from  indicativo.tbl_cortes where vigencia = $1 and mesplan = $2`, [ vigencia, mesplan]  
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
  
    
    data: response.rows

  });
  } catch (error) {
    console.log('Error corte semaforo',error);
  }
  
}

const getContadorSemaforo =async(req, res)=>{
  try {
    const response = await aws_pool.query(`select * from indicativo.sp_total_semaforo() ` );
    res.status(200).json({
      Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
           
            data: response.rows
    })

  } catch (error) {
    console.log('Error getContadorSemaforo ', error)
  }
}

const  getCountSemDep = async(req, res)=>{
  try {
    const dependencia = req.params.cod_dependencia;
    //console.log(dependencia)
    const response = await aws_pool.query(` 
    select * from indicativo.sp_total_semaforo_dep($1)`,[dependencia])
    res.status(200). json({
      Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
      Fecha_Emision:'2020-08-30',
      Fecha_Inicial:'2020-01-31',
      Fecha_Final:'2023-12-31',
      Frecuencia_actualizacion:'Semestral',
      Version: '1.0',
      Cobertura:'Municipio de Medelín',
      Fecha_ultima__actualizacion:'2020-08-30',
      Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
      eMail_Contacto: 'jhon.betancur@medellin.gov.co',
     
      data: response.rows
  })

  } catch (error) {
    console.log('Error getCountSemDep ', error)
  }
}

const tipoSemaforoDep = async(req, res)=>{
  try {
    const { cod_semaforo, cod_dependencia}= req.body;
    const response = await aws_pool.query(` 
      select
         cod_linea, cod_componente, cod_programa, cod_indicador, nom_indicador,meta_plan, unidad, fc, sentido, avance_cuatrienio,  observaciones_indicador , semafav 
         from indicativo.tbl_indicador where tipo_ind='Producto' and semafav = $1 and cod_responsable_reporte = $2
     `, [cod_semaforo, cod_dependencia])
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
     
      data: response.rows
  
    });

  } catch (error) {
    console.log('Error tipoSemaforoDep, ', error)
  }
}

const getSemafav = async(req, res)=>{
  try {
    const semafav = req.params.semafav;
    const response = await aws_pool.query(` 
      select 
      count(cod_responsable_reporte) as total_indicadores, dependencias.tbl_dependencias.cod_dep,
        dependencias.tbl_dependencias.nombre_dep
      from indicativo.tbl_indicador
      LEFT JOIN dependencias.tbl_dependencias ON tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
      where tipo_ind='Producto' and semafav = $1
      group by  cod_responsable_reporte, cod_responsable_reporte,dependencias.tbl_dependencias.cod_dep,
          dependencias.tbl_dependencias.nombre_dep
      order by  cod_responsable_reporte`, [semafav])
      res.status(200). json({
        Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
        Fecha_Emision:'2020-08-30',
        Fecha_Inicial:'2020-01-31',
        Fecha_Final:'2023-12-31',
        Frecuencia_actualizacion:'Semestral',
        Version: '1.0',
        Cobertura:'Municipio de Medelín',
        Fecha_ultima__actualizacion:'2020-08-30',
        Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
        eMail_Contacto: 'jhon.betancur@medellin.gov.co',
       
        data: response.rows
      })

  } catch (error) {
    console.log('Error getSemafav: '. error)
  }
}

const getSemafavAlerta = async(req, res)=>{
  try {
      const response = await aws_pool.query(` 
      SELECT 
      cod_dep, nombre_dep,nom_cortp,total_gris, total_rojo, total_amarillo, total_verde, 
      sum((avance/peso)*100) avance
      FROM indicativo.view_alerta
	  where cod_dep <>908 and cod_dep<>901 and cod_dep<>904 and cod_dep<>903 and cod_dep<>907 and cod_dep<>906
    group by cod_dep, nombre_dep,nom_cortp,total_gris, total_rojo, total_amarillo, total_verde`)
      res.status(200). json({
          Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
          Fecha_Emision:'2020-08-30',
          Fecha_Inicial:'2020-01-31',
          Fecha_Final:'2023-12-31',
          Frecuencia_actualizacion:'Semestral',
          Version: '1.0',
          Cobertura:'Municipio de Medelín',
          Fecha_ultima__actualizacion:'2020-08-30',
          Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
          eMail_Contacto: 'jhon.betancur@medellin.gov.co',
         
          data: response.rows
      })

  } catch (error) {
      console.error('Error getSemafavAlerta ', error)
  }
}

const getSemafavTotal = async(req, res)=>{
  try {
    const response = await aws_pool.query(` 
    select * from indicativo.sp_total_semaforo()`);
    res.status(200). json({
      Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
      Fecha_Emision:'2020-08-30',
      Fecha_Inicial:'2020-01-31',
      Fecha_Final:'2023-12-31',
      Frecuencia_actualizacion:'Semestral',
      Version: '1.0',
      Cobertura:'Municipio de Medelín',
      Fecha_ultima__actualizacion:'2020-08-30',
      Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
      eMail_Contacto: 'jhon.betancur@medellin.gov.co',
     
      data: response.rows
    })

  } catch (error) {
    console.log('error getSemafavTotal :>> ', error);
  }
}

const getAlertaRojo= async(req, res)=>{
  try {
    const response = await aws_pool.query(` 
    select 
    cod_linea,nom_linea,
    cod_componente,nom_componente,
    cod_programa,nom_programa,
    tipo_ind,cod_indicador,nom_indicador,
    meta_plan,cod_responsable_reporte,dependencias.tbl_dependencias.nom_cortp,
    avance_cuatrienio,observaciones_indicador, semafav
    from indicativo.tbl_indicador
    left join dependencias.tbl_dependencias ON indicativo.tbl_indicador.cod_responsable_reporte=dependencias.tbl_dependencias.cod_dep
    where semafav=1 order by cod_responsable_reporte
    `);
    res.status(200). json({
      Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
      Fecha_Emision:'2020-08-30',
      Fecha_Inicial:'2020-01-31',
      Fecha_Final:'2023-12-31',
      Frecuencia_actualizacion:'Semestral',
      Version: '1.0',
      Cobertura:'Municipio de Medelín',
      Fecha_ultima__actualizacion:'2020-08-30',
      Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
      eMail_Contacto: 'jhon.betancur@medellin.gov.co',
     
      data: response.rows
    })


  } catch (error) {
    console.error('Error getAlertaRojo: ', error);
  }
}

const getSemaforoPA = async(req, res)=>{
  try {
    const mespa = req.params.mesvigencia
    const response = await aws_pool.query(`select * from  plan_accion.tbl_cortes_pa  where  mesvigencia = $1`, [ mespa]  );
    res.status(200).json({
    Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
    Version: "1.0",
    Fecha_ultima__actualizacion:"2020-01-30",
    Datos_Contacto:"Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272",
    data: response.rows

  });
  } catch (error) {
   console.error(error);
   
  }

  
}

const getComparePlan = async(req, res)=>{
  try {
    const response = await aws_pool.query('select * from indicativo.tbl_comparativa_pdm');
   
    res.status(200).json({
      Autor:"Alcaldía de Medellin - Departamento Administrativo de Planeación ",
      Version: "1.0",
   
      Datos_Contacto:"Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272",
      data: response.rows
    });
  } catch (error) {
    console.error(error);
  }
}






module.exports= { getHome, getLineas, getComponentes, getProgramas, getTipoIndicador, getTotalReportDep, getTotalResponsable ,
                  getTotal, getAvanceLineas, postCorteSemaforo, getContadorSemaforo, getCountSemDep, tipoSemaforoDep,
                  getSemafav, getSemafavAlerta, getSemafavTotal, getAlertaRojo, getSemaforoPA, getComparePlan
                }