require("express-fileupload");
const db = require("../models");
const aws = require('aws-sdk');

// Node Dependencies
const express = require('express');
const router = express.Router();
// testing

let s3 = new aws.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
  });

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


// Index Redirect
router.get('/', function (req, res) {
    res.redirect('/');
  });
  
  
  // Index Page (render all burgers)
  router.get('/index', function (req, res) {
    project.selectAll(function (data) {
      var hbsObject = { projects: data };
      //console.log(hbsObject);
      res.render('index', hbsObject);
    });
  });

    // ------------------------

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

        // console.log(req.files[0]);

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