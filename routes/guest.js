var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('guest_main');
});

router.get('/write', function(req, res, next) {
  res.render('guest_write');
});

module.exports = router;