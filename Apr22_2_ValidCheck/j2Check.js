function check() {
    var idField = document.joinForm.id;
    var pwField = document.joinForm.pw;
    var pwChkField = document.joinForm.pwChk;
    var ageField = document.joinForm.age;
    var psaField = document.joinForm.psa;

    if (isEmpty(idField) || lessThan(idField, 4) || containsHS(idField)) {
        alert("ID?");
        idField.value = "";
        idField.focus();
        return false;
    }
    if (isEmpty(pwField) || lessThan(pwField, 5) || notEqual(pwField, pwChkField) || notContains(pwField, "1234") || notContains(pwField, "abcd")) {
        alert("PW?");
        pwField.value = "";
        pwChkField.value = "";
        pwField.focus();
        return false;
    }
    if (isEmpty(ageField) || isNotNum(ageField)) {
        alert("나이?");
        ageField.value = "";
        ageField.focus();
        return false;
    }
    if (isEmpty(psaField) || (isNotType(psaField, "jpg") && isNotType(psaField, "gif") && isNotType(psaField, "png") && isNotType(psaField, "bmp"))) {
        alert("프사?");
        return false;
    }
    return true;
}