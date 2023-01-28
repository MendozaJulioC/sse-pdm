
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



app.listen(process.env.AWS_PORT,()=>{ console.log(`Servidor activo ${process.env.AWS_PORT} `);})