exports.edit = function (req, res) {
    var pro_no = global.userid;

    var email = req.body.email

    var height = req.body.height
    var weight = req.body.weight

    var education = req.body.education
    var Salary = Number(req.body.Salary[0])
    var occupation = req.body.Salary[1];

    var about = req.body.about;

    var sql = "UPDATE profile SET email_id = '" + email + "', height = '" + height + "',education='" + education + "',weight = '" + weight + "', salary = " + Salary + ", occupation = '" + occupation + "', about = '" + about + "' WHERE (pro_id = " + pro_no + ");";
    db.query(sql, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.redirect('/prof/' + pro_no);
    });


}


exports.getedit = function (req, res) {
    var sql1 = "SELECT * FROM profile where pro_id = " + global.userid + ";";
    db.query(sql1, function (err, result1) {
        if (err) console.log(err)
        // console.log(result1)
        var s = JSON.stringify(result1);
        var json = JSON.parse(s);
        // console.log(json);
        res.render('edit', { message: '', data: json[0] });

    });
}