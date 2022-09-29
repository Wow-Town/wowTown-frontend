/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { getNoticeDetail } from "../../apis/notice.api";
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import Button from "../atoms/Button";
import {useMutation} from 'react-query';
import { useState } from "react";
import { useEffect } from "react";
import { createChatRoom } from "../../apis/chatRoom.api";
import { useLocation,useNavigate } from 'react-router-dom';
import { checkChatRoomPassword } from "../../apis/notice.api";
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
                }
            }
            });
        

        function onClickTest(){
                console.log('테스트 시작',ownerId,ownerNickName,"에게 채팅 할거임");
                console.log('내가 들어갈 챗룸 정보들',chatRoomUUID, roomName);
                handleCreateChatRoom({"avatarId": ownerId , "nickName" : ownerNickName });
                
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
        function onClickJoinNotice(){
            console.log('공고 입장');     
            handleCheckChatRoomPassword({"noticeId":noticeId, "password" :password});
            
        }
    
        const{ mutateAsync: handleCheckChatRoomPassword} = useMutation(checkChatRoomPassword,{
            onSuccess: ({success, error }) => {
                if(success){
                    console.log('공고 채팅방 비밀번호 일치');
                    navigate('/connectMetaverse/chat/room/'+chatRoomUUID,{ state : {chatRoomId : chatRoomUUID, roomName : roomName}});
                    //handleEnterChatRoom(response.chatRoomUUID);
    
    
                }else{
                    console.log('login failed: ', error);
                }
            }
            });

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

    return(
        <NoticeDetailPage>
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
                    </NoticeDetailWrapper>
        </NoticeDetailPage>
)
}

const NoticeDetailPage = styled.div`

`
const NoticeDetailWrapper =styled.div`

`

const NoticeDetailTitleDiv = styled.div`

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