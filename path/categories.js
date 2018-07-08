var express = require('express')
, router = express.Router();

var mysql = require('../app');
router.get('/', function (req, res) {
    var sql = `SELECT * FROM categories`;
    mysql.conn.query(sql,[req.params.gender],function(err,results){
        if(err) throw err;
        res.send(results);
    });
});
router.get('/distinct',function(req, res){
    var sql = `SELECT DISTINCT specifics.name, stuff.name as nameS FROM specifics 
    inner join stuff on specifics.id_stuff = stuff.id`;
    mysql.conn.query(sql,function(err,results){
        if(err) throw err;
        res.send(results);
    });
});
module.exports = router;