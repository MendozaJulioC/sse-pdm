const { pool } = require('../sql/dbConfig');

const getComponente= async(req, res)=>{

    try {
           const codComponente= req.params.cod_componente;
           const response = await pool.query(`
           select 
            logro_acumulado,
            avance_cuatrienio,
            cod_linea, 
            nom_linea, 
            cod_componente,
            nom_componente,  
            cod_programa,
            nom_programa,
            indicativo.tbl_indicador.cod_indicador,
            indicativo.tbl_indicador.nom_indicador,
            defincion,
            objetivo,
            normativa,
            tipo_ind,
            meta_plan,
            unidad, 
            sentido,
            comportamiento_deseado,fc,
            lb_ind,incluye_lb,
            vigencia_lb,tipo_lb,
            peso,periocidad_generacion,
            formula_indicador,
            variable_operativa,
            meta_2020,logro_2020,cumple_2020,
            meta_2021,logro_2021,cumple_2021,
            meta_2022,logro_2022,cumple_2022,
            meta_2023,logro_2023,cumple_2023,
            fuente,
            tipo_fuente,
            responsable_plan,
            cod_responsable_reporte,
            nombre_dep,
            responsable_reporte,
            instrumento_recoleccion,
            observaciones
            from indicativo.tbl_indicador
            LEFT JOIN indicativo.tbl_ficha_indicador ON indicativo.tbl_ficha_indicador.cod_indicador = indicativo.tbl_indicador.cod_indicador  
            LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
            where cod_componente=$1
        `, [codComponente]);
        
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
           


    } catch (error) {
        console.log('Error getComponente: ', error)
    }
}

const getCompAvanceLinea = async(req, res)=>{

    try {
        const codLinea= req.params.cod_linea;
        const response = await pool.query(`
       	    select 
                cod_linea,nom_linea,cod_componente, nom_componente, count (cod_componente) , sum(pesoxavnt) as peso_avance, sum(peso) as peso
            from indicativo.tbl_indicador 
            where cod_linea=  $1
            group by cod_linea,nom_linea, cod_componente, nom_componente 
            order by cod_linea, cod_componente
        `, [codLinea]);
     
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
        


 } catch (error) {
     console.log('Error getComponente: ', error)
 }
}

const getListComponente = async(req, res)=>{
  try {
    const response = await pool.query(`select cod_componente, nom_componente  from indicativo.tbl_indicador group by  cod_componente, nom_componente order by cod_componente`);
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

  }
  catch (error){
    console.log('Error getListComponente ', error)
  }
}
 const getBuscaNombreComponente = async(req ,res)=>{
     try {
        const nomComponente = req.params.nom_componente;
        const response = await pool.query(`
        select 
         	cod_linea, nom_linea, cod_componente, nom_componente,
            sum(pesoxavnt)as avancexpeso,sum(peso) as peso,  sum((pesoxavnt/peso)*100) as avance, 
            nombre_dep, count (cod_componente) as indicadores
        from indicativo.tbl_indicador
        LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
        where  nom_componente=$1
        group by 
        cod_linea, nom_linea,nombre_dep, cod_componente, nom_componente`, [nomComponente])
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
            
     } catch (error) {
         console.log('Error getBuscaNombreComponente ', error)
     }
 }

 const getBuscaCodigoComponente = async(req ,res)=>{
    try {
       const codComponente = req.params.cod_componente;
       const response = await pool.query(`
       select 
            cod_linea, nom_linea, cod_componente, nom_componente,
           sum(pesoxavnt)as avancexpeso,sum(peso) as peso,  sum((pesoxavnt/peso)*100) as avance, 
           nombre_dep, count (cod_componente) as indicadores
       from indicativo.tbl_indicador
       LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
       where  cod_componente=$1
       group by 
       cod_linea, nom_linea,nombre_dep, cod_componente, nom_componente`, [codComponente])
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
           
    } catch (error) {
        console.log('Error getBuscaNombreComponente ', error)
    }
}


const getPrgNomComponente = async(req ,res)=>{
    try {
       const nomComponente = req.params.nom_componente;
       const response = await pool.query(`
        select 	
            cod_programa, nom_programa,
            sum(pesoxavnt)as avancexpeso,sum(peso) as peso,  sum((pesoxavnt/peso)*100) as avance, 
            count (cod_componente) as indicadores
        from indicativo.tbl_indicador
        LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
        where  nom_componente=$1 and cod_programa<>'0'
        group by 
        cod_programa , nom_programa`, [nomComponente])
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
           
    } catch (error) {
        console.log('Error getPrgNomComponente ', error)
    }
}


const getprgCodComponente = async(req ,res)=>{
    try {
       const codComponente = req.params.cod_componente;
       const response = await pool.query(`
        select 	
            cod_programa, nom_programa,
            sum(pesoxavnt)as avancexpeso,sum(peso) as peso,  sum((pesoxavnt/peso)*100) as avance, 
            count (cod_componente) as indicadores
        from indicativo.tbl_indicador
        LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
        where  cod_componente=$1 and cod_programa<>'0'
        group by 
        cod_programa , nom_programa`, [codComponente])
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
           
    } catch (error) {
        console.log('Error getprgCodComponente ', error)
    }
}




const getRespComponente = async(req ,res)=>{
    try {
       const nomComponente = req.params.nom_componente;
       const response = await pool.query(`
       select 	
            nombre_dep, count (cod_componente) as indicadores,  sum(pesoxavnt)as avancexpeso,sum(peso) as peso
        from indicativo.tbl_indicador
        LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
        where  nom_componente=$1
        group by 
            nombre_dep
        order by indicadores desc`, [nomComponente])
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
           
    } catch (error) {
        console.log('Error getprgCodComponente ', error)
    }
}


const getRespCodComponente = async(req ,res)=>{
    try {
       const codComponente = req.params.cod_componente;
       const response = await pool.query(`
        select 	
 	        nombre_dep,	 count (cod_componente) as indicadores,  sum(pesoxavnt)as avancexpeso,sum(peso) as peso
        from indicativo.tbl_indicador
        LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
        where  cod_componente=$1
        group by 
	        nombre_dep
        order by indicadores desc`, [codComponente])
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
           
    } catch (error) {
        console.log('Error getprgCodComponente ', error)
    }
}







module.exports={ getComponente, getCompAvanceLinea,getListComponente , getBuscaNombreComponente,
                 getBuscaCodigoComponente, getPrgNomComponente,getprgCodComponente, getRespComponente,
                  getRespCodComponente
            }    