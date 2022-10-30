/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Button from '../components/atoms/Button';
import Navbar from "../components/templates/Navbar";
import Metaverse from "../components/templates/Metaverse";
import StudyRoomList from '../components/templates/StudyRoomList';
import Notice from './Notice';
import { useNavigate, Routes, Route  } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { useRecoilValue } from 'recoil';
import { AvatarState } from "../utils/AvatarState";
import { getSendEmail } from "../apis/avatar.api";
import Chat from "./Chat";
import {useMutation} from 'react-query';
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
        navigate('/connectMetaverse/notices');
    }
    function onClickChat(){
        setClearNotice(true);
        navigate('/connectMetaverse/chat');
    }

    function onClickStudyroom(){
        navigate('/connectMetaverse/studyroomlist');
    }

    const{ mutateAsync: handleGetSendEmail } = useMutation(getSendEmail,{
        onSuccess: ({success, error }) => {
            if(success){
                console.log('이메일 전송 완료');
            }else{
                console.log('이메일 전송 실패: ', error);
            }
        }
        });

    useEffect(()=>{
        handleGetSendEmail();
    },[])

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
                            <Ul onClick={onClickFriend}>
                                <UlIcon className="material-icons">people_alt</UlIcon>
                                친구</Ul>
                            <Ul onClick={onClickChat}>
                                <UlIcon className="material-icons">chat</UlIcon>
                                채팅</Ul>
                            <Ul onClick={onClickNotice}>
                                <UlIcon className="material-icons">find_in_page</UlIcon>
                                공고 </Ul>
                            <Ul onClick={onClickStudyroom}>
                                <UlIcon className="material-icons">meeting_room</UlIcon>
                                스터디룸 </Ul>
                        </Menu>
                    </Div3>                
                </Div2> 
                <Routes>
                    <Route path="/" element={<Empty/>} />
                    <Route path="/avatar/*" element={<Avatar/>} />
                    <Route path="/notices/*" element={<Notice clearNotice={clearNotice} setClearNotice={setClearNotice}/>} />
                    <Route path="/chat/*" element={<Chat clearChat={clearChat} setClearChat={setClearChat}/>} />
                    <Route path="/studyroomlist/*" element={<StudyRoomList/>} />
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
    margin:15px 20px 25px 20px;
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
    padding:2px 18px 2px 0px;
    font-size:16px;
    display:flex;
    align-items:center;
`

const Empty = styled.div`
padding: 20px 30px 20px 30px;
margin: 30px 40px 30px 30px;
border: 1px solid #A4A4A4;
width: 30%;
height: 700px;
`
const UlIcon =styled.span`
    margin-right:6px;
    color:#7A7676;

`
