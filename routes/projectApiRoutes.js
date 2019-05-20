const db = require("../models");

module.exports = function (app) {
    app.get("/api/projects", function (req, res) {
        let query = {};
        if (req.query.oName) {
            query.oName = req.query.oName;
        }

        db.Project.findAll({
            where: query,
            include: [db.User],
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.get("/api/projects/:title", function (req, res) {
        db.Project.findOne({
            where: {
                title: req.params.title
            },
            include: [db.User]
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.post("/api/projects", function (req, res) {

        //ADD CODE FOR FILE POSITING HERE
        //it will use req.files

        db.Project.create(req.body).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.delete("/api/projects/:title", function (req, res) {
        db.Project.destroy({
            where: {
                title: req.params.title
            }
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.put("/api/projects", function (req, res) {
        db.Project.update(
            req.body,
            {
                where: {
                    title: req.body.title
                }
            }).then(function (dbProject) {
                res.json(dbProject);
            });
    });
}