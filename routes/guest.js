var express = require('express');
var moment = require('moment');
var router = express.Router();

const Guest = require('../models/guest');

var PAGE_MAX = 5; //최대 표시 갯수 설정

router.get('/', function(req, res, next) {
  res.redirect('/guest/page/1');
});

router.get('/page/:num', function(req, res, next) {
  Guest.paginate({}, { page: req.params.num, limit: PAGE_MAX, sort: { date: -1 }}, function(err, guest_data) {  //Date기준으로 Sort, -1일경우 desc / 1일경우 asc / sort: { year: -1 , month:-1}는 둘다 해당됨
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
  //오늘 날짜 계산 Date객체 사용
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  today = yyyy+'/'+mm+'/'+dd+' '+hours+':'+minutes+':'+seconds;

  var write_data = new Guest({
    title : req.body.title,
    name : req.body.name,
    content : req.body.content,
    date : today
  });
  // console.log(Test.findById(write_data._id));
  write_data.save();
  res.redirect('/guest');
});

module.exports = router;