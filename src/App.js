import './App.css';
import Login from './pages/Login';
import Join from './pages/Join';
import Home from './pages/Home';
import Channels from './pages/Channels';
import CharacterSettings from './pages/CharacterSettings';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import {
  RecoilRoot
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
   <BrowserRouter >
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/signup" element={<Join/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/channels" element={<Channels/>} />
        <Route path="/avatars" element={<CharacterSettings/>} />
      
      </Routes>
      
    </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
