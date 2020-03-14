var express = require('express');
var moment = require('moment');
var router = express.Router();

const Guest = require('../models/guest');
const Clang = require('../models/programming/clang');
const Java = require('../models/programming/java');

var PAGE_MAX = 5; //최대 표시 갯수 설정

router.get('/', function(req, res, next) {
  res.redirect('/programming/introduction');
});

router.get('/introduction', function(req, res, next) {
  res.render('./programming/programming_introduction');
});

router.get('/:this_url', function(req, res, next) {
  //console.log(req.query);
  switch(req.params.this_url){
    case "clang":
      var programming_field = Clang;
      break;

      case "java":
        var programming_field = Java;
      break;
      
      default:
        console.log("b");
      break;
  }

  programming_field.paginate({}, { page: req.params.num, limit: PAGE_MAX, sort: { date: -1 }}, function(err, field_data) {  //Date기준으로 Sort, -1일경우 desc / 1일경우 asc / sort: { year: -1 , month:-1}는 둘다 해당됨
    if (err) {
      return next(err);
    }
    res.render('./programming/programming_main', {field_data : field_data, page_num : req.params.num, PAGE_MAX : PAGE_MAX, moment});
  });
});
module.exports = router;