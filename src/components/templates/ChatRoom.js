/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import { AvatarState } from "../../utils/AvatarState";
import { useRecoilState } from 'recoil';
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useMutation} from 'react-query';
import {useDropzone} from 'react-dropzone';
import { getChatRoomMessage, uploadFile } from "../../apis/chatRoom.api";
import {Buffer} from 'buffer';

import { Stomp } from "@stomp/stompjs";
import Message from "../atoms/Message";
import ChatRoomAvatarList from "./ChatRoomAvatarList";

let stompClient;

export default function ChatRoom(){
    const navigate=useNavigate();
    const location = useLocation();
    const{chatRoomId, roomName} = location.state;
    const [recvMessage, setRecvMessage] = useState({});
    const [sendMessage, setSendMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [clickDehaze, setClickDehaze] = useState(false);
    const messageFrameRef = useRef();
    const [avatar] = useRecoilState(AvatarState);

    useEffect(() =>{    
        var ws = new WebSocket('wss://api.wowtown.co.kr/ws-stomp');
        stompClient= Stomp.over(ws);
        stompClient.connect({}, function(frame) {
            //연결 성공시 api호출
            handleGetChatRoomMessage(chatRoomId);
            stompClient.subscribe("/sub/chatRooms/"+chatRoomId,function(message){
                console.log("메시지 수신"); 
                let recv = JSON.parse(message.body);
                    console.log(recv);
                    if(recv.type === "TALK"){
                        setRecvMessage(recv);
                    }
                    else{
                        handleGetChatRoomMessage(chatRoomId);
                    }
                });

            stompClient.send(
                "/pub/chatRooms/message",
                {},
                JSON.stringify({"type" : "ENTER", "chatRoomUUID" : chatRoomId, "sender" : avatar.nickName, "senderId" : avatar.avatarId,  "message" : ""}));
            console.log("채팅방 입장");     
        }, function(error){});
        
        return function cleanup() {
            stompClient.disconnect();
            console.log("채팅방 나가기");
        }
    },[])    

    useEffect(() =>{
        console.log(messageList);
        const {scrollHeight, clientHeight} = messageFrameRef.current;
        messageFrameRef.current.scrollTop = scrollHeight - clientHeight;
    },[messageList])

    useEffect(() =>{
        setMessageList([...messageList,recvMessage]);
    },[recvMessage])

    const{ mutateAsync: handleGetChatRoomMessage } = useMutation(getChatRoomMessage,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('채팅방 메시지');
                setMessageList(response);
                const {scrollHeight, clientHeight} = messageFrameRef.current;
                messageFrameRef.current.scrollTop = scrollHeight - clientHeight;
            }else{
                console.log('login failed: ', error);
            }
        }
        });

    const{ mutateAsync: handleUploadFile } = useMutation(uploadFile,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('파일 업로드 성공');
                response.forEach((upload)=>{
                    if(upload.contentType.split('/')[0] === "image"){
                        stompClient.send(
                            "/pub/chatRooms/message",
                            {},
                            JSON.stringify({"type" : "IMAGE", "chatRoomUUID" : chatRoomId, "sender" : avatar.nickName, "senderId" : avatar.avatarId, "message" : Buffer.from(upload.url).toString('base64')}));
                     }
                     else if(upload.contentType.split('/')[0] === "video"){
                        stompClient.send(
                            "/pub/chatRooms/message",
                            {},
                            JSON.stringify({"type" : "VIDEO", "chatRoomUUID" : chatRoomId, "sender" : avatar.nickName, "senderId" : avatar.avatarId, "message" : Buffer.from(upload.url).toString('base64')}));
                     }
                     else if(upload.contentType.split('/')[0] === "application"){
                        stompClient.send(
                            "/pub/chatRooms/message",
                            {},
                            JSON.stringify({"type" : "APPLICATION", "chatRoomUUID" : chatRoomId, "sender" : avatar.nickName, "senderId" : avatar.avatarId, "message" : Buffer.from(upload.url).toString('base64')}));
                     }
                     else if(upload.contentType.split('/')[0] === "text"){
                        stompClient.send(
                            "/pub/chatRooms/message",
                            {},
                            JSON.stringify({"type" : "TEXT", "chatRoomUUID" : chatRoomId, "sender" : avatar.nickName, "senderId" : avatar.avatarId, "message" : Buffer.from(upload.url).toString('base64')}));
                     }
                })
            }else{
                console.log('파일 업로드 실패: ', error);
            }
        }
        });
    
    function sendMassage(){
        if(sendMessage !== ""){
            console.log(sendMessage);
            stompClient.send(
                "/pub/chatRooms/message",
                {},
                JSON.stringify({"type" : "TALK", "chatRoomUUID" : chatRoomId, "sender" : avatar.nickName, "senderId" : avatar.avatarId, "message" : Buffer.from(sendMessage).toString('base64')}));
            console.log("메시지 전송 성공");
            setSendMessage("");
        }
    }

    function onMessageHandler(e){
        setSendMessage(e.target.value);
    }

    function onClickAvatarList(){
        setClickDehaze(true);
        console.log("아바타 리스트 클릭")
    }

    function onClickClose(){
        navigate(-1);
    }

    //DropZone Code
    const onDrop = useCallback((acceptedFiles) => {
        const formData = new FormData();
        
        acceptedFiles.map((file) => {
            
            const reader = new FileReader()

            reader.readAsDataURL(file);

            console.log(1);
            formData.append("file",file);

            console.log(formData);
                
                

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => console.log('file reading start')
            })
        handleUploadFile({"chatRoomId": chatRoomId, "formData" : formData});
      }, [])
    const {getRootProps, isDragActive} = useDropzone({onDrop, noClick: true})

    return(
        <ChatRoomFrame>
            <ChatRoomAvatarList chatRoomId={chatRoomId} clickDehaze={clickDehaze} setClickDehaze={setClickDehaze}/>
            <ChatRoomBody clickDehaze={clickDehaze}>
                <ChatRoomFrameWrapper clickDehaze={clickDehaze}>
                    <AvatarList>
                        <Icon 
                        className="material-icons"
                        font-size="30px"
                        onClick={onClickAvatarList}>
                        dehaze 
                        </Icon>
                    </AvatarList>
                    <FrameHeader frameTitle={roomName} width={"90%"} position={"absolute"} rigth={"0px"} icon={"highlight_off"} onClickClose={onClickClose}></FrameHeader>
                </ChatRoomFrameWrapper>    
                <MessageFrame {...getRootProps()} ref={messageFrameRef}>
                    {
                        messageList.map((recv,index) =>{  
                            if(messageList.length !== 0 && Object.keys(recv).length !== 0){
                                return (
                                        <Message key={index} recv={recv}/>
                                );
                            }
                        })
                    }
                </MessageFrame>
                
                <MessageInputFrame clickDehaze={clickDehaze}>
                    <MessageInput type="text" placeholder={"메시지를 입력하세요."} value={sendMessage} onChange={onMessageHandler}/>
                    <SendButton buttonText="전송"onClick={() => sendMassage()}></SendButton>
                </MessageInputFrame>  
            </ChatRoomBody>  
        </ChatRoomFrame>
    )
}

const ChatRoomFrame = styled.div`
width:100%;
height:100%;
position relative;
`

const ChatRoomBody = styled.div`
background-color: ${(props)=>props.clickDehaze?'#9AA0A6':'#ffffff'};
opacity: ${(props)=>props.clickDehaze?'0.5':'1'};
width: 100%;
height: 100%;
position: absolute;
z-index: 0;
`

const ChatRoomFrameWrapper = styled.div`
height:100px;
width:100%;
position: relative;
opacity: ${(props)=>props.clickDehaze?'0.5':'1'};
`

const AvatarList= styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
padding : 20px 0px 50px 0px;
position:absolute;
left:0px;
width:10%;
`

const Icon=styled.span`
cursor: pointer;

`

const MessageFrame = styled.div`
width:100%;
height:75%;
overflow-y: auto;
flex-direction:column_reverse;
overflow-y: scroll;
    

&::-webkit-scrollbar {
    
    width: 10px;
    
    
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

const MessageInputFrame = styled.div`
width: 100%;
height:50px; 
background: #F5F6F8;
box-sizing: border-box;
border-radius: 30px;
display: flex;
opacity: ${(props)=>props.clickDehaze?'0.5':'1'};
`

const MessageInput = styled.input`
width: 85%;
height: 100%;
border: none;
background: transparent;
&:focus{
    outline: none;
}
`
//버튼 모양은 나연님이 수정 부탁드립니다.
const SendButton = styled.button`
background-color: ${(props) =>props.color ||"#F98B00"};
width:30px;
height:30px;
line-height:60px;
border-radius:100px;
text-align: center;
vertical-align:middle;
margin: 5px 5px 5px 5px;
font-size: 15px;
`