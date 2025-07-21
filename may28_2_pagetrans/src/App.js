import { Route, Routes } from 'react-router-dom';
import './App.css';
import LjwP1 from './pages/ljwP1/ljwP1';
import LjwP2 from './pages/ljwP2/ljwP2';
import LjwP3 from './pages/ljwP3/ljwP3';
import LjwP4 from './pages/ljwP4/ljwP4';
import LjwP5 from './pages/ljwP5/ljwP5';
import LjwP6 from './pages/ljwP6/ljwP6';
import LjwP7 from './pages/ljwP7/ljwP7';
import LjwP8 from './pages/ljwP8/ljwP8';

function App() {
  // 첫 페이지 : path="/" or index 
  // 없는 주소 : path="*"
  return (
    <Routes>
      <Route index element={<LjwP1 />}/>
      <Route path='/p2.go' element={<LjwP2 />} />
      <Route path='/p3.go' element={<LjwP3 />} />
      <Route path='/p4.go/:name/:price' element={<LjwP4 />} />
      <Route path='/p5.go' element={<LjwP5 />} />
      <Route path='/p6.go' element={<LjwP6 />} />
      <Route path='/p7.go' element={<LjwP7 />} />
      <Route path='*' element={<LjwP8 />} />
    </Routes>
  );
}

export default App;
