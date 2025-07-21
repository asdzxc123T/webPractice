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

var io = require("socket.io")();
io.listen(5678);

io.sockets.on("connection", function(socket) {
  socket.on("abcd", function(asd) {
    io.sockets.emit("efgh", asd);
  });
});

// Node.js : 웹소켓서버 구현에 특화
//  1) js파일 제공 -> 웹 환경에서 사용 편리
//  2) 문법 간단 
//  3) 컴은 한번에 한 작업만 가능 -> 멀티스레드 관련 구현이 필요
//    JavaScript는 non-blocking I/O
//    멀티스레드 어쩌고 신경 안 써도 동시작업이 가능

// 웹소켓서비스 시작
// 자동으로 만들어줌
// http://주소:포트/socket.io/socket.io.js

// 소켓 : 통신채널

// 객체(주어)
//    io.sockets : 연결된 모든 소켓들
//    socket : 특정 소켓 하나
// 메소드(동사)
//    emit("제목", 내용) : 보낼 때
//    on("제목", 콜백함수) : 받을 때

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
