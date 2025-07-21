import './App.css';
import DrawingArea from './socket/drawingArea';
import LjwCanvasClnt from './socket/ljwCanvasClnt';
import LjwEchoClnt2 from './socket/ljwEchoClnt2';

function App() {
  return (
    <>
      <LjwEchoClnt2 />
      <hr />
      <LjwCanvasClnt />
      <hr />
      <DrawingArea />
    </>
  );
}

export default App;
