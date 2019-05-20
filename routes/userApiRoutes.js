var db = require("../models");

module.exports = function (app) {
  //get all users
  //not sure of any current uses for this but here it is
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  //get specific user function
  //this can be used for project collaboration requests in later iterations
  app.get("/api/users/:username", function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.username
      },
      include: [db.Project],
    }).then(function (dbUser) {

    });
  })

  //login function
  //current one is only temporary until we implement an actual
  //authentication technology
  app.get("/api/users/:username/:password", function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.username,
        password: req.params.password,
      },
      include: [db.Project],
    }).then(function (dbUser) {

    });
  })

  //create a new user
  app.post("/api/users", function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.username,
      }
    }).then(function (dbUser) {
      if(dbUser) {
        res.send("user already exists");
      }
      else {
        let newUser = {
          username: req.body.username,
          password: req.body.password,
        }
    
        db.User.create(newUser).then(function (dbNew) {
          res.json(dbNew);
        });
      }
    })
  });

  //delete a user by id, not sure of current use cases
  //but i could think of a few reasons to add in later iterations
  app.delete("/api/users/:uid", function (req, res) {
    db.Example.destroy({ where: { username: req.params.username } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.put("/api/users", function (req, res) {
    db.User.update(
      req.body,
      {
        where: {
          username: req.body.username,
        },
      }).then(function (dbUser) {

      });
  });
};