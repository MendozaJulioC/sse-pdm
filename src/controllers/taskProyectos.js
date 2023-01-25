const XLSX = require('xlsx');
const { aws_pool } = require('../sql/dbConfig');

const getProyectos= async (req, res)=>{
    try {
       // makeProjects()
        const response = await aws_pool.query(`select * from proyectos.tbl_proyectos`)
        res.status(200).json({ data: response.rows }); 
    } catch (error) {
        console.error('Error getProyectos ');
        
    }
}

const makeProjects = async(req, res)=>{
    const excel= XLSX.readFile('/Users/juliocesarmendoza/Desktop/pipApp/Backend-pi/src/public/uploads/Estructuracion.xlsx') 
    var nombreHoja = excel.SheetNames;
    var datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);

    // se debe crear una consulta por cada proyecto para ver si existe en la tabla de lo contrario agregarlo
    for (let i=0; i<datos.length; i++){
      
        await aws_pool.query(`
            INSERT INTO proyectos.tbl_proyectos(cod_dependencia, espp ,cod_proyecto,nom_proyecto, vigencia,objetivos)
            VALUES	(   ${datos[i].CodDep},
                        ${datos[i].EsPP},
                        '${datos[i].CodProyecto}',
                        '${datos[i].NombreProyecto}',
                        ${datos[i].vigencia},
                        '${datos[i].Objetivo}'
            );
        `);  
  
  
        console.log(datos[i].CodProyecto, " - ",datos[i].NombreProyecto," -Ok" )  
      
      }

}

module.exports={getProyectos }    