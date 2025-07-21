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


// MongoDB 접속
//    mongosh 폴더 가서 cmd, mongosh 서버주소
//    use DB명
//    데이터 추가
//      db.테이블명.insertOne(JS객체);
//    데이터 조회
//      db.테이블명.find(JS객체);
//    데이터 수정
//      db.테이블명.updateMany(JS객체, {"$set" : JS객체});
//    데이터 삭제
//      db.테이블명.deleteMany(JS객체);

// Node.js + MongoDB 연동 라이브러리 설치
//    npm install mongojs

app.listen(8887);

// http://주소:8887/snack.reg?name=XXX&price=YYY
app.get("/snack.reg", function(req, res) {
  // Node.js : JavaScript로 back-end 프로그래밍
  // MongoDB : JavaScript로 제어
  // mongojs : MongoDB 명령어 그대로 쓰게 + 콜백함수
  var mjs = require("mongojs");
  // var db = mjs("서버주소/DB명", ["테이블명", "테이블명", ...])
  var db = mjs("195.168.9.68/ljw", ["may12_snack"]);
  var n = req.query.name;
  var p = req.query.price * 1;

  db.may12_snack.insertOne({name:n, price:p}, function(errrr, resulttt) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(resulttt);
  });
});

// http://주소:8887/snack.get
app.get("/snack.get", function(req, res) {
  var db = require("mongojs")("195.168.9.68/ljw", ["may12_snack"]);

  db.may12_snack.find(function(e, result) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(result);
  });
});

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
