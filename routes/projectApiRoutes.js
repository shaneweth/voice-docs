require("express-fileupload");
const db = require("../models");
const aws = require('aws-sdk');
const dotenv = require('dotenv');

const burger = require('../models/projects.js');

const router = express.Router();

dotenv.config();

// aws.config.update({
//     accessKeyId: process.env.accessKeyId,
//     secretAccessKey: process.env.secretAccessKey
// });
aws.config.update({
    accessKeyId: "AKIATXD362LLNJQHIAKW",
    secretAccessKey: "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"
});

module.exports = function (app) {
    // ------------
    router.get("/api/projects", function (req, res) {
        burger.selectAll(function (data) {
            var hbsObject = { burgers: data };
            res.render('/', hbsObject);
          });

// ------------
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

    app.get("/api/projects/:title/:oName", function (req, res) {
        const s3 = new aws.S3();

        db.Project.findOne({
            where: {
                title: req.params.title,
                oName: req.params.oName,
            },
            include: [db.User]
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.post("/api/projects", function (req, res) {
        const s3 = new aws.S3();

        console.log(req.files[0]);

        let file = req.files[0];
        let buffer = file.buffer;

        let params = {
            Bucket: 'teamawesome55',
            ACL: 'public-read',
            Body: buffer,
            Key: req.body.oName + "/" + req.body.title + "/" + file.originalname,
        }

        s3.upload(params, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log(data);
                let newProject = {
                    title: req.body.title,
                    description: req.body.description,
                    category: req.body.category,
                    location: req.body.location,
                    oName: req.body.oName,
                    Username: req.body.oName,
                    mainFile: data.Location,
                }

                db.User.findOne({
                    where: {
                        username: newProject.oName,
                    }
                }).then(function(dbUser) {
                    let projects = dbUser.pNames;
                    console.log("\n\n\n" + projects + "\n\n\n");
                    if(projects === "null" || projects === null)
                        projects = newProject.title + ",";
                    else
                        projects += newProject.title + ",";

                    db.User.update(
                        {pNames: projects},
                        {returning: true, where: {username: newProject.oName}}
                    ).then(function(data) {
                        console.log(data);
                    });
                })

                db.Project.create(newProject).then(function (dbProject) {
                    res.json(dbProject);
                });
            }
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