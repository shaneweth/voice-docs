const db = require("../models");
var formidable = require("formidable");
var util = require("util");
var fs = require("fs");

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

    // app.get("/", function(req, res){
    //     res.json(__dirname + "/");
    // });

    app.post("/api/projects", function (req, res) {

        //ADD CODE FOR FILE POSITING HERE
        //it will use req.files


        db.Project.create(req.body).then(function (dbProject) {
            res.json(dbProject);
        });
    });


    app.post("/api/upload", function (req, res) {
        // var localStorage;
        var form = new formidable.IncomingForm();

        form.uploadDir = __dirname + "/";

        form.on("file", function(field, file) {
            fs.rename(file.path, form.uploadDir + "")
        })

        form.parse(req, function (err, field, file) {
            // writes the json to a page
            // res.writeHead(200, { 'content-type': 'text/plain' });
            // res.write('received upload:\n\n');
            // res.end(util.inspect({ fields: fields, files: files }));
        })

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