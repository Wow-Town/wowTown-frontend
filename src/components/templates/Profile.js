/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import FrameHeader from "./FrameHeader";
import Button from "../atoms/Button";
import SelectedInterestList from './SelectedInterestList';
import { useRecoilValue } from 'recoil';
import { AvatarState } from '../../utils/AvatarState';
import { useState, useEffect } from 'react';
import {useMutation} from 'react-query';
import { useNavigate, useLocation } from "react-router-dom";
import { addFriend, approveFriendRequest, rejectFriendRequest, getAvatarById } from '../../apis/avatar.api';
import { createChatRoom } from "../../apis/chatRoom.api";


export default function Profile(){
    const navigate=useNavigate();
    const location = useLocation();
    const{avatarId} = location.state;
    const loginAvatar = useRecoilValue(AvatarState);
    const [avatar, setAvatar] =useState();
    const [title, setTitle] = useState("");
    const [nickName, setNickName] = useState("");
    const [interest, setInterest] = useState([]);
    const [description, setDescription] = useState("");
    const [buttonComponent, setButtonComponent] =useState(<></>);

    const{ mutateAsync: handleGetAvatarById } = useMutation(getAvatarById,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('아바타 조회');
                console.log(response);   
                setAvatar(response);
            }else{
                console.log('아바타 조회 실패: ', error);
            }
        }
        });

    const{ mutateAsync: handleAddFriend } = useMutation(addFriend,{
        onSuccess: ({ success, error }) => {
            if(success){
                console.log('친구 신청'); 
                navigate('/connectMetaverse/avatar/friend');
            }else{
                console.log('친구 신청 실패: ', error);
            }
        }
        });

    const{ mutateAsync: handleApproveFriendRequest } = useMutation(approveFriendRequest,{
        onSuccess: ({ success, error }) => {
            if(success){
                console.log('친구 수락'); 
                navigate('/connectMetaverse/avatar/friend');
            }else{
                console.log('친구 수락 실패: ', error);
            }
        }
        });

    const{ mutateAsync: handleRejectFriendRequest } = useMutation(rejectFriendRequest,{
        onSuccess: ({ success, error }) => {
            if(success){
                console.log('친구 거절'); 
                navigate('/connectMetaverse/avatar/friend');
            }else{
                console.log('친구 거절 실패: ', error);
            }
        }
        });

    const{ mutateAsync: handleCreateChatRoom } = useMutation(createChatRoom,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('채팅방 생성');
                console.log(response); 
                navigate('/connectMetaverse/chat/room/'+response.chatRoomUUID, { state : {chatRoomId : response.chatRoomUUID, roomName : response.roomName, participantsNum : response.participantsNum}})
            }else{
                console.log('login failed: ', error);
            }
        }
        });

    function onClickAddFriend(){
        handleAddFriend({"friendAvatarId": avatar.avatarId});
    }

    function onClickApproveFriend(){
        handleApproveFriendRequest({"friendAvatarId": avatar.avatarId});
    }

    function onClickRejectFriend(){
        handleRejectFriendRequest({"friendAvatarId": avatar.avatarId});
    }

    function onClickChat(){
        handleCreateChatRoom({"avatarId": avatar.avatarId , "nickName" : avatar.nickName});
    }

    //avatarId를 navigation state {avatarId, friendStatus}를 통해 받아 업데이트 될때마다 다시 랜더링한다.
    //friendStatus를 통해 본인 프로필인지 친구 프로필인지 판단하여 본인 프로필일경우 조회를 하지 않고 localStorage에서 가져온다.
    useEffect(()=>{
        if(avatarId !== loginAvatar.avatarId){
            //todo: 본인은 아니지만 해당 프로필이 이미 본인과 친구인지 아닌지는 모름
            //추후 백엔드에서 아바타 조회할때 자신과 이미 친구인지 아닌지 response에 추가 예정
            handleGetAvatarById(avatarId);
        }
        else{
            setAvatar(loginAvatar);
        }
    },[avatarId])

    useEffect(()=>{
        if(avatar !== undefined){
            if(avatar.friendStatus === "APPROVED"){
                setTitle("친구 프로필");
                setButtonComponent(
                    <ButtonContents>
                        <Button onClick={onClickChat} fontSize="13px" color="#C4C4C4" height ='27px' marginRight={"10px"}  buttonText="채팅하기"/>
                    </ButtonContents>
                    );
            }
            else if(avatar.friendStatus === "REQUESTED"){
                setTitle("친구 프로필");
                setButtonComponent(
                    <ButtonContents>
                        <Button onClick={onClickApproveFriend} fontSize="13px" color="#C4C4C4" height ='27px' marginRight={"10px"}  buttonText="친구 수락"/>
                        <Button onClick={onClickRejectFriend} fontSize="13px" color="#C4C4C4" height ='27px' marginRight={"10px"}  buttonText="친구 거절"/>
                    </ButtonContents>
                    );
            }
            else if(avatar.friendStatus === "BLANK"){
                setTitle("친구 프로필");
                setButtonComponent(
                    <ButtonContents>
                        <Button onClick={onClickAddFriend} fontSize="13px" color="#C4C4C4" height ='27px' marginRight={"10px"}  buttonText="친구 신청"/>
                    </ButtonContents>
                    );
            }
            else{
                setTitle("내 프로필");
                setButtonComponent(
                    <ButtonContents>
                        <Button fontSize="13px" color="#C4C4C4" height ='27px' marginRight={"10px"}  buttonText="프로필 수정"/>
                        <Button fontSize="13px" color="#C4C4C4" height ='27px' marginRight={"10px"}  buttonText="아바타 삭제"/>
                    </ButtonContents>
                    );
            }
            setNickName(avatar.nickName);
            setInterest(avatar.interests);
            setDescription(avatar.description);
        }
   },[avatar])

    

        return(
            <ProfileFrame>
                <FrameHeader frameTitle={title}/>
                <SimpleProfile>
                    <ProfileImg className="material-icons">account_circle</ProfileImg>
                    <Name>{nickName}</Name>
                </SimpleProfile>
                {buttonComponent}
                <H3>관심 분야</H3>
                    <SelectedInterestList interestList={interest} />
                <H3>소개</H3>
                <IntroductionDiv>
                {description}    
                </IntroductionDiv>
            </ProfileFrame>
        );
    }
    

const ProfileFrame= styled.div`
    width:100%;
    height:100%;
`

const SimpleProfile = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;
    margin-bottom: 10px;
`

const ButtonContents = styled.div`
    display:flex;
    align-items:center;
    height: 30px;
`

const ProfileImg=styled.div`
    color:pink;
    font-size:60px;
    line-height:60px;
    border-radius:100px;
    text-align: center;
    display:table-cell;
    vertical-align:middle;

`

const Name= styled.h1`
    padding-left:25px;
    padding-right:10px;
    font-size:30px;
    font-weight:500;
`



const IntroductionDiv = styled.div`
    height:300px;
    word-break:break-all;
    font-size:20px;
    margin-left:5px;
    padding: 10px 10px 10px 10px;
    border: 0.5px solid;
    border-radius:10px;
    //스크롤 추가와 스크롤 모양 변경
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #BCBCBC;
      }

`

const H3= styled.h3`
    font-size:16px;
    font-style:normal;
`
