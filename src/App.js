import './App.css';
import Login from './pages/Login';
import Join from './pages/Join';
import Home from './pages/Home';
import { BrowserRouter , Routes, Route } from "react-router-dom";


function App() {
  return (
   <BrowserRouter >
      
      <Routes>
        <Route index element={<Home />} />
        <Route path="/users/signup" element={<Join/>} />
        <Route path="/users/login" element={<Login/>} />
        
  
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
