/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import {useMutation} from 'react-query';
import { useState, useEffect } from "react";
import ChatRoom from '../components/templates/ChatRoom';
import { Routes, Route } from "react-router-dom";
import ChatList from "../components/templates/ChatList";


export default function Chat(){
    const [selectChatRoomId, setSelectChatRoomId] = useState("");

    return (
        <MainFrame>
            <Routes>
                <Route path="/" element={<ChatList/>}/> 
                <Route path="/room/*" element={<ChatRoom/>}/>            
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