// aquí colocaré todas las rutas y consultas que tengas como eje principal programas del pdmconst { pool } = require('../sql/dbConfig');
const { pool } = require('../sql/dbConfig');

const getPrograma= async(req, res)=>{

    try {
           const codPrograma= req.params.cod_programa;
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
            where cod_programa=$1
        `, [codPrograma]);
        
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendoza@medellin.gov.co',
            Def: 'Total indicadores por programas pertenecientes a la línea consultada  del PDM 2020-2023',
            data: response.rows
          });   
           


    } catch (error) {
        console.log('Error getComponente: ', error)
    }
}

const getPrgAvance= async(req, res)=>{

    try {
           const codLInea= req.params.cod_linea;
           const response = await pool.query(`
           select 
           cod_programa, nom_programa, count (cod_programa) , sum(pesoxavnt) as peso_avance, sum(peso) as peso
         from indicativo.tbl_indicador 
         where cod_linea=$1 and cod_programa <>'0'
         group by cod_programa, nom_programa
         order by cod_programa
        `, [codLInea]);
        
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Julio César Mendoza - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6272',
            eMail_Contacto: 'julio.mendoza@medellin.gov.co',
            Def: 'Total avance por programas pertenecientes a la línea consultada  del PDM 2020-2023',
            data: response.rows
          });   
           


    } catch (error) {
        console.log('Error getPrgAvance: ', error)
    }
}





module.exports={getPrograma, getPrgAvance}    