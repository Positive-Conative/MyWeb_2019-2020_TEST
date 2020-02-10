var express = require('express');
var router = express.Router();

router.get('/c_language', function(req, res, next) {
  res.render('programming_c');
});

module.exports = router;