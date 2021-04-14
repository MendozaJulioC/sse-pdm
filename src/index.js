
require('dotenv').config();
const app = require('./app');
const morgan = require ('morgan');
//Settings
//app.set('port',process.env.PORT)
//middlewares
app.use(morgan('dev'));
app.use(require('./routes/index'));
app.use(require('./routes/auth'));
//Star server



app.listen(process.env.PORT||7000,()=>{ console.log('Servidor activo...');})