require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var formidable = require("formidable");
var fs = require("fs");
var bodyParser = require("body-parser");


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
// bodyParser for upload
app.use(bodyParser.urlencoded({extended: true}));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/userApiRoutes")(app);
require("./routes/projectApiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

// // Set Storage
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads")
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now())
//   }
// })

// var upload = multer({ storage: storage })

// app.post("/uploads", upload.single("myFile"), (req, res, next) => {
//   const file = req.file
//   if (!file) {
//     const error = new Error("Please Upload Stuff, fool")
//     error.httpStatusCode = 400
//     return next(error)
//   }
//   res.send(file)
// })

module.exports = app;
