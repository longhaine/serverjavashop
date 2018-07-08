var express = require('express')
, router = express.Router();

var mysql = require('../app');
router.get('/', function (req, res, next) {
    var sql = "select * from brands";
    mysql.conn.query(sql,function(err,results){
        if(err) throw err;
        res.send(results);
    });
});
module.exports = router;