function strTest() {
    var a = "ㄱㄴㄷㄹㅁㅂㅅ";
    alert(a + " " + a.length);
    alert(a[1]); // 두번째 글자
    alert(a.indexOf("ㄹ")); // 'ㄹ'는 몇번째에
    alert(a.indexOf("ㅋ")); // 'ㅋ'가 있나
}