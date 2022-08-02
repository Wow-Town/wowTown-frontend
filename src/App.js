import './App.css';
import Login from './pages/Login';
import Join from './pages/Join';
import Home from './pages/Home';
import Channels from './pages/Channel';
import CharacterSettings from './pages/CharacterSettings';
import ConnectMetaverse from './pages/ConnectMetaverse';
import { BrowserRouter , Routes, Route } from "react-router-dom";

function App() {
  return (
  
   <BrowserRouter >
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/join" element={<Join/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/channels" element={<Channels/>} />
        <Route path="/avatars" element={<CharacterSettings/>} />
        <Route path="/connectMetaverse/*" element={<ConnectMetaverse/>} />
      
      </Routes>
      
    </BrowserRouter>
  
  );
}

export default App;
