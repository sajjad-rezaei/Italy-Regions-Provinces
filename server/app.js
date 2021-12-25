const express = require('express');
const italy = require('./italy');
const app = express();
const port = 2000;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get("/",(req,res)=>{
    res.send(italy);
});
app.get("/:region",(req,res)=>{
    res.send(italy.find(item => { return item.region_name == req.params.region }));
});


app.listen(port,() => {
    console.log(`app is running on port ${port}`);
});