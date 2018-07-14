var express = require('express')
, router = express.Router();

var mysql = require('../app');
router.get('/', function (req, res, next) {
    var sql = `SELECT * FROM products order by id desc`;
    mysql.conn.query(sql,[req.params.id],function(err,results){
        if(err) throw err;
        res.send(results);
    });
});
router.get('/gender/:gender', function (req, res, next) {
    var sql = `SELECT products.*, brands.name as nameB, categories.name as nameC FROM products 
    inner JOIN brands on products.id_brands = brands.id 
    INNER JOIN categories ON products.id_categories = categories.id WHERE products.gender = ?`;
    mysql.conn.query(sql,[req.params.gender],function(err,results){
        if(err) throw err;
        res.send(results);
    });
});

router.get('/popular', function (req, res, next) {
    var sql = `SELECT products.* , brands.name as nameB FROM products 
    inner join brands on products.id_brands = brands.id limit 5`;
    mysql.conn.query(sql,function(err,results){
        if(err) throw err;
        res.send(results);
    });
});

router.get('/gender/:gender/category/:category', function (req, res, next) {
    var sql = `SELECT products.*, brands.name as nameB, categories.name as nameC FROM products 
    inner JOIN brands on products.id_brands = brands.id 
    INNER JOIN categories ON products.id_categories = categories.id WHERE products.gender = ? and categories.name = ?`;
    mysql.conn.query(sql,[req.params.gender,req.params.category],function(err,results){
        if(err) throw err;
        res.send(results);
    });
});
router.get('/id/:id', function (req, res, next) {
    var sql = `SELECT products.*, brands.name as nameB, categories.name as nameC FROM products 
    inner JOIN brands on products.id_brands = brands.id 
    INNER JOIN categories ON products.id_categories = categories.id WHERE products.id = ?`;
    mysql.conn.query(sql,[req.params.id],function(err,results){
        if(err) throw err;
        res.send(results);
    });
});
router.post('/add', function (req, res, next) {
    var sql = `INSERT INTO products set ?`;
    mysql.conn.query(sql,req.body.product,function(err,results){
        if(err) throw err;
        else
        {
            return res.json({
                message: "success"
            })
        }
    });
});
router.post('/update', function (req, res, next) {
    var params = req.body.product
    var sql = `UPDATE products set ? where id= ?`;
    mysql.conn.query(sql,[params,req.body.id],function(err,results){
        if(err) throw err;
        else
        {
            return res.json({
                message: "success"
            })
        }
    });
});
router.get('/search/:q', function (req, res, next) {
    var sql = `SELECT  products.*, brands.name as nameB, categories.name as nameC FROM products 
    inner JOIN brands on products.id_brands = brands.id 
    INNER JOIN categories ON products.id_categories = categories.id WHERE MATCH (products.name) AGAINST (?)`;
    mysql.conn.query(sql,[req.params.q],function(err,results){
        if(err) throw err;
        res.send(results);
    });
});
router.get('/search/:q/category/:category', function (req, res, next) {
    var sql = `SELECT  products.*, brands.name as nameB, categories.name as nameC FROM products 
    inner JOIN brands on products.id_brands = brands.id 
    INNER JOIN categories ON products.id_categories = categories.id WHERE MATCH (products.name) AGAINST (?) and categories.name = ?`;
    mysql.conn.query(sql,[req.params.q,req.params.category],function(err,results){
        if(err) throw err;
        res.send(results);
    });
});
module.exports = router;