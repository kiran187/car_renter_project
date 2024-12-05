



var express = require("express");
var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var adminroute = require("./router/admin_router");
var userroute = require("./router/user_router");

var app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(express.static("public/"));


app.use("/admin",adminroute);
app.use("/",userroute);

app.listen(1000);

