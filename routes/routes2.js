const fs = require('fs');


//Change Profile Picture
exports.changepf =  function (req, res) {
    var sql = "SELECT * FROM profile,image_gallery where image_gallery.pro_id = " + global.userid + " and profile.pro_id=" + global.userid + ";";
    db.query(sql, function (err, result) {
        // console.log(result);
        console.log(req.files,req.body)
        if (!req.files) {
            res.render('prof.ejs', { message: "Upload the image", data: result });
            return;
        }
        
        var file = req.files.newpic;
        var img_name = file.name;
        try {
            if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
                fs.unlinkSync(__dirname + "/../public/uploaded/Profile" + global.userid + ".gif");
                var filename;
                    filename = "Profile" + global.userid + ".gif"
                
                file.mv('public/uploaded/' + filename + '', function (err) {
                    if (err)
                        return res.status(500).send(err);
                })
            }
            else {
                message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                res.render('prof', { message: message ,data: result});
                return res.status(500);
            }
        }
        catch (err) {
            console.log(err);
        }
        res.render('prof',{ message:"Successfully changed",data: result});


    });

}


//Match 
exports.match = function (req, res) {
    let id = req.params.id;
    var sql = "SELECT * FROM MATCHES WHERE matchid=" + id + ";";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        var s = JSON.stringify(result);
        var json = JSON.parse(s);
        var p1 = json[0].fromid;
        var p2 = json[0].toid;
        console.log(p1, p2);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        today = JSON.stringify(today);
        // console.log(result);
        // res.redirect('/prof/' + pro_no);
        var sql1 = "INSERT INTO SUCCESS_STORY values(NULL,'" + today + "'," + p1 + "," + p2 + ");Delete from MATCHES WHERE MATCHID = " + id + ";UPDATE search_profile SET MARITAL_STATUS = 'matched' WHERE pro_id = " + p1 + ";Delete from MATCHES WHERE MATCHID = " + id + ";UPDATE search_profile SET MARITAL_STATUS = 'matched' WHERE pro_id = " + p2 + ";";
        db.query(sql1, function (err, result) {
            if (err) console.log(err);
        })
    });

    res.render('success');
}


//Unmatch
exports.unmatch = function (req, res) {
    var id = req.params.id;
    var sql2 = "SELECT * FROM success_story where person1id=" + id + " or person2id=" + id + ";";
    db.query(sql2, function (err, result) {
        console.log(result);
        var s = JSON.stringify(result);
        var json = JSON.parse(s);
        var sid = json[0].succ_pro_id;
        var p1 = json[0].person1id;
        var p2 = json[0].person2id;
        var sql1 = "Delete from success_story WHERE succ_pro_id = " + sid + ";UPDATE search_profile SET MARITAL_STATUS = 'unmatched' WHERE pro_id = " + p1 + " or pro_id=" + p2 + "";
        db.query(sql1, function (err, result) {
            if (err) console.log(err);
            console.log("Unmatched");
            res.redirect("/home");
        })
    })
}



exports.mcpf = function (req, res) {
    var sql = "SELECT * FROM profile,image_gallery where image_gallery.pro_id = " + global.userid + " and profile.pro_id=" + global.userid + ";";
    db.query(sql, function (err, result) {
        // console.log(result);
        console.log(req.files,req.body)
        if (!req.files) {
            res.render('prof.ejs', { message: "Upload the image", data: result });
            return;
        }
        
        var file = req.files.newpic;
        var img_name = file.name;
        try {
            if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
                fs.unlinkSync(__dirname + "/../public/uploaded/Profile" + global.userid + ".gif");
                var filename;
                    filename = "Profile" + global.userid + ".gif"
                
                file.mv('public/uploaded/' + filename + '', function (err) {
                    if (err)
                        return res.status(500).send(err);
                })
            }
            else {
                message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                res.render('prof', { message: message ,data: result});
                return res.status(500);
            }
        }
        catch (err) {
            console.log(err);
        }
        res.render('matprof.ejs',{ message:"Successfully changed",data: result});


    });

}