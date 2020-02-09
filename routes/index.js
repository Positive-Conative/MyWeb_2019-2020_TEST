var express = require('express');
var router = express.Router();
var db = require('../config/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query(`select * from guest_book`, function(err, fields){
    if(err){
      throw err;
    }
    else{
      res.render('index', { title: 'Express', data:fields});
    }
  });
});

module.exports = router;