import React, { useState } from "react";

// vanillaJS/jQuery :
//      버튼을 눌렀을 때
//      그 시점에 input에 적혀있는 내용
//      을 출력하자
// React
//      state(상태)를 상시 업데이트
//      버튼을 눌렀을 때 그 시점의 state
//      를 출력하자

// OOP
//      속성 : 멤버변수
//      액션 : 메소드
// class를 만들려고 했으나, react측에서 함수 형태를 권장해서 함수를 만든
//      -> 단순 함수에서 멤버변수/메소드 표현은 불가
//      -> react측에서 hook이라는 걸 제공해서 클래스처럼 쓸 수 있게
const MyTable = () => {
  // 멤버변수 느낌 : useState
  // const [멤버변수, setter(멤버변수에 값 넣을 때 쓰는 함수)] = useState(기본값)
  // useState 자동완성 한 번 -> import
  // useStateSnippet 자동완성
  const [inputValll, setinputValll] = useState("ㅋ");

  // 메소드 느낌
  const showAlert = () => {
    alert("ㅋ");
  };
  const showInputVal = () => {
    alert(inputValll);
  };

  const keyUp = (e) => { 
    // e.target // $(this)
    setinputValll(e.target.value);
    // input에서 키보드 건들 때마다 input에 적힌 내용으로 inputValll을 바꿔라
  }

  return (
    <table border={1}>
      <tr>
        <td>
          <button onClick={showAlert}>alert출력버튼</button>
        </td>
      </tr>
      <tr>
        <td>
          <input value={inputValll} onChange={keyUp}/>
          <button onClick={showInputVal}>input에 쓴 거 출력</button>
        </td>
      </tr>
    </table>
  );
};

export default MyTable;
