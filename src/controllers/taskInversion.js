const { pool } = require('../sql/dbConfig');



const getTipoInversion = async (req, res)=>{
    try {
        const response = await pool.query(`select * from inverpublica.sp_ciudad_fortinst()`);
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
           
            data: response.rows
        });
      
        
    } catch (error) {
        console.error('Error getTipoInversion ', error)
    }
}

const getInverTerritorio = async(req, res)=>{
    try {
        const response = await pool.query(`
        select
          inverpublica.tbl_tipoinver_geo.cod_comuna,
          territorio.tbl_comuna.nom_comuna,
          localizada,ciudad,pp, 
          inverpublica.tbl_tipoinver_geo.total,
          poblacion.tbl_poblacion_pdm.TOTAL AS POBLACION
        from inverpublica.tbl_tipoinver_geo
        left join territorio.tbl_comuna on territorio.tbl_comuna.cod_comuna= inverpublica.tbl_tipoinver_geo.cod_comuna
        left join poblacion.tbl_poblacion_pdm on poblacion.tbl_poblacion_pdm.codIGO_comuna= inverpublica.tbl_tipoinver_geo.cod_comuna
        
        `)
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
           
            data: response.rows
        });


        
    } catch (error) {
        console.log('Error getInverTerritorio: ', error)
    }
}

const getInversionDep =  async(req, res)=>{
    try {
        const response = await pool.query(`
            select * from inverpublica.view_total_dep
        `)
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
         
            data: response.rows
        });
    } catch (error) {
        console.log('Error getInversionDep: ', error)
    }

}

const tipo_inversion_dep = async (req, res)=>{
    try {
        const dep =   req.params.cod_dependencia;
        const response = await pool.query(` 
        select * from inverpublica.sp_tipoinversion_dep($1)`,[dep]);
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
            
            data: response.rows
        }); 


    } catch (error) {
        console.log('Error tipo_inversion_dep', error)
    
    }
}


const getInverTerritorioDep = async(req, res)=>{
    try {
        const dep =   req.params.cod_dependencia;
        const response = await pool.query(`
            select    
 		        sum(c1) as Popular,
		        sum(c2) as Santa_Cruz,
		        sum(c3) as Manrique,
		        sum(c4) as Aranjuez,
		        sum(c5) as Castilla,
		        sum(c6) as Doce_de_Octubre,
		        sum(c7) as Robledo,
		        sum(c8) as Villa_Hermosa,
		        sum(c9) as Buenos_Aires,
		        sum(c10) as La_Candelaria,
		        sum(c11) as Laureles_Estadio,
		        sum(c12) as La_America,
		        sum(c13) as San_Javier,
		        sum(c14) as El_Poblado,
		        sum(c15) as Guayabal,
		        sum(c16) as Belen,
		        sum(c50) as Palmitas,
		        sum(c60) as San_Cristobal,
		        sum(c70) as Altavista,
		        sum(c80) as San_Antonio,
		        sum(c90) as Santa_Elena,
		        sum(c99) as Ciudad,
		        sum(c97) as Fort_Inst
            from inverpublica.tbl_consolidado
            where cod_dependencia = $1`,
        [dep])
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
          
            data: response.rows
        });


        
    } catch (error) {
        console.log('Error getInverTerritorio: ', error)
    }
}

const getTipoIniciativaDep = async (req, res)=>{
    try {
        const dep =   req.params.cod_dependencia;
        const response = await pool.query(`select * from plan_accion.sp_tipoiniciativa_dep($1) `,[dep]);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
            
            data: response.rows
        }); 
        
    } catch (error) {
        console.log('Error getTipoIniciativaDep ', error)
    }
}

const getInverTerriroerioProject = async (req, res)=>{
    try {
        const cod_project = req.params.cod_proyecto;
        const response = await pool.query(`
        select    
            sum(c1) as Popular,sum(c2) as Santa_Cruz,
            sum(c3) as Manrique,sum(c4) as Aranjuez,
            sum(c5) as Castilla,sum(c6) as Doce_de_Octubre,
            sum(c7) as Robledo,sum(c8) as Villa_Hermosa,
            sum(c9) as Buenos_Aires,sum(c10) as La_Candelaria,
            sum(c11) as Laureles_Estadio,
            sum(c12) as La_America,sum(c13) as San_Javier,
            sum(c14) as El_Poblado,sum(c15) as Guayabal,
            sum(c16) as Belen,sum(c50) as Palmitas,
            sum(c60) as San_Cristobal,sum(c70) as Altavista,
            sum(c80) as San_Antonio,sum(c90) as Santa_Elena,
            sum(c99) as Ciudad,sum(c97) as Fort_Inst
        from inverpublica.tbl_consolidado
        where cod_proyecto = $1
        `, [cod_project]);
        res.status(200).json({
            Autor:'Alcaldía de Medellin - Departamento Administrativo de Planeación ',
            Fecha_Emision:'2020-08-30',
            Fecha_Inicial:'2020-01-31',
            Fecha_Final:'2023-12-31',
            Frecuencia_actualizacion:'Semestral',
            Version: '1.0',
            Cobertura:'Municipio de Medelín',
            Fecha_ultima__actualizacion:'2020-08-30',
            Datos_Contacto:'Bibiana Botero de los Ríos - USPDM - DAP - CAM Psio 8 - Tel:3855555 ext. 6210',
            eMail_Contacto: 'bibiana.botero@medellin.gov.co',
          
            data: response.rows
        }); 

    } catch (error) {
        console.log('Error getInverTerriroerioProject', error)
    }
}

const getDepInversionComuna = async(req, res)=>{
    try {
        const territorio = req.params.comuna;
        switch (territorio) {
            case '1':
                const response = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                  tbl_dependencias.nom_cortp,
                sum(popular)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where popular>0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
              order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response.rows }); 
            break;
            case '2':
                const response2 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                  tbl_dependencias.nom_cortp,
                sum(santacruz)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where santacruz>0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
              order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response2.rows }); 
            break;
            case '3':
                const response3 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(manrique)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where manrique>0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response3.rows }); 
            break;
            case '4':
                const response4 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(aranjuez)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where aranjuez>0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response4.rows }); 
              break;
              case '5':
                const response5 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(castilla)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where castilla>0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response5.rows }); 
              break;
              case '6':
                const response6 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(doce_de_octubre)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where doce_de_octubre>0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response6.rows }); 
              break;
              case '7':
                
                const response7 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(robledo)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where robledo >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response7.rows }); 
              break;
              case '8':
                
                const response8 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(villa_hermosa)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where villa_hermosa >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response8.rows }); 
              break;
              case '9':
               
                const response9 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(buenos_aires)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where buenos_aires >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response9.rows }); 
              break;
              case '10':
               
                const response10= await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(la_candelaria)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where la_candelaria >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response10.rows }); 
              break;
              case '11':
               
                const response11 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(laureles_estadio)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where laureles_estadio >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response11.rows }); 
              break;
              case '12':
               
                const response12 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(la_américa)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where la_américa >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response12.rows }); 
              break;
              case '13':
               
                const response13 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(san_javier)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where san_javier >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response13.rows }); 
              break;
              case '14':
               
                const response14 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(el_poblado)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where el_poblado >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response14.rows }); 
              break;
              case '15':
              
                const response15 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(guayabal)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where guayabal >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response15.rows }); 
              break;
              case '16':
                
                const response16 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(belén)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where belén >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response16.rows }); 
              break;
              case '50':
                
                const response50 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(palmitas)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where palmitas >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response50.rows }); 
              break;
              case '60':
                
                const response60 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(sn_cristibal)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where sn_cristibal >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response60.rows }); 
              break;
              case '70':
                
                const response70 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(altavista)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where altavista >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response70.rows }); 
              break;
              case '80':
                
                const response80 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(sn_antonio)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where sn_antonio >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response80.rows }); 
              break;
              case '90':
                
                const response90 = await pool.query(`
                select
                inverpublica.view_inver_dep.cod_dep,
                tbl_dependencias.nom_cortp,
                sum(snt_elena)as total 
                from inverpublica.view_inver_dep 
                left join dependencias.tbl_dependencias on inverpublica.view_inver_dep.cod_dep= dependencias.tbl_dependencias.cod_dep
                where snt_elena >0
                group by 	inverpublica.view_inver_dep.cod_dep, tbl_dependencias.nom_cortp
                order by inverpublica.view_inver_dep.cod_dep;
                `);
                res.status(200).json({ data: response90.rows }); 
              break;
            default:
              //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
              break;
          }

      

        
    } catch (error) {
        console.error("Error getDepInversionComuna ",error);
    }
}

module.exports ={ getTipoInversion, getInverTerritorio, getInversionDep, tipo_inversion_dep, getInverTerritorioDep, getTipoIniciativaDep, 
    getInverTerriroerioProject, getDepInversionComuna} ; 