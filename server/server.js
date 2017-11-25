//Modules import

var express = require('express');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');

const app = express()
const port = 3000;

//Route file
const users = require('./routes/users');
const config = require('./config/database');

//database connection

var connection = mysql.createConnection({
  
      host:config.host,
      user:config.user,
      password:config.password,
      database:config.database,
  
  })
  
  connection.connect((err)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log('connected to to database')
    }
  });

//Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Statis folder
app.use(express.static(path.join(__dirname,"public")))

//Routes
app.get('/',(req,res)=>{

res.send("Invalid Endpoint");

});

app.use('/users',users);



//Port and Connection
app.listen(port,()=>{
  console.log('Server started on port: '+port)
})













