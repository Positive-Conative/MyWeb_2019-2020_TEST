var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/information', function(req, res, nex){
  res.render('information');
})

router.get('/login', function(req, res, next) {
  res.render('sign_up');
});
router.post('/login', function(req, res, next) {

  if(req.body.input_self == 'NULL'){
    console.log("hello")
  }else{
    console.log("world")
  }

  console.log(req.body.email_id);
  console.log(req.body.email_adr);
  console.log(req.body.input_self);
  console.log(req.body.password);
});

router.post('/login', function(req, res, nex){
  console.log(req.body.email);
  console.log(req.body.password);
})
module.exports = router;  