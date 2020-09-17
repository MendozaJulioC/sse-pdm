
const { pool } = require('../sql/dbConfig');

const getIndicador = async(req, res)=>{
    try {

        const indicador = req.params.cod_indicador;
     
        const response = await pool.query(`
        select cod_linea, nom_linea, cod_componente,nom_componente,  cod_programa ,nom_programa, cod_indicador, nom_indicador, tipo_ind, lb_ind, meta_plan, unidad, sentido,responsable_plan, cod_responsable_reporte, nombre_dep
		from dependencias.tbl_dependencias
		LEFT JOIN indicativo.tbl_indicador ON indicativo.tbl_indicador.cod_responsable_reporte =  dependencias.tbl_dependencias.cod_dep where cod_indicador=$1
        `,  [indicador]);

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
            Def: 'Total indicadores por componentes pertenecientes a la línea consultada  del PDM 2020-2023',
            data: response.rows
          });   

        
    } catch (error) {
        console.log('Error getIndicador: '),error
    }
}


const getIndicadorFicha = async (req, res)=>{
    try {
        
    } catch (error) {
        console.log()
    }
}


module.exports = {getIndicador, getIndicadorFicha} 