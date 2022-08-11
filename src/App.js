import './App.css';
import Login from './pages/Login';
import Join from './pages/Join';
import Home from './pages/Home';
import Channels from './pages/Channel';
import AvatarSettings from './pages/AvatarSettings';
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
        <Route path="/avatars" element={< AvatarSettings/>} />
        <Route path="/connectMetaverse/*" element={<ConnectMetaverse/>} />
      
      </Routes>
      
    </BrowserRouter>
  
  );
}

export default App;
