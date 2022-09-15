/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FriendList from '../components/templates/FriendList';
import { Routes, Route } from "react-router-dom";
import Profile from "../components/templates/Profile";

export default function Avatar(){        
    return(
        <AvatarFrame>
            <Routes>
                <Route path="/friend" element={<FriendList/>}/> 
                <Route path="/profile/*" element={<Profile/>}/>            
            </Routes>
        </AvatarFrame>
    );
}

const AvatarFrame = styled.div`
    padding: 20px 30px 20px 30px;
    margin: 30px 40px 30px 30px;
    border: 1px solid #A4A4A4;
    width: 30%;
    height: 700px;
`