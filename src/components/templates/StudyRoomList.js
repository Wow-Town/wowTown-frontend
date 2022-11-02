/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "../templates/FrameHeader";
import {useMutation} from 'react-query';
import { useState, useEffect } from "react";
import { getPrivateSpaceList } from "../../apis/PrivateSpace.api";
import { Routes, Route } from "react-router-dom";
import StudyRoomFrame from "../atoms/StudyRoomFrame";


export default function StudyRoomList(){
    const [privateSpaceList, setPrivateSpaceList] = useState([]);
    

    useEffect(() =>{
        
        handleGetPrivateSpaceList();
    },[])   

    useEffect(()=>{
        console.log('privatespace list  결과',privateSpaceList);
    },[]);
    
    const{ mutateAsync: handleGetPrivateSpaceList } = useMutation(getPrivateSpaceList,{
        onSuccess: ({response, success, error }) => {
            if(success){  
                setPrivateSpaceList(response);
                console.log('api 호출 결과',response);
                
            }else{
                console.log('스터디그룹 목록 불러오기 failed: ', error);
            }
        }
        });

    return (
        <StudyRoomListFrame>
            <FrameHeader frameTitle='스터디룸'/>
                {
                    privateSpaceList.map((privateSpace) =>{
                
                        return (
                            <StudyRoomFrame 
                                key={privateSpace.privateSpaceUUID} 
                                privateSpaceUUID={privateSpace.privateSpaceUUID}
                                chatRoomUUID = {privateSpace.chatRoomUUID}
                                roomName={privateSpace.roomName}
                                participantsNum={privateSpace.participantsNum}
                                
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
