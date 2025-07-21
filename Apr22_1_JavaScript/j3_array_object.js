function arrayTest() {
    var a = [12, 43, 5467, 454];
    // alert(a.length); // 갯수
    // alert(a[0]); // index는 0부터
    // for (var i = 0; i < a.length; i++) {
    //     alert(a[i]);
    // }
    for (var v of a) {
        alert(v);
    }
}

function objectTest() {
    // class 만들어서 하는 정통파 OOP : react 가서
    var d = {name:"후추", age:3}; // class 안 만들고 만든 객체
    alert(d);
    alert(d.name);
    alert(d.age);
    alert(JSON.stringify(d)); // 객체를 문자열로
}

function aoTest() {
    var dogs = [
        {name:"후추", age:3},
        {name:"호초", age:2},
        {name:"흐츠", age:1}
    ];
    // alert(dogs[0]);
    // alert(dogs[0].name);
    // alert(dogs[0].age);
    for(var i = 0; i < dogs.length; i++) {
        // %d 시리즈 x
        alert(dogs[i].name + " : " + dogs[i].age);
    }
}