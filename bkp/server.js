const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");

const api = require("./server/routes/api");
const port = 3002;

const app = express();

app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use('/api', api);
app.use('*',(req, res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

app.listen(port,function(){
    console.log('server running in port' + port);
});