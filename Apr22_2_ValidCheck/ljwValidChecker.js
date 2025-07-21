// JavaScript 유효성 검사 라이브러리
// - 다양한 상황에 대응 가능하게 최대한 일반적으로 제작
// - 부정적인 컨셉 

// <input> 넣었을 때
// 안 썼으면 true, 썼으면 false
function isEmpty(field) {
    return !field.value;
}

// <input>, 글자수 넣었을 때
// 짧으면 true, 안 짧으면 false
function lessThan(field, len) {
    return field.value.length < len;
}

// <input> 넣었을 때
// 한글, 특수문자, 한자, 일본어 들어있으면 true
// -> 영어, 숫자, -_.@가 아닌 게 들어있으면 true
function containsHS(field) {
    var set1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.@"
    for(var i = 0; i < field.value.length; i++) {
        if (set1.indexOf(field.value[i]) == -1) {
            return true;
        }
    }
    return false;
}

// pw, pw확인 같은지
// 다르면 true
function notEqual(field1, field2) {
    return field1.value != field2.value;
}

// <input>, 문자열세트를 넣었을 때
// 그게 안 들어있으면 true
// pw 조합
//      A : 소문자, 숫자
//      B : 대문자
//      C : 특수문자, 숫자
//      D : abc, 123
//      E : !@#, iop
function notContains(field, set) {
    for (var i = 0; i < set.length; i++) {
        if (field.value.indexOf(set[i]) != -1)
            return false;
    }
    return true;
}

// <input> 넣었을 때
// 숫자가 아니면 true
function isNotNum(field) {
    return isNaN(field.value) || field.value.indexOf(" ") != -1;
}

// field.value
//      다른거 : 거기다 쓴 글자
//      파일 타입 : 선택한 파일명이 글자로
// 파일명만 체크?
//      1) JavaScript에서 전문적으로 파일체크 불가
//      2) 유효성 검사는 사용자 좋으라고 하는데, 굳이 파일 확장자까지 바꿔가면 할 거면 아 예...

// 파일 검사
// <input>, 확장자 넣었을 때
// 그 파일이 아니면 true
function isNotType(field, type) {
    // 선택한 파일명에 .png, .jpg 들어있나 체크
    type = "." + type;
    return field.value.toLowerCase().indexOf(type) == -1
    // arguments.png -> arguments.png
    // arguments.PNG -> arguments.png
}