import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plaza/detail" element={<Detail />} />
        <Route path="/gossiping/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
