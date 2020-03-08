var express = require('express');
var moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//information 관련
const Information = require('../models/information');
router.get('/information', function(req, res, next){
  var PAGE_MAX = 5; //최대 표시 갯수 설정
  Information.paginate({}, {limit: PAGE_MAX,sort: { year: 1, month:1 }}, function(err, information_data) { 
    if (err) {
      return next(err);
    }
    res.render('information', {information_data : information_data, PAGE_MAX : PAGE_MAX, moment});
  });
})

router.post('/information', function(req, res, next){
  var write_data = new Information({
    year : req.body.input_year,
    month : req.body.input_month,
    title : req.body.input_title,
    content : req.body.input_content
  });
  write_data.save();
  res.redirect('/information');
})

router.get('/login', function(req, res, next) {
  res.render('sign_up');
});

//login 관련
const nodemailer = require('nodemailer');
router.post('/login', function(req, res, next) {

  if(req.body.email_adr == '직접 입력'){
    var email = req.body.email_id + "@" + req.body.input_self;
  }else{
    var email = req.body.email_id + "@" + req.body.email_adr;
  }

  console.log("id : " + email);
  console.log("password : " + req.body.password);
  console.log("name : " + req.body.name);
  console.log("num : " + req.body.num);
  
  //nodemailer모듈 사용

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'conative.test@gmail.com',  // gmail ID
      pass: 'CONATIVE.TEST'          // gmail Password
    }
  });

  let mailOptions = {
    from: 'youremail@gmail.com',    // send (gmail ID)
    to: email ,                     // Receive (gmail ID)
    subject: '안녕하세요, Conative의 Web Site 회원가입 요청 메세지입니다.',   // 제목
    text: '아래 링크를 클릭하여 회원가입을 마쳐주세요. <a> </a>'  // 내용
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email sent: ' + info.response);
    }
  });
});

//회원가입 인증 메일을 발송 후 확인하는 페이지
router.get('/login_finish', function(req, res, next){
  res.render('login_finish');
})

router.post('/login', function(req, res, next){
  console.log(req.body.email);
  console.log(req.body.password);
})
module.exports = router;  