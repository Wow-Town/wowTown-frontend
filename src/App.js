import './App.css';
import Login from './pages/Login';
import Join from './pages/Join';
import Home from './pages/Home';
import { BrowserRouter , Routes, Route } from "react-router-dom";

function App() {
  return (
   <BrowserRouter >
      
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/signup" element={<Join/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
