import './App.css';
import Login from './pages/Login';
import Join from './pages/Join';
import Home from './pages/Home';
import Channels from './pages/Channel';
import AvatarSettings from './pages/AvatarSettings';
import ConnectMetaverse from './pages/ConnectMetaverse';
import {unstable_HistoryRouter as HistoryRouter, Routes, Route} from 'react-router-dom';
import {history} from './utils/History';
import MeetingRoom from './components/templates/MeetingRoom';



function App() {
  return (
  
   <HistoryRouter history={history}>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/join" element={<Join/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/channels" element={<Channels/>} />
        <Route path="/avatars" element={< AvatarSettings/>} />
        <Route path="/connectMetaverse/*" element={<ConnectMetaverse/>} />
        <Route path="/privateSpace/:privateSpaceUUID/*" element={<MeetingRoom/>} />
      
      </Routes>
      
    </HistoryRouter>
  
  );
}

export default App;
