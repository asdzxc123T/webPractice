import "./App.css";
import MyH1 from "./myH1";
import MyH2 from "./myH2";
import MyTable from "./myTable";

// alt + shift + O : import 정리

// Node.js 서버에 업로드 되어서 실행
// Node.js가 기본적으로 포트번호를 3000 쓰니까
// 포트번호 수정 : package.json
// OOP 구사함으로써 얻는 이득 : 소스 재사용
//    이름, 나이 속성 있고, 짖기/정보출력 기능 있는 개를 여럿 만들기 편함
// 설계가 중요해짐

function App() {
  return (
    <>
      <MyH1></MyH1>
      <MyH1 />
      <MyH1></MyH1>
      <MyH1></MyH1>
      <MyH2></MyH2>
      <MyH2 />
      <MyTable />
      <MyTable />
    </>
  );
}

export default App;
