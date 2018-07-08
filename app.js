var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
exports.conn = mysql.createConnection({
    host: "65.19.141.67",
    user: "longhaip_admin",
    password: "caiginuaday",
    database: "longhaip_javashop"
});
exports.query = function (sql, callback) {
    con.query(sql, function (err, results) {
        if (err) throw err;
        return callback(results);
    })
}
app.use(require('./path'));
app.listen(process.env.PORT || 3000,function(){
    console.log('running babe');
});