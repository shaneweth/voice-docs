// Require orm
const orm = require('../config/orm.js');


// create the code that will call the ORM functions using burger specific input for the ORM.
var project = {

  selectAll: function (callback) {
    orm.selectAll(function (res) {
      callback(res);
    });
  }
};


// Export at the end of the burger.js file.
module.exports = burger;