/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import ChatRoom from "../templates/ChatRoom";
import { useState, useEffect } from "react";
import {Routes, Route, useNavigate } from "react-router-dom";

export default function ChatFrame({stompClient,chatRoom}){
    const navigate = useNavigate();
    const [receive, setReceive] = useState();
    const [receiveMessage, setReceiveMessage] = useState(chatRoom.latestMessage);
    const [receiveMessageNum, setReceiveMessageNum] = useState(parseInt(chatRoom.receiveMessageNum));

    useEffect(() =>{          
        stompClient.subscribe("/sub/chatRooms/"+chatRoom.chatRoomUUID,function(message){
            console.log("메시지 수신");
            if(message.body !== ""){
                let recv = JSON.parse(message.body);
                setReceive(recv);
                //setReceiveMessage(recv.message);
            } 
        });
    },[])


    useEffect(() =>{
        if(receive!==undefined && receive.type !== "ENTER"){
            console.log(receive);
            if(receive.type === "IMAGE"){
                setReceiveMessage("사진");
                setReceiveMessageNum(receiveMessageNum + 1);
            }
             else if(receive.type === "VIDEO"){
                setReceiveMessage("동영상");
                setReceiveMessageNum(receiveMessageNum + 1);
            }
             else if(receive.type === "APPLICATION"){
                setReceiveMessage("파일");
                setReceiveMessageNum(receiveMessageNum + 1);
            }
             else if(receive.type === "TEXT"){
                setReceiveMessage("파일");
                setReceiveMessageNum(receiveMessageNum + 1);
            }
            else{
                setReceiveMessage(receive.message);
                setReceiveMessageNum(receiveMessageNum + 1);
            }
        }
    },[receive])    

    function onClickChatRoom(){
        navigate('/connectMetaverse/chat/room/'+chatRoom.chatRoomUUID, 
        { state : {chatRoomId : chatRoom.chatRoomUUID, roomName : chatRoom.roomName, participantsNum : chatRoom.participantsNum}})
    } 

    return(
        <Div onClick={()=>onClickChatRoom()}>
            <ChatRoomImg>이미지</ChatRoomImg>
            <ContentFrame>
                <ContentHeader>
                    <ChatRoomName>{chatRoom.roomName}</ChatRoomName>
                    {chatRoom.chatRoomType == "MULTI" ? <Particepant>{chatRoom.participantsNum}</Particepant> :<Particepant></Particepant>}
                </ContentHeader>
                <ContentBody>
                    <Message>{receiveMessage}</Message>
                </ContentBody>
            </ContentFrame>
            {
                receiveMessageNum !== 0 ? <MessageCount>{receiveMessageNum}</MessageCount> : <></>
            }
            
        </Div>   
    );
}


const Div = styled.div`
margin-top:10px;
margin-bottom:10px;
padding:10px 10px 10px 10px;
border: 1px solid #A4A4A4 ;
border-radius:10px;
position:relative;
height: 60px;
display:flex;
width:340px;
`

const ChatRoomImg = styled.div`
background-color:pink;
width:60px;
height:60px;
line-height:60px;
border-radius:100px;
text-align: center;
display:table-cell;
vertical-align:middle;

`

const ContentFrame=styled.div`
padding: 2px 10px 2px 10px;
display:flex;
flex-direction: column;
width: 60%;
`

const ContentHeader=styled.div`
padding: 5px 10px 2px 10px;
display:flex;
width: 100%;
height:50%;
`

const ChatRoomName=styled.div`
align-items : center;
font-size: 17px;
font-weight: 500;
display: inline-block;
width: auto ;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`
const Particepant = styled.div`
display:flex;
text-align: center;
align-items : center;
font-size :17px;
margin-left:5px;
color:gray;

`

const ContentBody=styled.div`
padding: 5px 10px 2px 10px;
display:flex;
height:50%;
`

const Message = styled.div`
font-size:13px;
white-space : nowrap;
overflow : hidden;
text-overflow : ellipsis;
word-wrap : break-word;
margin-right: 10px;
color:gray;
`

const MessageCount = styled.div`
background-color: #ff4141;
color: white;
width: 25px;
height: 25px;
border-radius: 100px;
font-size:13px;
text-align: center;
align-items : center;
margin-right: 10px;
display: flex;
position: absolute;
padding-left: 18px;
top: 30px;
right: 0;
`