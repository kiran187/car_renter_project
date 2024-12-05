var mysql = require("mysql");
var util = require("util");

var conn = mysql.createConnection({
    "host":"btqg8tqnrwdd0lc4s8ph-mysql.services.clever-cloud.com",
    "user":"uwnlq1uln6ddx5sz",
    "password":"5os7ZIEFqOkbBUCj9j4X",
    "database":"btqg8tqnrwdd0lc4s8ph"
});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;
