/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "../templates/FrameHeader";
import {useMutation} from 'react-query';
import { useState, useEffect } from "react";
import { getChatRoomList } from "../../apis/chatRoom.api";
import { Routes, Route } from "react-router-dom";
import ChatFrame from "../atoms/ChatFrame";
import { Stomp } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";

let stompClient;

export default function ChatList(){
    const navigate = useNavigate();

    const [chatList, setChatList] = useState([]);
    const [selectChatRoomId, setSelectChatRoomId] = useState("");

    useEffect(() =>{
        //var ws = new WebSocket('wss://localhost/ws-stomp');
        var ws = new WebSocket('wss://api.wowtown.co.kr/ws-stomp');
        stompClient= Stomp.over(ws);
        stompClient.connect({}, function(frame) {
            console.log("웹소켓 연결완료");
            handleGetChatRoomList();
            console.log("채팅방 목록 보여주기");
            console.log(chatList);
        }, function(error){});
        
        return function cleanup() {
            stompClient.disconnect();
            console.log("웹소켓 연결해제");
        }
    },[])   

    const{ mutateAsync: handleGetChatRoomList } = useMutation(getChatRoomList,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('아바타 채팅 목록');
                console.log(response);   
                setChatList(response);
            }else{
                console.log('login failed: ', error);
            }
        }
        });

    function onClickClose(){
        navigate('/connectMetaverse');
    }

    return (
        <ChatListFrame>
            <FrameHeader frameTitle='채팅 리스트' icon={"highlight_off"} onClickClose={onClickClose}/>
            <AllListFrame>
                {
                    chatList.map((chatRoom,index) =>{
                        return (
                            <ChatFrame 
                                key={index} 
                                stompClient={stompClient}
                                chatRoom={chatRoom}
                            />
                        )
                    })
                }
            </AllListFrame>
            </ChatListFrame>
    )
}

const ChatListFrame = styled.div`
width:100%;
height:100%; 
`
const AllListFrame =styled.div`
display:block;
flex-direction: column; 
padding: 0 15px 0 15px;
height: 80%;
overflow-y: scroll;
    

    &::-webkit-scrollbar {
        
        width: 6px;
        
        
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #A4A4A4;
    }
    &::-webkit-scrollbar-thumb:active {
        background: #A4A4A4;
    }
    &::-webkit-scrollbar-thumb {
        background: #BCBCBC;
        border-radius: 10px;
        
    }
`