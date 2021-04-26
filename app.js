const express=require("express")
const db = require("./db");
const path = require("path");
const dotenv = require("dotenv")
dotenv.config({path:'./.env'})


const port = 3300;
const app=express()
//body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//static folder
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine','hbs')
const connection = db.getConnection();
connection.connect((error)=>{
 if(error){
    console.log(error)
 }else{
     console.log("db connected")
 }
})
app.use('/',require('./routes/page'))
app.use('/auth',require('./routes/auth'))
app.listen(port,()=>{
     console.log(`server listen at ${port}`)
})