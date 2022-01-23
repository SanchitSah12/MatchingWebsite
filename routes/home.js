
//Home Page Export
exports.home = function (req, res) {
    var sql = "SELECT * FROM image_gallery inner JOIN success_story on image_gallery.pro_id=success_story.person1id";
    var sql1 = "SELECT * FROM image_gallery inner JOIN success_story on image_gallery.pro_id=success_story.person2id";
    db.query(sql, function (err, result1) {
        if (err) console.log(err)
        // console.log(result1)
        db.query(sql1, function (err, result) {
            console.log(result.length, result1)
            res.render("home", { id: global.userid, img1: result, img2: result1 })
        })

    })

}