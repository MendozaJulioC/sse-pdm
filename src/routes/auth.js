const { Router} = require('express');
const routerAuth = Router();



//validar email en el registro, si existe o no
//registrar usuario nuevo

//validar la constaseña



const { getEmail, postRegisterUser, getIdLoguin   }= require('../controllers/auth.controllers');

routerAuth.get('/auth/api/validatemail/:email', getEmail);
routerAuth.post('/auth/api/register',postRegisterUser);
routerAuth.get('/auth/api/id/:id',getIdLoguin)

//routerAuth.post('/auth/users/loguin', postLoguin)




module.exports = routerAuth;   