const { pool } = require('../sql/dbConfig');

const _getRespIndLinea = async (req, res)=>{
    try {
        const codlinea = req.params.cod_linea;
        const response = await pool.query(`
        select cod_responsable_reporte, dependencias.tbl_dependencias.nombre_dep,
        count(indicativo.tbl_indicador.cod_responsable_reporte) total_indicadores 
         from dependencias.tbl_dependencias
         LEFT JOIN indicativo.tbl_indicador ON indicativo.tbl_indicador.cod_responsable_reporte =  dependencias.tbl_dependencias.cod_dep
         where cod_responsable_reporte> 700 and cod_linea=$1
         group by cod_responsable_reporte, dependencias.tbl_dependencias.nombre_dep
         order by cod_responsable_reporte
        
        `, [codlinea]);

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
        console.log('Error _getRespIndLinea', error)
    }

}




module.exports ={_getRespIndLinea}