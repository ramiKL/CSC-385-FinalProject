require('dotenv').config()
const express = require('express')
const path = require('path')
const verifyJWT = require('./middleware/JWTverify')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/DBconnection')
const bodyParser = require('body-parser')
const app = express()

connectDB()

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())

app.use(express.static(path.join(__dirname)))
app.use(express.static(path.join(__dirname,'views')))

//connecting to mongoDB
mongoose.connection.once('open', ()=>{
    console.log("Connected to mongodb hurray!!")

    //setting the routes in server
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))





app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname ,'views','/loginpage.html'))
    
})
app.post('/register',async(req,res)=>{
    const user=req.body.user;
    console.log(user)
})
app.post('/login',async(req,res)=>{
    const user=req.body.user;
    console.log(user)

})




    
    app.listen(5056, ()=>{
        console.log("server running...")
    })
})