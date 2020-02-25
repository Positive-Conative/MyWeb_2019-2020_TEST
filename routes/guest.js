var express = require('express');
var moment = require('moment');
var router = express.Router();

const Guest = require('../models/guest');

var PAGE_MAX = 5; //최대 표시 갯수 설정

router.get('/', function(req, res, next) {
  res.redirect('/guest/page/1');
});

router.get('/page/:num', function(req, res, next) {
  Guest.paginate({}, { page: req.params.num, limit: PAGE_MAX }, function(err, guest_data) {
    if (err) {
      return next(err);
    }
    //    console.log(Guest.findById('5e54f4986a04552c8cecdd00'));
    //    console.log(Guest.paginate());
    res.render('./guest/guest_main', {guest_data : guest_data, page_num : req.params.num, PAGE_MAX : PAGE_MAX, moment});
  });
});

router.get('/detail', function(req, res, next) {
  Guest.findById(req.query.id, function(err, data){
    var this_data = {
      title : data.title,
      name : data.name,
      content : data.content,
      date : data.date
    }
    res.render('./guest/guest_detail', {guest_data : this_data, moment});
  })
});

router.get('/write', function(req, res, next) {
  res.render('./guest/guest_write');
});

router.post('/write', function(req, res, next) {
  var write_data = new Guest({
    title : req.body.title,
    name : req.body.name,
    content : req.body.content
  });
  // console.log(Test.findById(write_data._id));
  write_data.save();
  res.redirect('/guest');
});

module.exports = router;