var express = require("express");
var router = express.Router();
var exe = require("./conection");
router.get("/",function(req,res){
    
    res.render("admin/home.ejs");
});

router.get("/transactions",async function(req,res){
    var data=await exe(`SELECT * FROM company_details`);
    var obj={"old_data":data[0]};
    
    
    res.render("admin/transactions.ejs",obj);
});

router.get("/account", function(req,res){
    res.render("admin/account.ejs")
});

router.post("/submit_company_info",async function(req,res){
    

    var d=req.body;
    var sql=`
    UPDATE company_details
SET address = '${d.address}', phone_number = '${d.phone}',business_hours='${d.time}',linkedin_link='${d.linkedin}',
facebook_link= '${d.facebook}',whatsapp_link='${d.whatsapp}'
WHERE company_details_id = 1;`
var data=await exe(sql);

//res.send(data);
res.redirect("/admin/transactions");
    
});

router.get("/make_trip",async function(req,res){
    var data=await exe(`SELECT * FROM make_trip`);
    var obj={"old_data":data};
    //res.send(obj)
    res.render("admin/make_trip.ejs",obj)
});

router.get("/delete/:id",async function(req,res){
    var id=req.params.id;

    var sql=`DELETE FROM make_trip WHERE make_trip_id='${id}'`;
    var data=await exe(sql);

    //res.send(data);
    res.redirect("/admin/make_trip");

});
router.get("/edite/:id",async function(req,res){
    var data=await exe(`SELECT * FROM make_trip`);
    var obj={"old_data":data[0]};
    res.render("admin/edite_trip.ejs",obj);
});


router.post("/submit",async function(req,res){
    var d=req.body;
    var sql=`UPDATE make_trip
SET pick_up_location = '${d.location}', pick_up_time = '${d.pick_up_time}', drop_off_time= '${d.drop_off_time}',
pick_up_date ='${d.pick_up_date}',drop_off_date = '${d.drop_off_date}'
WHERE make_trip_id ='${d.make_trip_id}'`;

var data=await exe(sql);
//res.send(data);
res.redirect("/admin/make_trip")

});

router.get("/slider",async function(req,res){
    var data=await exe(`SELECT * FROM slider`);
    var obj={"old_data":data[0]};
    res.render("admin/slider.ejs",obj);
})

router.post("/submit_form",async function(req,res){

    if(req.files != null){
        var files_name = new Date().getTime() + req.files.image_path.name;
        req.files.image_path.mv("public/uploads/"+files_name);
        var sql2=`UPDATE slider
SET image_path = '${files_name}' WHERE slider_id=1`
var data2=await exe(sql2);
//res.send(data2)
};

var d=req.body;
    var sql=`UPDATE slider
SET heading = '${d.heading}', details = '${d.details}'
WHERE slider_id = 1;
`

var data=await exe(sql);
    //res.send(data);

    res.redirect("/admin/slider")


});

router.get("/Car_Booking",async function(req,res){
    var data=await exe(`SELECT * FROM car_bookings`);

    var obj={"old_data":data};
    res.render("admin/Car_Booking.ejs",obj);
})

router.post("/submit_car_booking",async function(req,res){


    var files_name = new Date().getTime() + req.files.background_img.name;
        req.files.background_img.mv("public/uploads/"+files_name);


    var d=req.body;
    var sql=`INSERT INTO car_bookings(car_name,excluding_fees,h1_tag,p_tag,special_discount,off_button_background_img)
    VALUES ('${d.car_name}','${d.excluding_fees}','${d.h1_tag}','${d.p_tag}','${d.special_discount}','${files_name

    }')`;

    var data=await exe(sql);
    //res.send(data);
    res.redirect("/admin/Car_Booking")
});

router.get("/car_bookings_delete/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`DELETE FROM car_bookings WHERE car_bookings_id='${id}'`);
    
   // res.send(data);
   res.redirect("/admin/Car_Booking")
});

router.get("/car_bookings_update/:id",async function(req,res){
    var data=await exe(`SELECT * FROM car_bookings`);
    var obj={"old_data":data[0]};
    res.render("admin/car_bookings_update.ejs",obj);
});

router.post("/submit_car_booking_update",async function(req,res){

    var d=req.body;

    if(req.files != null){
        var files_name = new Date().getTime() + req.files.background_img.name;
        req.files.background_img.mv("public/uploads/"+files_name);
        var sql2=`UPDATE car_bookings
SET off_button_background_img = '${files_name}' WHERE off_button_background_img='${d.car_id}'`
var data2=await exe(sql2);
//res.send(data2)
};

    
    var sql=`UPDATE car_bookings
SET car_name = '${d.car_name}', excluding_fees  = '${d.excluding_fees}', h1_tag='${d.h1_tag}',p_tag='${d.p_tag}',special_discount='${d.special_discount}'

WHERE car_bookings_id='${d.car_id}'`;

var data=await exe(sql);

//res.send(data);
res.redirect("/admin/Car_Booking");
})



module.exports = router;



