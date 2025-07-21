function test() {
    alert("ㅋ");
}

function forTest() {
    // for (변수초기화;조건식;증감) {

    // }
    for (var a = 1; a < 10; a += 2) {
        alert(a);
    }
}

function whileTest() {
    // do {

    // } while();

    while (true) {
        var r = Math.random(); // 0.0 ~ 0.9999999...
        alert(r);
        if (r > 0.3)
            break;
    }
}