/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";

import { useState, useEffect } from "react";
import {Routes, Route, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function StudyRoomFrame ({privateSpaceUUID, chatRoomUUID, participantsNum, roomName}){
    const navigate = useNavigate();
    

    function onClickChatRoom(){
    
        window.open('/privatespace/'+privateSpaceUUID, '_blank');
       
} 
    return(
        <Div >
            {/* <ChatRoomImg className="material-icons">meeting_room </ChatRoomImg>  */}
            <ContentHeader>
                <ChatRoomName>{roomName}</ChatRoomName>
                <Particepant>{participantsNum}</Particepant> 
            </ContentHeader>
            <Button 
            buttonText="입장"
            height="30px"
            fontSize="14px"
            color="#FFBC45"
            onClick={()=>onClickChatRoom()} ></Button>
            
        </Div>   
    );
}


const Div = styled.div`
margin-top:10px;
margin-bottom:10px;
padding:10px 30px 10px 30px;
border: 1px solid #A4A4A4 ;
border-radius:10px;
//position:relative;
height: 50px;
display:flex;
align-items:center;

`

const ChatRoomImg = styled.div`
background-color:pink;
width:60px;
height:60px;
line-height:60px;
border-radius:100px;
text-align: center;
display:table-cell;
vertical-align:middle;

`



const ContentHeader=styled.div`
display:flex;
width: 100%;
height:50%;
`

const ChatRoomName=styled.div`
display:flex;
text-align: center;
align-items : center;
font-size: 17px;
font-weight: 600;
`
const Particepant = styled.div`
display:flex;
text-align: center;
align-items : center;
font-size :12px;
margin-left:5px;
margin-top:5px;
color:gray;

`

// const ContentBody=styled.div`
// padding: 5px 10px 2px 10px;
// display:flex;
// height:50%;
// `

// const Message = styled.div`
// font-size:13px;
// white-space : nowrap;
// overflow : hidden;
// text-overflow : ellipsis;
// word-wrap : break-word;
// margin-right: 10px;
// color:gray;
// `

// const MessageCount = styled.div`
// background-color: #ff4141;
// color: white;
// width: 25px;
// height: 25px;
// border-radius: 100px;
// font-size:13px;
// text-align: center;
// align-items : center;
// margin-right: 10px;
// display: flex;
// position: absolute;
// padding-left: 18px;
// top: 30px;
// right: 0;
// `