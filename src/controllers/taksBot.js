const { pool } = require('../sql/dbConfig');

const getIndicadorBot = async(req, res)=>{
    try {

        const indicador = req.params.cod_indicador;
        const response = await pool.query(`
        select 
			avance_cuatrienio,
	        indicativo.tbl_indicador.cod_indicador,
		    indicativo.tbl_indicador.nom_indicador,
		    defincion,
		    objetivo,
		    tipo_ind,
		    meta_plan,
		    unidad, 
		    sentido,
		    lb_ind,
		    responsable_plan,observaciones,
		    semafav
		    from indicativo.tbl_indicador
		LEFT JOIN indicativo.tbl_ficha_indicador ON indicativo.tbl_ficha_indicador.cod_indicador = indicativo.tbl_indicador.cod_indicador  
		LEFT JOIN dependencias.tbl_dependencias  ON dependencias.tbl_dependencias.cod_dep = indicativo.tbl_indicador.cod_responsable_reporte
		where indicativo.tbl_indicador.cod_indicador=$1
        `,  [indicador]);

        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Jhon Alexander Betancur  - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'jhon.betancur@medellin.gov.co',
            data: response.rows
        });   
    } catch (error) {
        console.log('Error getIndicador: '),error
    }
}



module.exports= { getIndicadorBot}