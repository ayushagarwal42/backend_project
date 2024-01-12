const express = require("express")
const app = express();
const multer = require('multer');
require("./database/db")
require("./utils/commonFunctions")

const cron = require('node-cron');
const fs=require('fs');

// to set the view engine
app.set('view engine','hbs');
app.get("",(req,res)=>{
    res.render('index',{
        name:"Ayush",
    });
});

// cron.schedule('*/10 * * * * *',function(){
//     let data="hi its ayush running cron job\n";
//     fs.appendFile('logs.txt',data,function(err){
//         if(err) throw err;
//         console.log("file data added");
//     });
// });



console.log('-----------------------------------------')
const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use urlencoded to handle form data
// app.use(multer().none());
// app.use(errorHandler);
const responseHandler = require('./middlewares/responseHandler')
app.use('/', responseHandler);

const userRoute = require("./routes/userRoutes")
app.use("/", userRoute);

const ingredientRoutes=require('./routes/ingredientRoutes');
app.use('/',ingredientRoutes);

const categoryRoutes=require('./routes/categoryRoutes');
app.use('/',categoryRoutes);

const storeRoutes=require('./routes/storeRoutes');
app.use('/',storeRoutes);

const contentRoutes=require('./routes/contentRoutes');

app.use('/',contentRoutes);

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, res, cb) {
//             cb(null, 'uploads')
//         },
//         filename: function (req, file, cb) {
//             cb(null, file.fieldname + "-" + Date.now() + ".jpg")
//         }
//     })
// }).single("icon")

// app.post("/uploads",upload,(req, res) => {
//     res.send("file uploaded")
// })


const port = 5000;
app.listen(port, () => {
    console.log(`Server Is Running On Port:${port}`)
})