var express = require("express");
var router = express.Router();
var exe = require("./conection");


router.get("/",async function(req,res){

    var data=await exe(`SELECT * FROM company_details`);
    var obj={"data":data[0]};
    
    res.render("user/home.ejs",obj);
});

router.get("/about",async function(req,res){
    var data=await exe(`SELECT * FROM company_details`);
    var obj={"data":data[0]};
    res.render("user/about.ejs",obj);
})

router.get("/servise",async function(req,res){
    var data=await exe(`SELECT * FROM company_details`);
    var obj={"data":data[0]};
    res.render("user/service.ejs",obj)
})

router.get("/blog",async function(req,res){
    var data=await exe(`SELECT * FROM company_details`);
    var obj={"data":data[0]};
    res.render("user/blog.ejs",obj)
});

router.get("/contag",async function(req,res){
    var data=await exe(`SELECT * FROM company_details`);
    var obj={"data":data[0]};
    res.render("user/contag.ejs",obj)
});

router.post("/make_trip",async function(req,res){
    var d=req.body;
    var sql=`INSERT INTO make_trip(pick_up_location,pick_up_time,drop_off_time,pick_up_date,drop_off_date)
    VALUES ('${d.location}','${d.pick_up_time}','${d.drop_off_time}','${d.pick_up_date}','${d.drop_off_date}')`;

    var data=await exe(sql);
   // res.send(data);
   res.redirect("/");
    
});

module.exports = router;