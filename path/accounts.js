var express = require('express')
, router = express.Router();

var mysql = require('../app');
router.post('/login', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var sql = "select * from accounts where email = ? and password = ?";
    if(email && password)
    {
        mysql.conn.query(sql,[email,password],function(err,results){
            if(err) throw err;
            if(results[0])
            {
                return res.json({
                    message : true,
                    data : results
                })
            }
            else{
                return res.json({
                    message : false
                })
            }
        });
    }

});
router.post('/register', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var sql = "select * from accounts where email = ?";
    if(email && password && name)
    {
        mysql.conn.query(sql,[email],function(err,results){
            if(err) throw err;
            if(results[0])
            {
                return res.json({
                    message : "The email-address you entered is already in use."
                })
            }
            else{
                var sql2 = "INSERT INTO accounts SET ?";
                var account = {
                    "email": email,
                    "password": password,
                    "name": name
                };
                mysql.conn.query(sql2, account,function(err,results){
                    if(err) throw err;
                    else{
                        return res.json({
                            message : "Your account has been successfully created."
                        })
                    }
                });
            }
        });
    }
    else{
        return res.json({
            message : "invalid."
        })
    }
});
router.post('/update', function (req, res, next) {
    var email = req.body.email;
    var name = req.body.name;
    var address = req.body.address;
    var phone = req.body.phone;
    var sql = "UPDATE `accounts` SET `name`= ?,`address`= ?,`phone`= ?  WHERE email = ?";
    if(email && name && address && phone)
    {
        mysql.conn.query(sql,[name,address,phone,email],function(err,results){
            if(err) throw err;
            else{
                return res.json({
                    message : 'your info has been updated !'
                })
            }
        });
    }
    else
    {
        return res.json({
            message : "something's wrong !"
        })
    }

});
router.post('/changepassword', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var sql = "UPDATE `accounts` SET `password`= ?  WHERE email = ?";
    if(email && password)
    {
        mysql.conn.query(sql,[password,email],function(err,results){
            if(err) throw err;
            else{
                return res.json({
                    message : 'your password has been changed !'
                })
            }
        });
    }
    else
    {
        return res.json({
            message : "something's wrong !"
        })
    }

});
module.exports = router;