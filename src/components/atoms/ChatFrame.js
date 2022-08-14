/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import ChatRoom from "../templates/ChatRoom";
import { useState, useEffect } from "react";
import {Routes, Route, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

let sockJS;
let stompClient;

export default function ChatFrame({chatRoom}){
    const navigate = useNavigate();
    const [receiveMessage, setReceiveMessage] = useState();

    useEffect(() =>{         
        sockJS = new SockJS("http://localhost:8080/ws-stomp");
        stompClient= Stomp.over(sockJS);
        stompClient.connect({}, function(frame) {
            setTimeout(function() {
                stompClient.subscribe("/sub/chatRooms/"+chatRoom.chatRoomUUID,function(message){
                    console.log("메시지 수신");
                    if(message.body !== ""){
                        let recv = JSON.parse(message.body);
                        //setReceiveMessage(recv.message);
                        setReceiveMessage(JSON.stringify(recv));
                    }
                    
                });
             }, 500);        
            console.log("채팅방 구독완료");
        }, function(error){});
        
        return function cleanup() {
            stompClient.disconnect();
            console.log("채팅방 구독해제");
        }
    },[])


    useEffect(() =>{
        console.log(receiveMessage);
    },[receiveMessage])    

    function onClickChatRoom(){
        navigate('/connectMetaverse/chat/room/'+chatRoom.chatRoomUUID, 
        { state : {chatRoomId : chatRoom.chatRoomUUID, roomName : chatRoom.roomName, participantsNum : chatRoom.participantsNum}})
    } 

    return(
        <Div onClick={()=>onClickChatRoom()}>
            <ChatRoomImg>이미지</ChatRoomImg>
            <ChatRoomName>{chatRoom.roomName}</ChatRoomName>
            {chatRoom.chatRoomType == "MULTI" ? <Particepant>{chatRoom.participantsNum}</Particepant> :<Particepant></Particepant>}
            <label>{receiveMessage}</label>
        </Div>   
    );
}


const Div = styled.div`
margin-top:10px;
margin-bottom:10px;
padding:10px 10px 10px 10px;
border: 1px solid #A4A4A4 ;
border-radius:10px;
height: 60px;
display:flex;
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

const ChatRoomName=styled.div`
padding: 10px;
display:flex;
text-align: center;
align-items : center;
font-size: 17px;
`
const Particepant = styled.div`
padding: 15px 0px 15px 0px;
display:flex;
text-align: center;
align-items : center;
font-size :17px;

`

const Interest = styled.div`
display:inline-block;
font-size:16px;
font-weight: 700;
background-color:#BCBCBC;
margin-right: 10px;
padding: 5px 10px;
border-radius:10px;
`