/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "../templates/FrameHeader";
import {useMutation} from 'react-query';
import { useState, useEffect } from "react";
import { getChatRoomList } from "../../apis/chatRoom.api";
import { Routes, Route } from "react-router-dom";
import ChatFrame from "../atoms/ChatFrame";


export default function StudyRoomList(){
    const [chatList, setChatList] = useState([]);
    const [selectChatRoomId, setSelectChatRoomId] = useState("");

    useEffect(() =>{
        handleGetChatRoomList();
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
        <StudyRoomListFrame>
            <FrameHeader frameTitle='스터디룸'/>
                {
                    chatList.map((chatRoom,index) =>{
                
                        return (
                            <ChatFrame 
                                key={index} 
                                chatRoom={chatRoom}
                            />
                        )
                    })
                }
            </StudyRoomListFrame>
    )
}

const StudyRoomListFrame = styled.div`
padding: 20px 30px 20px 30px;
margin: 30px 40px 30px 30px;
border: 1px solid #A4A4A4;
width: 30%;
height: 700px;
`
