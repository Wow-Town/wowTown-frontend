/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import { AvatarState } from "../../utils/AvatarState";
import { useRecoilState } from 'recoil';
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {useMutation} from 'react-query';
import { getChatRoom } from "../../apis/chatRoom.api";

import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import Message from "../atoms/Message";

let sockJS;
let stompClient;
let sessionId;

export default function ChatRoom({setReceiveMessage}){
    const location = useLocation();
    const{chatRoomId, roomName} = location.state;
    const [recvMessage, setRecvMessage] = useState({});
    const [sendMessage, setSendMessage] = useState("");
    const [participantAvatar, setParticipantAvatar] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const messageFrameRef = useRef();
    const [avatar] = useRecoilState(AvatarState);

    useEffect(() =>{    
        sockJS = new SockJS("http://localhost:8080/ws-stomp");
        stompClient= Stomp.over(sockJS);
        stompClient.connect({}, function(frame) {
            //연결 성공시 api호출
            handleGetChatRoom(chatRoomId);
            stompClient.subscribe("/sub/chatRooms/"+chatRoomId,function(message){
                console.log("메시지 수신"); 
                let recv = JSON.parse(message.body);
                    console.log(recv);
                    if(recv.type === "SEND"){
                        setRecvMessage(recv);
                    }
                    else{
                        handleGetChatRoom(chatRoomId);
                    }
                });
              
            sessionId = sessionIdParser(sockJS._transport.url);
            console.log(sessionId);
            stompClient.send(
                "/pub/chatRooms/message",
                {},
                JSON.stringify({"type" : "ENTER", "sessionId" : sessionId, "chatRoomUUID" : chatRoomId, "sender" : avatar.nickName, "senderId" : avatar.avatarId,  "message" : ""}));
            console.log("채팅방 입장");     
        }, function(error){});
        
        return function cleanup() {
            stompClient.disconnect();
            console.log("채팅방 나가기");
        }
    },[])    

    useEffect(() =>{
        console.log(messageList);
        const {scrollHeight, clientHeight} = messageFrameRef.current;
        messageFrameRef.current.scrollTop = scrollHeight - clientHeight;
    },[messageList])

    useEffect(() =>{
        setMessageList([...messageList,recvMessage]);
    },[recvMessage])

    const{ mutateAsync: handleGetChatRoom } = useMutation(getChatRoom,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('채팅방 상세');
                setMessageList(response.chatMessageList);
                setParticipantAvatar([...participantAvatar, ...response.avatarList]);
                const {scrollHeight, clientHeight} = messageFrameRef.current;
                messageFrameRef.current.scrollTop = scrollHeight - clientHeight;
            }else{
                console.log('login failed: ', error);
            }
        }
        });
    
    function sendMassage(){
        if(sendMessage !== ""){
            stompClient.send(
                "/pub/chatRooms/message",
                {},
                JSON.stringify({"type" : "SEND", "sessionId" : sessionId, "chatRoomUUID" : chatRoomId, "sender" : avatar.nickName, "senderId" : avatar.avatarId, "message" : sendMessage}));
            console.log("메시지 전송 성공");
            setSendMessage("");
        }
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
            <MessageFrame ref={messageFrameRef}>
                {
                    messageList.map((recv,index) =>{  
                        //console.log(recv);
                        if(messageList.length !== 0 && Object.keys(recv).length !== 0){
                            return (
                                    <Message key={index} recv={recv}/>
                            );
                        }
                    })
                }
            </MessageFrame>
            <MessageInputFrame>
                <MessageInput type="text" placeholder={"메시지를 입력하세요."} value={sendMessage} onChange={onMessageHandler}/>
                <SendButton buttonText="전송"onClick={() => sendMassage()}></SendButton>
            </MessageInputFrame>
                
            
        </ChatRoomFrame>
    )
}

const ChatRoomFrame = styled.div`
width:100%;
height:100%;
`

const MessageFrame = styled.div`
width:100%;
height:75%;
overflow-y: auto;
flex-direction:column_reverse;
`

const MessageInputFrame = styled.div`
width: 100%;
height:50px; 
background: #F5F6F8;
box-sizing: border-box;
border-radius: 30px;
display: flex;
`

const MessageInput = styled.input`
width: 85%;
height: 100%;
border: none;
background: transparent;
&:focus{
    outline: none;
}
`
//버튼 모양은 나연님이 수정 부탁드립니다.
const SendButton = styled.button`
background-color: ${(props) =>props.color ||"#F98B00"};
width:30px;
height:30px;
line-height:60px;
border-radius:100px;
text-align: center;
vertical-align:middle;
margin: 5px 5px 5px 5px;
font-size: 15px;
`