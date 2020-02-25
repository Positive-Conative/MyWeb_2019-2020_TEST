var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/information', function(req, res, nex){
  res.render('information');
})

module.exports = router;