
"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};




if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

//===============================Rec Audio Function================================

//const MicRecorder = require('mic-recorder-to-mp3');
//
//const button = document.querySelector('button');
//    const recorder = new MicRecorder({
//      bitRate: 128
//    });
//
//    button.addEventListener('click', startRecording);
//
//    function startRecording() {
//      recorder.start().then(() => {
//        button.textContent = 'Stop recording';
//        button.classList.toggle('btn-danger');
//        button.removeEventListener('click', startRecording);
//        button.addEventListener('click', stopRecording);
//      }).catch((e) => {
//        console.error(e);
//      });
//    }
//
//    function stopRecording() {
//      recorder.stop().getMp3().then(([buffer, blob]) => {
//        console.log(buffer, blob);
//        const file = new File(buffer, 'music.mp3', {
//          type: blob.type,
//          lastModified: Date.now()
//        });
//
//        const li = document.createElement('li');
//        const player = new Audio(URL.createObjectURL(file));
//        player.controls = true;
//        li.appendChild(player);
//        document.querySelector('#playlist').appendChild(li);
//
//        button.textContent = 'Start recording';
//        button.classList.toggle('btn-danger');
//        button.removeEventListener('click', stopRecording);
//        button.addEventListener('click', startRecording);
//      }).catch((e) => {
//        console.error(e);
//      });
//    }