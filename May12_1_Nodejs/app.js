var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8887); // Node.js Express WAS 포트번호

// http://IP주소:8887/te.st
// app.get("요청주소", function(요청, 응답) {});
app.get("/te.st", function(reqqq, resss) {
  resss.send("abcd");
});

// http://IP주소:8887/param.test?a=10&b=20
app.get("/param.test", function(req, res) {
  var aa = req.query.a * 1; // req.query.파라메터변수명
  var bb = req.query.b * 1; // 글자 -> 숫자 : * 1
  var cc = aa + bb; 
  res.send(cc + ""); // 숫자 -> 글자 : + ""
});

// http://IP주소:8887/json.res.test?a=10&b=20
app.get("/json.res.test", function(req, res) {
  var aa = req.query.a * 1;
  var bb = req.query.b * 1;
  var cc = aa + bb; 
  var dd = {"result" : cc};
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(dd);
});

// 설치
// 1) Node.js 본체 설치
// 2) nodemon : 소스작업하고 저장하면 자동 재시작
//     npm install nodemon -g
// 3) express : 웹 백엔드 프로젝트 자동 생성
//     npm install express -g
//     npm install express-generator@4 -g
// ---------------------------------------------------
// 프로젝트 생성
// 1) 프로젝트 만들 곳에 가서 cmd
// 2) 프로젝트 생성
//     express 프로젝트명
//         express May12_1_Test
// 3) 프로젝트 폴더로 들어가서
//     cd 프로젝트명
//         cd May12_1_Test
// 4) 기본적으로 필요한 라이브러리 설치
//     npm install
// 5) app.js 편집
// ---------------------------------------------------
// 실행(nodemon)
//     nodemon 파일명
//     nodemon app.js

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
