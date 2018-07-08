var express = require('express')
, router = express.Router();

router.use('/brands', require('./brands'));
router.use('/categories', require('./categories'));
router.use('/products', require('./products'));
router.use('/accounts', require('./accounts'));
router.use('/orders', require('./orders'));
router.use('/orders_details', require('./orders_details'));
router.use('/columns', require('./columns'));
router.use('/delete', require('./delete'));
module.exports = router;