function check() {
    var id = document.bmiForm.id;
    var height = document.bmiForm.height;
    var weight = document.bmiForm.weight;
    var psa = document.bmiForm.psa;

    if (isEmpty(id)) {
        alert("이름?");
        id.focus();
        return false;
    }
    if (isEmpty(height) || isNotNum(height)) {
        alert("키?")
        height.value = "";
        height.focus();
        return false;
    }
    if (isEmpty(weight) || isNotNum(weight)) {
        alert("몸무게?")
        weight.value = "";
        weight.focus();
        return false;
    }
    if (isEmpty(psa) || (isNotType(psa, "jpg") && isNotType(psa, "gif") && isNotType(psa, "png") && isNotType(psa, "bmp"))) {
        alert("프사?");
        return false;
    }

    return true;
}