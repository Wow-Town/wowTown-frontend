/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "../templates/FrameHeader";
import {useMutation} from 'react-query';
import { useState, useEffect } from "react";
import { getPrivateSpaceList } from "../../apis/PrivateSpace.api";
import { Routes, Route } from "react-router-dom";
import StudyRoomFrame from "../atoms/StudyRoomFrame";
import { useNavigate } from "react-router-dom";


export default function StudyRoomList(){
    const navigate = useNavigate();
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

    function onClickClose(){
        navigate('/connectMetaverse');
    }

    return (
        <StudyRoomListFrame>
            <FrameHeader frameTitle='스터디룸' icon={"highlight_off"} onClickClose={onClickClose}/>
            <AllListFrame>
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
            </AllListFrame>
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