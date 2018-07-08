var express = require('express')
, router = express.Router();

var mysql = require('../app');
router.get('/:table/:id', function (req, res, next) {
    var table = req.params.table;
    var id = req.params.id;
    var sql = "delete from "+table+" where id = "+id;
    mysql.conn.query(sql,function(err,results){
        if(err) throw err;
        return res.json({
            message : "success"
        })
    });
});
module.exports = router;