/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useState, useEffect } from "react";
import {Routes, Route, useNavigate } from "react-router-dom";

export default function AvatarFrame({key, avatar}){
    const navigate = useNavigate();  

    function onClickProfile(){
        navigate('/connectMetaverse/avatar/profile?id='+avatar.avatarId,{ state : {avatarId : avatar.avatarId}});
    } 

    return(
        <Div onClick={()=>onClickProfile()}>
            <ContentFrame>
                <NameFrame>{avatar.nickName}</NameFrame>
            </ContentFrame>            
        </Div>   
    );
}


const Div = styled.div`
border: 1px solid #A4A4A4 ;
margin: 10px 0px 10px 0px;
border-radius:10px;
position:relative;
height: 60px;
display:flex;
`
const ContentFrame=styled.div`
padding: 2px 10px 2px 10px;
display:flex;
width: 60%;
position: relative;
`

const NameFrame=styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 18px;
`