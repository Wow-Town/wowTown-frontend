/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useState, useEffect } from "react";
import {Routes, Route, useNavigate } from "react-router-dom";

export default function FriendFrame({key, friend}){
    const navigate = useNavigate();
   

    useEffect(() =>{         
        
    },[])

  

    function onClickProfile(){
        navigate('/connectMetaverse/avatar/profile?id='+friend.friendId,{ state : {avatarId : friend.friendId}});
    } 

    return(
        <Div onClick={()=>onClickProfile()}>
            <FriendImg>이미지</FriendImg>
            <ContentFrame>
                <NameFrame>{friend.friendNickName}</NameFrame>
            </ContentFrame>            
        </Div>   
    );
}


const Div = styled.div`
margin-top:10px;
margin-bottom:10px;
padding:10px 10px 10px 10px;
border: 1px solid #A4A4A4 ;
border-radius:10px;
position:relative;
height: 60px;
display:flex;
width:376px;
`

const FriendImg = styled.div`
background-color:pink;
width:60px;
height:60px;
line-height:60px;
border-radius:100px;
text-align: center;
display:table-cell;
vertical-align:middle;

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