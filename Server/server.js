const express = require('express');
const app = express();
var cors = require('cors')
const port = 3001;
const mysql = require('mysql');
var sha1 = require('js-sha1');
const bodyParser = require("body-parser");
app.use(cors());

const budget = require('./budgData.json');
const { default: Axios } = require('axios');



var connection = mysql.createConnection({
    host: 'sql9.freemysqlhosting.net',
    user: 'sql9374537',
    password: 'nrJVyYBjgv',
    database: 'sql9374537'

});


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));



app.post('/api/signup', (req, res)=> {
    console.log(req.body.username);
    console.log(req.body.password);
    const{username, password} =req.body;
    const pwd = sha1(password);
    var dt = new Date().toISOString().split("T")[0];
    console.log(dt);
    connection.query('INSERT INTO users VALUES ("",?,?,?)',[username,pwd,dt], function(error, results, fields) {
       if(error){
           console.log(error);
       }
            res.json(200);
    
        });
    });

    app.post('/api/login', (req, res)=> {
        console.log(req.body.username);
        console.log(req.body.password);
        const{username, password} =req.body;
        const pwd = sha1(password);
        connection.query('SELECT * FROM users WHERE username=? AND password=?',[username,pwd], function(error, results, fields) {
            if(error){
                console.log(error);
                res.json(500)
            } else if(results.length>0){
                res.json(200);
            } else 
                res.json(403);
        });
    
    });


    app.get('/api/userBudg',async (req, res)=> {
    
        connection.query('SELECT * FROM budget', function(error, results, fields ) {
           
            if(error) throw error;
            console.log(results);
            res.json(results);
        });
    
    });

    app.post('/api/addData', (req, res)=> {
        console.log(req.body.title);
        console.log(req.body.budget);
        console.log(req.body.color);
        const{title, budget, color} =req.body;
        
        connection.query('INSERT INTO budget VALUES ("",?,?,?)',[title,budget,color], function(error, results, fields) {
           if(error){
               console.log(error);
           }
                res.json(200);
        
            });
        });




app.get('/budget', (req,res) =>{
    console.log(budget);
    res.json(budget);
});

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`);
});