exports.profile = function (req, res) {
    // console.log(req.body);
    var message = '';
    var pro_no = global.userid;
    var firstname = req.body.firstname
    var email = req.body.email
    var religion = req.body.religion
    var height = req.body.height
    var weight = req.body.weight
    var country = req.body.country
    var education = req.body.education
    var Salary = Number(req.body.Salary[0])
    var occupation = req.body.Salary[1];
    var gender = req.body.gender;
    var about = req.body.about;
    // console.log(req.files);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var file = req.files.uploaded_image;
    var img_name = file.name;

    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
        var filename;
        filename = "Profile" + pro_no + ".gif"

        file.mv('public/uploaded/' + filename + '', function (err) {
            if (err)
                return res.status(500).send(err);
            var sql = "Insert into profile values(" + pro_no + ",'" + firstname + "','" + email + "','" + religion + "','" + country + "','" + height + "','" + weight + "','" + education + "'," + Salary + ",'" + occupation + "','" + gender + "','" + about + "'); Insert into image_gallery values(NULL," + pro_no + ",'" + filename + "'); Insert INTO SEARCH_PROFILE VALUES(NULL," + pro_no + ",'" + education + "','unmatched');";
            db.query(sql, function (err, result) {
                if (err) throw err;
                res.redirect('/home');
            });
        });
    }
    else {
        message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
        res.render('profile', { message: message });
    }
}



//Signin
exports.app = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var sql = "SELECT * FROM user_login WHERE user_name = '" + email + "' AND user_password = '" + password + "'";
    db.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            var s = JSON.stringify(result);
            var json = JSON.parse(s);
            json.forEach(element => {
                global.userid = element.user_id;
                console.log(global.userid);
            })
            var sql1 = "SELECT * FROM profile WHERE pro_id = " + global.userid + ";";
            db.query(sql1, function (err, result) {
                if (result.length > 0) {
                    var sql2 = "SELECT * FROM success_story where person1id=" + global.userid + " or person2id=" + global.userid + ";";
                    db.query(sql2, function (err, result) {
                        if (result.length > 0) {
                            res.redirect("/logined/" + global.userid + "")
                        }
                        else { res.redirect("/home"); }
                    })
                }
                else {
                    res.render("profile", { message: "", data: result });
                }
            })
        }
        else {
            res.render("signin", { message: "Wrong useraname or password" });
        }

    });
}





exports.signup = function (req, res) {
    
    // userId = Math.floor(Math.random() * 1000);
    username = req.body.username[0];
    password = req.body.pass;
    
    var sql = "Insert into user_login values(NULL,'" + password + "','" + username + "')";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record Inserted");
    })
    res.redirect("/");
}






//profile
exports.prof = function (req, res) {
    var message = '';
    var id = req.params.id;
    // var data,image;
    var sql = "SELECT * FROM profile,image_gallery where image_gallery.pro_id = " + id + " and profile.pro_id=" + id + ";";
    db.query(sql, function (err, result) {
        
        res.render('prof.ejs', { data: result, message: "" });

    });

};

exports.proff = function (req, res) {
    if (req.method == "POST") {
        let id = req.params.id;
        var sql = "Insert into matches values(NULL,'" + global.userid + "','" + id + "');";
        db.query(sql, function (err, result) {
            if (err) { throw err; }
            console.log(result);
            // res.render('proff',{data: result});
        })
        var sql1 = "SELECT * FROM profile,image_gallery where image_gallery.pro_id = " + id + " and profile.pro_id=" + id + ";";
        db.query(sql1, function (err, result) {
            res.render('proff.ejs', { message: "Match request sent", data: result });
        });
    }
    else {
        var message = '';
        var id = req.params.id;
        var data, image;
        var sql = "SELECT * FROM profile,image_gallery where image_gallery.pro_id = " + id + " and profile.pro_id=" + id + ";";
        db.query(sql, function (err, result) {
            
            res.render('proff.ejs', { message: "", data: result });

        });
    }
};

