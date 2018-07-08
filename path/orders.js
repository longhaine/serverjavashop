var express = require('express')
, router = express.Router();

var mysql = require('../app');
router.post('/', function (req, res, next) {
    var params = {
        email : req.body.order.email,
        name : req.body.order.name,
        address : req.body.order.address,
        phone : req.body.order.phone,
        sessionId : req.body.order.sessionId,
        price : req.body.price
    }
    var sql = "INSERT INTO orders SET ?";
    mysql.conn.query(sql,params,function(err,results){
        if(err) throw err;
        return res.json({
            idOrder : results.insertId
        })
    });
});
router.get('/guest/:sessionId', function (req, res, next) {
    var sql = "SELECT * FROM orders WHERE sessionId =  ?  ORDER BY id DESC";
    mysql.conn.query(sql,[req.params.sessionId],function(err,results){
        if(err) throw err;
        res.send(results);
    });
});
router.get('/email/:email', function (req, res, next) {
    var sql = "SELECT * FROM orders WHERE email =  ?  ORDER BY id DESC";
    mysql.conn.query(sql,[req.params.email],function(err,results){
        if(err) throw err;
        res.send(results);
    });
});
router.get('/checkguest/:sessionId/:id', function (req, res, next) {
    var sql = "SELECT * FROM orders WHERE id =  ? and sessionId = ?";
    mysql.conn.query(sql,[req.params.id,req.params.sessionId],function(err,results){
        if(err) throw err;
        if(results[0]){
            return res.json({
                message: true
            })
        }
        else{
            return res.json({
                message: false
            })
        }
    });
});
router.get('/checkuser/:email/:id', function (req, res, next) {
    var sql = "SELECT * FROM orders WHERE id =  ? and email = ?";
    mysql.conn.query(sql,[req.params.id,req.params.email],function(err,results){
        if(err) throw err;
        if(results[0]){
            return res.json({
                message: true
            })
        }
        else{
            return res.json({
                message: false
            })
        }
    });
});
module.exports = router;