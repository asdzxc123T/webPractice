import './App.css';
import LjwEventFirst from './event/ljwEventFirst';
import LjwKeyEvent from './event/ljwKeyEvent';
import LjwMouseEvent from './event/ljwMouseEvent';
import LjwPopupMenu from './event/ljwPopupMenu';
import LjwPopupMenu2 from './event/ljwPopupMenu2';
import LjwResizeEvent from './event/ljwResizeEvent';
import LjwHookFirst from './hook/ljwHookFirst';
import LjwHookFourth from './hook/ljwHookFourth';
import LjwHookSecond from './hook/ljwHookSecond';
import LjwHookThird from './hook/ljwHookThird';
import LjwSocketClnt from './socket/ljwSocketClnt';

function App() {
  return (
    <>
      <LjwEventFirst />
      <hr />
      <LjwMouseEvent />
      <hr />
      <LjwPopupMenu />
      <hr />
      <LjwKeyEvent />
      <hr />
      <LjwHookFirst />
      <hr />
      <LjwHookSecond />
      <hr />
      <LjwHookThird />
      <hr />
      <LjwResizeEvent />
      <hr />
      <LjwPopupMenu2 />
      <hr />
      <LjwHookFourth />
      <hr />
      <LjwSocketClnt />
    </>
  );
}

export default App;
