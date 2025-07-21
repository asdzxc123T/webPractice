import './App.css';
import LjwCssFirst from './css/ljwCssFirst';
import LjwCssSecond from './css/ljwCssSecond';
import LjwCssThird from './css/ljwCssThird';
import LjwInput from './input/ljwInput';
import LjwPropsFirst from './props/ljwPropsFirst';
import LjwPropsSecond from './props/ljwPropsSecond';
import LjwPropsThird from './props/ljwPropsThird';
import LjwRSFirst from './repeatStmt/ljwRSFirst';
import LjwRSFourth from './repeatStmt/ljwRSFourth';
import LjwRSSecond from './repeatStmt/ljwRSSecond';
import LjwRSThird from './repeatStmt/ljwRSThird';

// yarn이라는 툴 도움 받아서 react 프로젝트를 하는 중중
//    원래 react 프로젝트 실행 명령어
//      react-scripts start
//    yarn이라는 툴을 쓰는 중이니
//      yarn start -> package.json에 scripts.start에 있는 명령어가 돌아감
//    포트 변경
//      scripts.start를 set PORT=XXXX && react-scripts start로 변경

function App() {
  return (
    <>
      <LjwInput />
      <hr />
      <LjwPropsFirst namee="홍길동" agee="20" />
      <LjwPropsFirst namee="홍길동" agee="30" />
      <LjwPropsSecond namee="빼빼로" pricee="2000" />
      <LjwPropsSecond pricee="abcd" />
      <LjwPropsThird>ㅋㅋㅋ</LjwPropsThird>
      <LjwPropsThird>ㅎㅎㅎ</LjwPropsThird>
      <hr />
      <LjwCssFirst bgc="white" c="black" w={1000}/>
      <LjwCssFirst bgc="yellow" c="blue" w={"300"}/>
      <hr />
      <LjwCssSecond />
      <hr />
      <LjwCssThird />
      <hr />
      <LjwRSFirst />
      <hr />
      <LjwRSSecond />
      <hr />
      <LjwRSThird />
      <hr />
      <LjwRSFourth />
    </>
  );
}

export default App;
