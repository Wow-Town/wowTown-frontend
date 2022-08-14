/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import {useMutation} from 'react-query';
import { getChatRoom } from "../../apis/chatRoom.api";
import { useState, useEffect } from "react";

export default function Message({chatRoomId,recvMessage}){
    const [participantAvatar, setParticipantAvatar] = useState([]);
    const [messageList, setMessageList] = useState([]);

    //messageList는 채팅방에 입장하면 메시지 내용을 다시 api요청을 통해 가져오고
    //이후 소캣으로 받은 메시지를 리스트에 추가하여 전달해준다. 
    useEffect(() =>{
        console.log(messageList);
        handleGetChatRoom(chatRoomId);
    },[])

    useEffect(() =>{
        if(recvMessage.type === "MESSAGE"){
            setMessageList([...messageList,{"sender": recvMessage.sender, "message": recvMessage.message, "sendeAt": recvMessage.sendeAt, "count": recvMessage.count}]);
        }else{
            handleGetChatRoom(chatRoomId);
        }
      
    },[recvMessage])

    const{ mutateAsync: handleGetChatRoom } = useMutation(getChatRoom,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('채팅방 상세');
                console.log(response);
                setMessageList(response.chatMessageList);
                setParticipantAvatar([...participantAvatar, ...response.avatarList]);
            }else{
                console.log('login failed: ', error);
            }
        }
        });

    return(
        <Div>
           {
                messageList.map((recv,index) =>{
                    if(messageList.length !== 0){
                        return (<MessageFrame key={index}>{recv.sender}-{recv.message} - {recv.count}</MessageFrame>);
                    }
                })
            }
        </Div>
    );
}

const Div = styled.div`
width:100%;
height:80%;
overflow-y: auto;
flex-direction:column_reverse;
`

const MessageFrame = styled.div`
margin-top:10px;
margin-bottom:10px;
padding:10px 10px 10px 10px;
border: 1px solid #A4A4A4 ;
border-radius:10px;
height: 60px;
width: 100px;
`