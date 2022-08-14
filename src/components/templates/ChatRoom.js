/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import Button from "../atoms/Button";
import { AvatarState } from "../../utils/AvatarState";
import { useRecoilState } from 'recoil';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import Message from "../atoms/Message";
import InputInfo from "../atoms/InputInfo";

let sockJS;
let stompClient;
let sessionId;

export default function ChatRoom({setReceiveMessage}){
    const location = useLocation();
    const{chatRoomId, roomName} = location.state;
    const [recvMessage, setRecvMessage] = useState({});
    const [sendMessage, setSendMessage] = useState("");
    const [avatar] = useRecoilState(AvatarState);

    useEffect(() =>{         
        sockJS = new SockJS("http://localhost:8080/ws-stomp");
        stompClient= Stomp.over(sockJS);
        stompClient.connect({}, function(frame) {
            console.log(sockJS._transport.url);
            stompClient.subscribe("/sub/chatRooms/"+chatRoomId,function(message){
                console.log("메시지 수신");
                console.log(message.body);
                let recv = JSON.parse(message.body);
                    console.log(recv);
                    //setReceiveMessage(recv.message);
                    //받은 메시지는 내가보낸것도 받고 상대방으로부터 받은 메시지가 있다.
                    setRecvMessage(recv);
            });

            sessionId = sessionIdParser(sockJS._transport.url);
            console.log(sessionId);
            stompClient.send(
                "/pub/chatRooms/message",
                {},
                JSON.stringify({"type" : "CONNECT", "sessionId" : sessionId, "chatRoomUUID" : chatRoomId, "sender" : avatar.nickName, "senderId" : avatar.avatarId,  "message" : ""}));
            console.log("채팅방 입장");
        }, function(error){});
        
        return function cleanup() {
            stompClient.send(
                "/pub/chatRooms/message",
                {},
                JSON.stringify({"type" : "DISCONNECT", "sessionId" : sessionId, "chatRoomUUID" : chatRoomId, "sender" : avatar.nickName, "senderId" : avatar.avatarId,  "message" : ""}));
            stompClient.disconnect();
            console.log("채팅방 나가기");
        }
    },[])    
    
    function sendMassage(){
        stompClient.send(
            "/pub/chatRooms/message",
            {},
            JSON.stringify({"type" : "MESSAGE", "sessionId" : sessionId, "chatRoomUUID" : chatRoomId, "sender" : avatar.nickName, "senderId" : avatar.avatarId, "message" : sendMessage}));
        console.log("메시지 전송 성공");
        setSendMessage("");
    }

    function sessionIdParser(url){
        return url.split("/")[5];
    }

    function onMessageHandler(e){
        setSendMessage(e.target.value);
    }

    return(
        <ChatRoomFrame>
            <FrameHeader frameTitle={roomName}></FrameHeader>
            <Message chatRoomId={chatRoomId} recvMessage={recvMessage}/>
            <MessageInput type="text" placeholder={"메시지를 입력하세요."} value={sendMessage} onChange={onMessageHandler}/>
            <Button buttonText="전송"onClick={() => sendMassage()}/>
        </ChatRoomFrame>
    )
}

const ChatRoomFrame = styled.div`
width:100%;
height:100%;
`
const MessageInput = styled.input`
width: 502px;
    height:50px; 
    background: #FFFFFF;
    border: 2px solid #A4A4A4;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 1px 15px 1px 15px;
`