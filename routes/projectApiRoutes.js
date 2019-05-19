const db = require("../models");

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

    app.post("/api/projects", function (req, res) {

        //ADD CODE FOR FILE POSITING HERE
        //it will use req.files

        
        db.Project.create(req.body).then(function (dbProject) {
            res.json(dbProject);
        });
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
            req.body,
            {
                where: {
                    id: req.body.pid
                }
            }).then(function (dbProject) {
                res.json(dbProject);
            });
    });
}