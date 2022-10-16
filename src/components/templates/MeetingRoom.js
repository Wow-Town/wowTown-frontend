/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import { AvatarState } from "../../utils/AvatarState";
import { useRecoilState } from 'recoil';
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useMutation} from 'react-query';
import { getChatRoomMessage  } from "../../apis/chatRoom.api";
import {Buffer} from 'buffer';

import { Stomp } from "@stomp/stompjs";
import { Peer } from 'peerjs';
import Video from "./Video";

let stompClient;

export default function MeetingRoom(){
    const navigate=useNavigate();
    const location = useLocation();
    const [receiveMessage, setReceiveMessage] = useState();
    const [video, setVideo] = useState({});
    const [videoList, setVideoList] = useState([]);
    const chatRoomId = "23c007fd-e3e9-4062-be3e-d536ea9fadc7";
    const [avatar] = useRecoilState(AvatarState);

    const myStream = navigator.mediaDevices.getUserMedia({
        video:true,
        audio:true
    });
    
    useEffect(()=>{
        myStream.then(stream =>{
            setVideo({"id": avatar.avatarId.toString(), "stream": stream, "option": "CREATE"});

            var ws = new WebSocket('ws://localhost:8080/ws-stomp');
            stompClient= Stomp.over(ws);
            stompClient.connect({}, function(frame) {
                stompClient.send("/pub/privateSpace/message",
                {},
                JSON.stringify({"type" : "ENTER", "privateSpaceUUID" : chatRoomId, "senderId" : avatar.avatarId}));
                console.log("미팅룸 입장");

                const myPeer = new Peer(avatar.avatarId.toString(),{debug: 3});
                
                myPeer.on('call',call=>{ //peer에 연결되면 제일먼저 상대방 call을 받을준비 해야함 -> 비동기 함수로 바로 다음줄 실행함
                    call.answer(stream); //answer를 하면 상대방 MediaConnection(const call)의 stream에 본인 스트림(myStream)을 넣어줌
                    call.on('stream',stream =>{ //여기서 avatar
                        console.log(stream);
                        console.log(videoList);
                        setVideo({"id": call.peer, "stream": stream, "option": "CREATE"});
                    });
                })
                
                //메시지를 수신 받아 상대방 아이디를 받아온다.(본인인경우 따로 처리한다.)
                stompClient.subscribe("/sub/privateSpace/"+chatRoomId,function(message){
                    console.log("메시지 수신"); 
                    let recv = JSON.parse(message.body);
                    if(recv.type === "ENTER"){
                        console.log(recv.senderId.toString());
                        if(recv.senderId !== avatar.avatarId){
                            const call = myPeer.call(recv.senderId.toString(), stream);
                            console.log("call.peer= "+call.peer);
                            //console.log("(31)방인원: " + Object.keys(peers).length);
                            call.on('stream',stream =>{//여기서 avatarVideoStream은 상대방 비디오 스트림임
                                console.log(stream);
                                console.log(videoList);
                                setVideo({"id": call.peer, "stream": stream, "option": "CREATE"});
                            });  
                        }
                    }
                    else if(recv.type === "LEAVE"){
                        console.log(recv.senderId);
                        setVideo({"id": recv.senderId.toString(), "stream": null, "option": "REMOVE"});
                    }
                });
  
            },function(error){});
        
            return function cleanup() {
                stompClient.disconnect();
                console.log("미팅룸 나가기");
            }  
        })
    },[])   

    useEffect(()=>{
        if(video.option === "CREATE"){
            setVideoList([...videoList,video]);
        }
        else if(video.option === "REMOVE"){
            console.log(video)
            console.log(videoList)
            setVideoList(videoList.filter(v => v.id !== video.id));
        }
    },[video]) 
    
    return(
        <MeetingRoomFrame>
            {/* todo : 프라이빗 스페이스 화면 구성 */}
            <VideoGrid>
                {
                    videoList.map((video,idx)=>{
                        return <Video key={idx} id={video.id} stream={video.stream}/>;
                    })
                }
            </VideoGrid>
        </MeetingRoomFrame>
    )
}

const MeetingRoomFrame = styled.div`
width:100%;
height:100%;
position relative;
`

const VideoGrid = styled.div`

`