/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import Navbar from '../components/templates/Navbar';
import { Routes,Route } from 'react-router-dom';
import StudyRoomList from '../components/templates/StudyRoomList';

export default function StudyRoom(){
    return (
        <MainFrame>
            <Routes>
                <Route path="/" element={<StudyRoomList/>}/>        
            </Routes>
        </MainFrame>
    )
}

const MainFrame = styled.div`
padding: 20px 30px 20px 30px;
margin: 30px 40px 30px 30px;
border: 1px solid #A4A4A4;
width: 30%;
height: 700px;
`