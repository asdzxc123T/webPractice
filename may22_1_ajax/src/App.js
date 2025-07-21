import './App.css';
import LjwAjaxFirst from './ajax/ljwAjaxFirst';
import LjwAjaxMini from './ajax/ljwAjaxMini';
import LjwAjaxSecond from './ajax/ljwAjaxSecond';

function App() {
  return (
    <>
      <LjwAjaxFirst />
      <hr />
      <LjwAjaxSecond />
      <hr />
      <LjwAjaxMini />
    </>
  );
}

export default App;
