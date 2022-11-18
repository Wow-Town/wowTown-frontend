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

let stompClient;

export default function ChatList(){
    const [chatList, setChatList] = useState([]);
    const [selectChatRoomId, setSelectChatRoomId] = useState("");

    useEffect(() =>{
        handleGetChatRoomList();
        console.log("채팅방 목록 보여주기");
        console.log(chatList);

        //var ws = new WebSocket('wss://localhost/ws-stomp');
        var ws = new WebSocket('wss://api.wowtown.co.kr/ws-stomp');
        stompClient= Stomp.over(ws);
        stompClient.connect({}, function(frame) {
           
            console.log("웹소켓 연결완료");
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

    return (
        <ChatListFrame>
            <FrameHeader frameTitle='채팅 리스트'/>
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
            </ChatListFrame>
    )
}

const ChatListFrame = styled.div`
width:100%;
height:100%; 
`