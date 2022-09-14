/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Button from '../components/atoms/Button';
import Navbar from "../components/templates/Navbar";
import Metaverse from "../components/templates/Metaverse";
import Notice from './Notice';
import { useNavigate, Routes, Route  } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AvatarState } from "../utils/AvatarState";

import Chat from "./Chat";
///////////////////////////////////////나중에 지울부분
import {useMutation} from 'react-query';
import { createChatRoom } from "../apis/chatRoom.api";
import {getNoticeDetail, getNoticeList, checkChatRoomPassword} from "../apis/notice.api";
import Avatar from "./Avatar";



export default function ConnectMetaverse(){
    const navigate=useNavigate();
    const [clearNotice,setClearNotice] = useState(false);
    const [clearChat,setClearChat] = useState(false);
    const avatar= useRecoilValue(AvatarState);

    function onClick(){
        navigate('/connectMetaverse/avatar/profile?id='+avatar.avatarId,{ state : {avatarId : avatar.avatarId}});
    }
    function onClickFriend(){
        navigate('/connectMetaverse/avatar/friend');
    }
    function onClickNotice(){
        setClearNotice(true);
        navigate('/connectMetaverse/notice')
    }
    function onClickChat(){
        setClearNotice(true);
        navigate('/connectMetaverse/chat')
    }
/////////////////////////////아래 지울 부분

////채팅하기 버튼을 누르면 빈 채팅방이 하나 만들어지고 해당 채팅방 UUID를 이용하여 채팅방 페이지로 이동한다.
////채팅방 페이지에 props로 아바타ID또는 공고ID를 넘겨준다.(아마도 채팅방 페이지를 1:1, n:n 따로 만들어야할듯...)
////채팅방 페이지에서 제일 먼저 ID로 상대방 닉네임을 조회하여 채팅방 이름을 표시해준다.
////오픈채팅방일겨우 공고ID 를 가지고 공고 제목,
    const{ mutateAsync: handleCreateChatRoom } = useMutation(createChatRoom,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('아바타 채팅 목록');
                console.log(response); 
                navigate('/connectMetaverse/chat/room/'+response.chatRoomUUID, { state : {chatRoomId : response.chatRoomUUID, roomName : response.roomName}})
                //handleEnterChatRoom(response.chatRoomUUID);


            }else{
                console.log('login failed: ', error);
            }
        }
        });

    function onClickTest(){
        console.log('테스트 시작');
        
        handleCreateChatRoom({"avatarId": 2 , "nickName" : "와사비망고"});
        
    }

    ///////////////////////////////////////////////////////////////////////////
    //공고 리스트 조회
    const [noticeId,setNoticeId] = useState();
    const{ mutateAsync: handleGetNoticeList} = useMutation(getNoticeList,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('공고 리스트');
                console.log(response);
                setNoticeId(response[0].noticeId); //수정해야함 그냥 0번 index로 임의로 설정
                //navigate('/connectMetaverse/chat/room/1a6946f1-ded8-41be-947d-97c9a836ec94',{ state : {chatRoomId : "1a6946f1-ded8-41be-947d-97c9a836ec94", roomName : "알고리즘"}});
                //handleEnterChatRoom(response.chatRoomUUID);


            }else{
                console.log('login failed: ', error);
            }
        }
        });

    function onClickGetAllNotice(){      
        handleGetNoticeList();
        
    }

    ///////////////////////////////////////////////////////////////////////////
    //공고 상세조회
    const [chatRoomID,setChatRoomID] = useState();
    const [password,setPassword] = useState();
    const [roomName,setRoomName] = useState();
    const{ mutateAsync: handleGetNoticeDetail} = useMutation(getNoticeDetail,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('공고 상세');
                console.log(response);
                setChatRoomID(response.chatRoomUUID);
                setPassword(response.randomPW);
                setRoomName(response.subject);
                //navigate('/connectMetaverse/chat/room/1a6946f1-ded8-41be-947d-97c9a836ec94',{ state : {chatRoomId : "1a6946f1-ded8-41be-947d-97c9a836ec94", roomName : "알고리즘"}});
                //handleEnterChatRoom(response.chatRoomUUID);


            }else{
                console.log('login failed: ', error);
            }
        }
        });

    function onClickGetNoticeDetail(){      
        console.log(noticeId);
        handleGetNoticeDetail(noticeId);
        
    }

    //공고 채팅방 입장버튼 누를시 비밀번호 같이 입력후 비밀번호 확인 api호출
    //성공시 채팅방 목록에 채팅방 추가됨
    const{ mutateAsync: handleCheckChatRoomPassword} = useMutation(checkChatRoomPassword,{
        onSuccess: ({success, error }) => {
            if(success){
                console.log('공고 채팅방 비밀번호 일치');
                navigate('/connectMetaverse/chat/room/'+chatRoomID,{ state : {chatRoomId : chatRoomID, roomName : roomName}});
                //handleEnterChatRoom(response.chatRoomUUID);


            }else{
                console.log('login failed: ', error);
            }
        }
        });

    function onClickJoinNotice(){
        console.log('공고 입장');     
        handleCheckChatRoomPassword({"noticeId":noticeId, "password" :password});
        
    }


    return(
        <Div>
            <Navbar/>
            <ContentsFrame>
                <Div2>
                    <Metaverse/>
                    <Div3>
                        <DivCharacterName> 
                            <Span>{avatar.nickName}</Span> 
                            <Button fontSize="13px" color="#C4C4C4" height ='27px' onClick={() => {onClick()}}  buttonText="상세 보기"/>
                        </DivCharacterName>
                        <Menu>
                            <Ul onClick={onClickFriend}>친구 목록</Ul>
                            <Ul>접속 유저</Ul>
                            <Ul onClick={onClickChat}>채팅 목록</Ul>
                            <Ul onClick={onClickNotice}>공고 보기</Ul>
                            <Ul onClick={onClickTest}>[아바타 채팅방 생성 및 입장 테스트]</Ul>
                            <Ul onClick={onClickGetAllNotice}>[공고보기-공고검색p]</Ul>
                            <Ul onClick={onClickGetNoticeDetail}>[공고 상세 조회]</Ul>
                            <Ul onClick={onClickJoinNotice}>[아바타 공고 채팅방 입장 테스트]</Ul>
                        </Menu>
                    </Div3>                
                </Div2> 
                <Routes>
                    <Route path="/" element={<Empty/>} />
                    <Route path="/avatar/*" element={<Avatar/>} />
                    <Route path="/notice/*" element={<Notice clearNotice={clearNotice} setClearNotice={setClearNotice}/>} />
                    <Route path="/chat/*" element={<Chat clearChat={clearChat} setClearChat={setClearChat}/>} />
                </Routes>
            </ContentsFrame>
        </Div>
    )
}

const Div=styled.div`
    padding: 0px 0px 0px 0px;
    display:block;
    flex-direction: column;
    width:100%;
    height:100%;
`

const ContentsFrame = styled.div`
    width:1500px;
    display:flex;
    margin:auto;
    flex-direction: row;
`

const Div2 =styled.div`
    width: 70%;
    margin: 30px 0px 30px 40px;
`

const Div3 =styled.div`
    border: 1px solid  #bcbcbc;
    height: 130px;
    width: 100%;
`
const DivCharacterName=styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;
    margin:15px 20px 15px 20px;
    font-size:20px;
    font-weight: 600;
`

const Span=styled.span`
    margin-right:10px;
    margin-top:3px;
    font-size:20px;
`

const Menu= styled.ul`
    margin-left:20px;
    margin-right:20px;
    padding-left:0px;
    list-style: none;
`

const Ul= styled.li`
    float:left;
    padding:2px 10px 2px 0px;
    font-size:16px;
`

const Empty = styled.div`
padding: 20px 30px 20px 30px;
margin: 30px 40px 30px 30px;
border: 1px solid #A4A4A4;
width: 30%;
height: 700px;
`
