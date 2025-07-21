// form 없이 요청
// button 누르면
// input 내용 받아다가
// reqParam 만들어서 요청
function gogo() {
    // document : 이 html
    var nInput = document.getElementById("nameInput");
    var aInput = document.getElementById("ageInput");

    // GET방식 요청
    location.href = "http://loaclhost/te.st?name=" + nInput.value
                    + "&age=" + aInput.value;
    // 불편한데요? jQuery/react
    // POST는요? JS로 form을 만들어서...
}