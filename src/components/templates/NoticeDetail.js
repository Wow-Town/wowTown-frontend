/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { deleteNotice, getNoticeDetail } from "../../apis/notice.api";
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import Button from "../atoms/Button";
import {useMutation} from 'react-query';
import { useState } from "react";
import { useEffect } from "react";
import { createChatRoom } from "../../apis/chatRoom.api";
import { useLocation,useNavigate } from 'react-router-dom';
import { checkChatRoomPassword } from "../../apis/notice.api";
import { DoubleSubmitCheck } from '../../utils/DoubleSubmmitCheck';
import { useRecoilValue } from "recoil";
import { AvatarState } from "../../utils/AvatarState";
import NoticeDeleteModal from "./NoticeDeleteModal";
export default function NoticeDetail(){

    const [subject,setSubject]=useState("");
    const [ownerId,setOwnerId]=useState("");
    const [interests,setInterests]=useState([]);
    const [description,setDescription]=useState("");
    const [chatRoomUUID,setChatRoomUUID] = useState();
    const [password,setPassword] = useState();
    const [roomName,setRoomName] = useState();
    const [noticeId,setNoticeId] = useState();
    const[ownerNickName,setOwnerNickname]=useState();
    const [buttonComponent, setButtonComponent] =useState(<></>);
    const[doubleSubmitFlag, setDoubleSubmitFlag] = useState(false);
    const [openNoticeDeleteModal,setOpenNoticeDeleteModal] =  useState(false);
    const [verifyDelete,setVerifyDelete] =  useState(false);
    const avatar =useRecoilValue(AvatarState);
    const navigate=useNavigate();
    const location = useLocation();
   

    const{ mutateAsync: handleGetNoticeDetail} = useMutation(getNoticeDetail,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log("굥고 조회 성공", response);   
                setSubject(response.subject);
                setOwnerId(response.ownerId);
                setInterests(response.interests);
                setDescription(response.description);
                setChatRoomUUID(response.chatRoomUUID);
                setPassword(response.randomPW);
                setRoomName(response.subject);

            }else{
                console.log('아바타 조회 실패: ', error);
            }
        }

        });
    const{ mutateAsync: handleCreateChatRoom } = useMutation(createChatRoom,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('아바타 채팅 목록');
                console.log(response); 
                navigate('/connectMetaverse/chat/room/'+response.chatRoomUUID, { state : {chatRoomId : response.chatRoomUUID, roomName : response.roomName}})
            }else{
                console.log('handleCreateChatRoom failed: ', error);
                setDoubleSubmitFlag(false);
            }
        }
        });
    

    function onClickTest(){
            console.log('테스트 시작',ownerId,ownerNickName,"에게 채팅 할거임");
            console.log('내가 들어갈 챗룸 정보들',chatRoomUUID, roomName);
            if(!DoubleSubmitCheck(doubleSubmitFlag,setDoubleSubmitFlag)){
                handleCreateChatRoom({"avatarId": ownerId , "nickName" : ownerNickName });
            }
    }

    const[showInput,setShowInput]=useState(false);
    function onClickRenderingInput(){
        if( showInput === false){
            setShowInput(true);
            console.log(showInput);
        }else{
            setShowInput(false);
            console.log(showInput);
        }

    }
    const[enteredNoticePassword,setEnteredNoticePassword]=useState();
    function onClickPassWordInputBtn(){
        console.log(enteredNoticePassword);
        if (enteredNoticePassword === password){
            console.log('비번 맞ㄷ');
            onClickJoinNotice();
        }else{
            console.log('틀리다');
            console.log(password);
            
        }
    }

    const[showPassword,setShowPassword]=useState(false);
    function onClickShowPassword(){
        if( showPassword === false){
            setShowPassword(true);
            console.log(showPassword);
        }else{
            setShowPassword(false);
            console.log(showPassword);
        }

    }

    function onClickJoinNotice(){
        console.log('공고 입장');  
        if(!DoubleSubmitCheck(doubleSubmitFlag,setDoubleSubmitFlag)){   
            handleCheckChatRoomPassword({"noticeId":noticeId, "password" :password});
        }
    }

    const{ mutateAsync: handleCheckChatRoomPassword} = useMutation(checkChatRoomPassword,{
        onSuccess: ({success, error }) => {
            if(success){
                console.log('공고 채팅방 비밀번호 일치');
                navigate('/connectMetaverse/chat/room/'+chatRoomUUID,{ state : {chatRoomId : chatRoomUUID, roomName : roomName}});
                //handleEnterChatRoom(response.chatRoomUUID);


            }else{
                console.log('login failed: ', error);
                setDoubleSubmitFlag(false);
            }
        }
        });


    const{ mutateAsync: handleDeleteNotice } = useMutation(deleteNotice,{
        onSuccess: ({success, error }) => {
            if(success){
                navigate(-1);      
            }else{
                console.log(error);
            }
        }
        });

    function onClickDelete(){
        setOpenNoticeDeleteModal(true);
    }


    function onClickClose(){
        navigate(-1);
    }

    useEffect( ()=>{
        const noticeId = location.state.noticeId;
        const ownerName = location.state.ownerName;
        setNoticeId(noticeId);
        setOwnerNickname(ownerName);
        //console.log('쥔 이름',ownerName);
        //console.log(noticeId);
        handleGetNoticeDetail(noticeId);
        
    },[]);

    useEffect(()=>{
        if(ownerId === ""){
            <></>
        }
        else if(avatar.avatarId !== ownerId){
            setButtonComponent(
                <>
                    <ButtonWrapper>
                        <Button buttonText="문의"  onClick={onClickTest} marginLeft="80px" marginRight="10px" height="31px" />
                        <Button buttonText="입장"  onClick={onClickRenderingInput} height="31px" color="#FFBC45"marginLeft="auto"/>
                    </ButtonWrapper>
                    { showInput ===true ?
                        <NoticeInputDiv>
                        <NoticeInput
                            type="text"
                            value={enteredNoticePassword}
                            onChange= {(e)=>setEnteredNoticePassword(e.target.value)}
                            maxLength= "120"
                            autoComplete="on"
                            placeholder="공고 비밀번호를 입력하세요"
                        ></NoticeInput>
                        <NoticePassWordBtn className="material-icons"
                            onClick={onClickPassWordInputBtn}
                        >lock</NoticePassWordBtn>
                    </NoticeInputDiv> :<NoticeInputDiv/>
                    }
                </>
            );
        }
        else{
            setButtonComponent(
                <>
                    <ButtonWrapper>
                        <Button buttonText="삭제"  onClick={onClickDelete} marginLeft="80px" marginRight="10px" height="31px" />
                        <Button buttonText="비밀번호 확인"  onClick={onClickShowPassword} height="31px" width="110px" color="#FFBC45"marginLeft="auto"/>
                    </ButtonWrapper>
                    { showPassword ===true ?
                        <NoticeInputDiv>
                            {password}
                        </NoticeInputDiv> :<NoticeInputDiv/>
                    }
                </>
            );
        }
   },[avatar,showInput,showPassword,ownerId,enteredNoticePassword,doubleSubmitFlag])

   useEffect( ()=>{
        if(verifyDelete){
            handleDeleteNotice({"noticeId":noticeId});
        }        
    },[verifyDelete]);

    return(
        <NoticeDetailPage>
            {openNoticeDeleteModal && <NoticeDeleteModal closeModal={setOpenNoticeDeleteModal} setVerifyDelete={setVerifyDelete}/>}
                <FrameHeader frameTitle='공고 상세' icon={"highlight_off"} onClickClose={onClickClose}/>
                <NoticeDetailWrapper>
                    <NoticeDetailTitleDiv>
                        {subject}
                    </NoticeDetailTitleDiv>
                    <OwnerIdDiv>
                        <Label> 작성자 </Label>
                        
                        <ProfileImg className="material-icons">account_circle</ProfileImg>
                        {ownerNickName}
                        
                    </OwnerIdDiv>
                    <RecruitAreaDiv>
                        <Label>모집 분야</Label>
                        <AreaWrapper>
                            {interests.map(
                                (interest) =>{
                                    return(
                                        <Interest
                                        key ={interest}
                                        > {interest}</Interest>
                                    )
                                }
                            )}
                        </AreaWrapper>
                    </RecruitAreaDiv>
                    
                    <ContentsWrapper>
                        <Label>공고 내용</Label>
                        <NoticeDetailContents>
                            {description} 
                        </NoticeDetailContents>
                    </ContentsWrapper>
                    {buttonComponent}
                    </NoticeDetailWrapper>
        </NoticeDetailPage>
)
}

const NoticeDetailPage = styled.div`

`
const NoticeDetailWrapper =styled.div`

`

const NoticeDetailTitleDiv = styled.div`
word-break: break-all;
padding-right:10px;
padding-bottom:40px;
font-size:25px;
font-weight:500;
`

const RecruitAreaDiv = styled.div`

`
const AreaWrapper =styled.div`
    margin-top:10px;
    margin-bottom:15px;
`
const ContentsWrapper =styled.div`
    
`

const OwnerIdDiv=styled.div`
    margin-bottom: 10px;
    display:flex;
    direction:row;
    align-items:center;p
`
const Label = styled.label`
    font-style:normal;
    font-size: 16px;
    font-weight: 700;
    width: 60px;
    line-height:20px;
    
   
`
const NoticeDetailContents =styled.div`
    max-height: 170px;
    min-height: 170px;
    height:50px; 
    background: #FFFFFF;
    border: 1px solid #A4A4A4;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px 15px 10px 15px;
    margin-top:10px;
    word-break:break-all;
    white-space: pre-wrap;
    //스크롤 추가와 스크롤 모양 변경
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

const ButtonWrapper =styled.div`
    margin-top:35px;
    display:flex;
    margin-bottom:15px;
    
`

const Interest =styled.li`
    margin: 5px;
    padding: 5px 10px;
    border-radius:10px;
    display:inline-block;
font-size:14px;
font-weight: 500;
background-color:#BCBCBC;


`
const ProfileImg=styled.div`
    color:pink;
    

    text-align: center;
    display:table-cell;
    vertical-align:middle;


`

const NoticeInputDiv=styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
   

`
const NoticeInput=styled.input`
width:80%;
height140px;
background: #FFFFFF;
border: 1.5px solid #A4A4A4;
box-sizing: border-box;
border-radius: 15px;
padding: 5px 15px 5px 15px;
&:focus {
    
    border-color:black;
    outline: none;
}

`

const NoticePassWordBtn = styled.span`
    margin-left:5px;
    font-size:20px;
`
