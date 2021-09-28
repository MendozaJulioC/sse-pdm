const { pool } = require('../sql/dbConfig');
const { GoogleSpreadsheet } =  require('google-spreadsheet');
const keys = require ('../keys/appReportActivitykeys.json');
let googleId = process.env.ikeypass;

const  getGoogleSheet= async(req, res)=>{
    try {var response=0
        const documento = new GoogleSpreadsheet(googleId);
        await documento.useServiceAccountAuth(keys);
        await documento.loadInfo();
        const sheet     = documento.sheetsByIndex[0];
        const reports   = await sheet.getRows();
       await pool.query(` delete from obra_fisica.tbl_obra_fisica`);
        for (let x=0; x < reports.length; x++){
            response= await pool.query(` 
            INSERT INTO obra_fisica.tbl_obra_fisica( cod_dep, nombre_obra, cod_unico_obra, cod_conjunto, conjunto_mayor, cod_intervencion, tipo_intervencion, cod_comuna, valor_total_acumulado, cod_etapa, etapa, cod_alerta, alerta, cod_tematica, tematica, cod_hito, hito, corte)
                VALUES( 
                    ${reports[x].cod_dep},
                    '${reports[x].nombre_obra}',
                     ${reports[x].cod_unico_obra} ,
                     ${reports[x].cod_conjunto} , 
                    '${reports[x].conjunto_mayor}',
                     ${reports[x].cod_intervencion} ,
                    '${reports[x].tipo_intervencion}',
                     ${reports[x].cod_comuna} ,
                     ${reports[x].valor_total_acumulado} , 
                     ${reports[x].cod_etapa} ,
                    '${reports[x].etapa}', 
                     ${reports[x].cod_alerta} , 
                    '${reports[x].alerta}',
                     ${reports[x].cod_tematica} , 
                    '${reports[x].tematica}',
                     ${reports[x].cod_hito},
                    '${reports[x].hito}',
                    '${reports[x].corte}')
            `);
         console.log(reports[x].cod_unico_obra,'Ok', x); 
       }
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Datos_Contacto:'Gabriel Jaime Vasco Ayala - USPDM - DAP - CAM Piso 8 - Tel:3855555 ext. 5838',
            eMail_Contacto: 'gabriel.vasco@medellin.gov.co',
            data: 1
          });  
       //return reports
    } catch (error) {
        console.error('Error', error);
    }
    //return reports;
}

module.exports = {
    getGoogleSheet          : getGoogleSheet,
}