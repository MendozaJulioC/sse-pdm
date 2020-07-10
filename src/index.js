
require('dotenv').config();
const app = require('./app');
const morgan = require ('morgan');
//const multer = require('multer');



//Settings
app.set('port',process.env.port||3000)

//middlewares
app.use(morgan('dev'));
app.use(require('./routes/index'));

//Star server
app.listen(app.get('port'),()=>{
    console.log ('Server Port', app.get('port'));
})





/* const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        cd(null, new Date().getTime()+ path.extname(file.originalname));
    }
});

app.use(multer({storage}).single('image')); */

//routes