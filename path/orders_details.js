var express = require('express')
, router = express.Router();

var mysql = require('../app');
router.post('/', function (req, res, next) {
    var idOrder = req.body.idOrder;
    var length = req.body.productList.length;
    for(var i=0 ; i < length ; i++)
    {
        var params = {
            id_orders : idOrder,
            id_products : req.body.productList[i].id
        }
        var sql = "INSERT INTO orders_details SET ?";
        mysql.conn.query(sql,params,function(err,results){
            if(err) throw err;
        });
    }
    return res.json({
        message : "ok"
    });
});
router.get('/get/:id', function (req, res, next) {
    var sql = "select * from orders_details where id_orders = ?";
    mysql.conn.query(sql,[req.params.id],function(err,results){
            if(err) throw err;
            res.send(results);
    });
});
module.exports = router;