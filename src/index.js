
require('dotenv').config();
const app = require('./app');
const morgan = require ('morgan');
//Settings
//app.set('port',process.env.PORT)
//middlewares
app.use(morgan('dev'));
app.use(require('./routes/index'));
app.use(require('./routes/auth'));
app.use(require('./routes/admin'))
//Star server



app.listen(process.env.PORT||7800,()=>{ console.log('Servidor activo...');})