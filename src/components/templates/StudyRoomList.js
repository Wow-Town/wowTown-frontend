/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "../templates/FrameHeader";
import {useMutation} from 'react-query';
import { useState, useEffect } from "react";
import { getChatRoomList } from "../../apis/chatRoom.api";
import { Routes, Route } from "react-router-dom";
import StudyRoomFrame from "../atoms/StudyRoomFrame";


export default function StudyRoomList(){
    const [chatList, setChatList] = useState([]);
    const [selectChatRoomId, setSelectChatRoomId] = useState("");

    useEffect(() =>{
        handleGetChatRoomList();
    },[])   

    const{ mutateAsync: handleGetChatRoomList } = useMutation(getChatRoomList,{
        onSuccess: ({response, success, error }) => {
            if(success){  
                setChatList(response);
            }else{
                console.log('스터디그룹 목록 불러오기 failed: ', error);
            }
        }
        });

    return (
        <StudyRoomListFrame>
            <FrameHeader frameTitle='스터디룸'/>
                {
                    chatList.filter( chatRoom => chatRoom.chatRoomType === "MULTI" ).map((chatRoom,index) =>{
                
                        return (
                            <StudyRoomFrame 
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
