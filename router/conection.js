var mysql = require("mysql");
var util = require("util");

var conn = mysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"car_rental_project"
});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;