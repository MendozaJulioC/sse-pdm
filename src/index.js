
require('dotenv').config();
const app = require('./app');
const morgan = require ('morgan');
//Settings
app.set('port',process.env.port)
//middlewares
app.use(morgan('dev'));
app.use(require('./routes/index'));
//Star server


app.listen((process.env.PORT || 5000), function(){ console.log('listening on *:5000'); }); 