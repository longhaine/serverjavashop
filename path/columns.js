var express = require('express')
, router = express.Router();

var mysql = require('../app');
router.get('/:table', function (req, res, next) {
    var table = req.params.table;
    var sql = "SHOW columns FROM "+table;
    mysql.conn.query(sql,function(err,results){
        if(err) throw err;
        res.send(results);
    });
});
module.exports = router;