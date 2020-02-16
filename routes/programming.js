var express = require('express');
var router = express.Router();

router.get('/main', function(req, res, next) {
  res.render('./programming/programming_main');
});

router.get('/Clang', function(req, res, next) {
  res.render('./programming/programming_c');
});

module.exports = router;