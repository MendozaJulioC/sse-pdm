
require('dotenv').config();
const app = require('./app');
const morgan = require ('morgan');
const multer = require('multer');
const path = require('path');



//Settings
app.set('port',process.env.port||4000)

//middlewares
app.use(morgan('dev'));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        cd(null, new Date().getTime()+ path.extname(file.originalname));
    }
});

app.use(multer({storage}).single('image'));

//routes
app.use(require('./routes/index'));



//Star server
app.listen(app.get('port'),()=>{
    console.log ('Server Port', app.get('port'));
})