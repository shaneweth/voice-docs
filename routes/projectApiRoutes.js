const db = require("../models");
var formidable = require("formidable");
var util = require("util");
var fs = require("fs-extra");

module.exports = function (app) {
    app.get("/api/projects", function (req, res) {
        let query = {};
        if (req.query.oid) {
            query.oid = req.query.oid;
        }

        db.Project.findAll({
            where: query,
            include: [db.User],
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.get("/api/projects/:id", function (req, res) {
        db.Project.findOne({
            where: {
                id: req.params.pid
            },
            include: [db.User]
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    // app.post("/api/projects", function (req, res) {

    //     //ADD CODE FOR FILE POSITING HERE
    //     //it will use req.files


    //     db.Project.create(req.body).then(function (dbProject) {
    //         res.json(dbProject);
    //     });
    // });


    app.post("/api/upload", function (req, res) {
        // var localStorage;
        var form = new formidable.IncomingForm();

        form.uploadDir = __dirname + "/";

        form.parse(req, function (err, field, file) {
            // writes the json to a page
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload:\n\n');
            res.end(util.inspect({ file: file }));
        })

        form.on("end", function (fields, files) {
            // temp loc of uploaded file
            var temp_path = this.openedFiles[0].path;
            // file name of uploaded file
            var file_name = this.openedFiles[0].name;
            // new local file loc
            var new_location = "/Users/shane/git/voice-docs/public/audio/";

            fs.copy(temp_path, new_location + file_name, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("yessirrr!!")
                    console.log(new_location);
                }
            });
        });
        return;

    });

    app.delete("/api/projects/:id", function (req, res) {
        db.Project.destroy({
            where: {
                id: req.params.pid
            }
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.put("/api/projects", function (req, res) {
        db.Project.update(
            req.body, {
                where: {
                    id: req.body.pid
                }
            }).then(function (dbProject) {
                res.json(dbProject);
            });
    });
}