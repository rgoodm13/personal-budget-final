const express = require('express');
const app = express();
var cors = require('cors')
const port = 3001;

app.use(cors());

const budget = require('./budgData.json');

app.get('/hello', (req,res) =>{
    res.send('hello world!');
});

app.get('/budget', (req,res) =>{
    res.json(budget);
});

app.listen(port, () => {
    console.log('example app listening at http://localhost:${port}');
});