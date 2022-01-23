
const express = require("express");
var app = express();
var mysql = require("mysql");
var path = require('path')
const con = require("./routes/connection");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var fs = require("fs");
app.set('view engine', 'ejs');
const routes = require('./routes/routes');
const routes2 = require('./routes/routes2');
const edits = require('./routes/edit');
var dashboard = require('./routes/dashboard');
var fileUpload = require('express-fileupload');
const home = require('./routes/home')
app.use(fileUpload());

app.use(express.static(path.join(__dirname, 'public')));


// const router = express.Router();

//connect to DBMS
con.connect();
global.db = con;
//SAVE UserID
global.userid = "";

app.get("/", function (req, res) {
    res.render("signin", { message: "" });
});

//home
app.get("/home", home.home)


app.post("/", routes.app); //post request for login page.


app.get("/signup", function (req, res) {
    res.render("signup");
});

app.post("/signup", routes.signup);


app.get("/profile", function (req, res) {
    res.render("profile")
})

//
app.post("/profile", routes.profile);

//
app.get("/dashboard", dashboard.dashboard);




app.get('/matches', function (req, res) {
    var sql1 = "SELECT * FROM profile INNER JOIN MATCHES ON MATCHES.fromid=profile.pro_id inner join image_gallery on image_gallery.pro_id=profile.pro_id where matches.toid='" + global.userid + "' ;";
    db.query(sql1, function (err, result) {
        res.render('matches', { message: "", data: result });
    });
})


app.get('/prof/:id', routes.prof);
app.get('/proff/:id', routes.proff);



app.post('/proff/:id',routes.proff)

app.get('/logined/:id', function (req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM profile,image_gallery where image_gallery.pro_id = " + id + " and profile.pro_id=" + id + ";";
    db.query(sql, function (err, result) {
        res.render('matprof.ejs', {message:"", data: result });

    });
})


//unmatch
app.post('/unmatch/:id', routes2.unmatch)

//change profile picture
app.post('/change',routes2.changepf)


app.get('/edit', edits.getedit)


//edit profile
app.post('/edit', edits.edit)


app.all('/download', (req, res) => {
    res.download("./public/uploaded/Profile10.gif");
})

//match the profile in routes 2
app.post('/matches/:id',routes2.match )


app.listen(3000, function () {
    console.log("running on 3000");
});

