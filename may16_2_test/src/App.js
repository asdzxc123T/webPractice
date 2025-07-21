import logo from "./logo.svg";
import "./App.css";

// React
//    Facebook에서 만든
//    JavaScript OOP 라이브러리
//    VirtualDOM
//    소스 -> VDOM -> 화면
//        VDOM의 변경사항만 화면에 렌더링 -> 특정부분만 수정이 일어남
//        -> 화면 자주 바뀌는 사이트에 유리
//    화면이 잘 안 바뀌는 사이트면 -> VDOM 때문에 컴퓨터 자원 더 쓰고, 느려지고고

// vanillaJS/jQuery
//    html에서 특정 부분만 수정이 일어나는 게 아님
//    html 처음부터 끝까지 다시 렌더링 -> 화면 자주 바뀌는 사이트면...
//    html 소스 -> 화면

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
