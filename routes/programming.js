var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/programming/introduction');
});

router.get('/introduction', function(req, res, next) {
  res.render('./programming/programming_introduction');
});

router.get('/Clang', function(req, res, next) {
  res.render('./programming/programming_main');
});

module.exports = router;