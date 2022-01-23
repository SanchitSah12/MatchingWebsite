// Code for Dashboards

exports.dashboard = function (req, res) {

    var gender;
    var id = global.userid;
    var sql = "SELECT * FROM profile,image_gallery where image_gallery.pro_id = " + id + " and profile.pro_id=" + id + ";";
    db.query(sql, function (err, result) {
        if (err) console.log(err);
        image = result;
        var s = JSON.stringify(result);
        var json = JSON.parse(s);
        if (json[0].gender == 'Male') {
            gender = "Female";
        }
        else {
            gender = "Male"
        }
        console.log(gender);
        
        var sql1 = "SELECT * FROM profile inner join search_profile on profile.pro_id=search_profile.pro_id inner join image_gallery on image_gallery.pro_id=profile.pro_id where search_profile.MARITAL_STATUS='unmatched' and profile.gender='" + gender + "'"
        db.query(sql1, function (err, result1) {
            if (err) console.log(err)
            var s = JSON.stringify(result1);
            var json = JSON.parse(s);
            console.log(json);
            res.render('dashboard', { data: json });
        });
        
    });
}