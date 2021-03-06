/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import SelectNotice from "../components/templates/SelectNotice";
import NoticeList from "../components/templates/NoticeList";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PostNotice from '../components/templates/PostNotice';

export default function Notice({clearNotice, setClearNotice}){

    useEffect(() =>{
        if(clearNotice){
            setClearNotice(false);
        }
    })

    return(
        <NoticeFrame>
            <Routes>
                <Route path="" element={<SelectNotice/>} />
                <Route path="/search/*" element={<NoticeList />} />
                <Route path="/post/*" element={<PostNotice />} />
            </Routes>
        </NoticeFrame>
    );
}

const NoticeFrame = styled.div`
padding : 20px 30px 20px 30px;
border: 1px solid #A4A4A4 ;
width:490px;
height:600px; 
`