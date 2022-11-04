/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import { AvatarState } from "../../utils/AvatarState";
import { useRecoilState } from 'recoil';
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {useMutation} from 'react-query';
import { getChatRoomMessage  } from "../../apis/chatRoom.api";
import {Buffer} from 'buffer';
import Navbar from "./Navbar";
import { Stomp } from "@stomp/stompjs";
import { Peer } from 'peerjs';
import Video from "./Video";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";

let stompClient;
//let myStream;
export default function MeetingRoom(){
   // const navigate=useNavigate();
    //const location = useLocation();
    //const [receiveMessage, setReceiveMessage] = useState();
    const [video, setVideo] = useState({});
    const [videoList, setVideoList] = useState([]);
    const privateSpaceId = useRef();
    const [avatar] = useRecoilState(AvatarState);
    const myStream = useRef();
    const sharingScreenStream = useRef();
    const[nowSharing,setNowSharing]=useState(false);
    const params = useParams();
    const [peer,setPeer] = useState();
    const [peerCall,setPeerCall] = useState();

    
    function handleVideoSetting(){
        console.log('mystream보면',myStream.current.getVideoTracks()[0].enabled);
        if( myStream.current.getVideoTracks()[0].enabled === true){
            myStream.current.getVideoTracks()[0].enabled = false;
            console.log('mystream바꾼후',myStream.current.getVideoTracks()[0]);
        }
        else if( myStream.current.getVideoTracks()[0].enabled === false){
            myStream.current.getVideoTracks()[0].enabled = true }
    }
    function handleAudioSetting(){
        console.log('mystream보면',myStream.current.getAudioTracks()[0].enabled);
        if( myStream.current.getAudioTracks()[0].enabled === true){
            myStream.current.getAudioTracks()[0].enabled = false;
            console.log('mystream바꾼후',myStream.current.getAudioTracks()[0]);
        }
        else if( myStream.current.getAudioTracks()[0].enabled === false){
            myStream.current.getAudioTracks()[0].enabled = true }
    }
    
    function isMyVideo(element){
        if(element.id === avatar.avatarId){
            return element.stream
        }
    }
    function handleSharingScreen(){
        // if(nowSharing === true){ setNowSharing(false)}
        // else{ setNowSharing(true)}
        //////////////////
        navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(stream => {
            //setNowSharing(true);
            const screenTrack = stream.getTracks()[0];
            console.log('video',myStream.current.getVideoTracks()[0]);
            console.log('st',screenTrack);
            console.log(peerCall.peerConnection.getSenders());
            peerCall.peerConnection.getSenders()[1].replaceTrack(screenTrack);

            screenTrack.onended = function () {
                const orginalTrack = myStream.current.getVideoTracks()[0];
                peerCall.peerConnection.getSenders()[1].replaceTrack(orginalTrack);
              };
        })
    }
    useEffect(()=>{
        privateSpaceId.current = params.privateSpaceUUID;
        console.log( privateSpaceId.current);
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then(stream =>{
            myStream.current =stream;
            setVideo({"id": avatar.avatarId.toString(), "stream": stream, "option": "CREATE"});

            var ws = new WebSocket('wss://api.wowtown.co.kr/ws-stomp');
            stompClient= Stomp.over(ws);
            stompClient.connect({}, function(frame) {
                const myPeer = new Peer({debug: 3});
                setPeer(myPeer);
                myPeer.on('open', function(id) {
                    console.log(id);
                    stompClient.send("/pub/privateSpace/message",
                    {},
                    JSON.stringify({"type" : "ENTER", "privateSpaceUUID" : privateSpaceId.current, "senderId" : avatar.avatarId, "peerUUID": id}));
                    console.log("미팅룸 입장");
                  });
                
                console.log('mypeer 도 선언해쥼',myPeer)
                myPeer.on('call',call=>{ //peer에 연결되면 제일먼저 상대방 call을 받을준비 해야함 -> 비동기 함수로 바로 다음줄 실행함
                   setPeerCall(call); 
                   call.answer(stream); //answer를 하면 상대방 MediaConnection(const call)의 stream에 본인 스트림(myStream)을 넣어줌
                    call.on('stream',stream =>{ //여기서 avatar
                        console.log(stream)
                        console.log('videolist',videoList)
                        setVideo({"id": call.peer, "stream": stream, "option": "CREATE"})
                        console.log('callon하고 비디오 상태느..?',video);
                    });
                })
                
                //메시지를 수신 받아 상대방 아이디를 받아온다.(본인인경우 따로 처리한다.)
                stompClient.subscribe("/sub/privateSpace/"+privateSpaceId.current,function(message){
                    console.log("메시지 수신"); 
                    let recv = JSON.parse(message.body);
                    if(recv.type === "ENTER"){
                        console.log(recv.peerUUID);
                        if(recv.senderId !== avatar.avatarId){
                            const call = myPeer.call(recv.peerUUID, stream);
                            console.log(call);
                            setPeerCall(call);
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
                        setVideo({"id": recv.peerUUID, "stream": null, "option": "REMOVE"});
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

    const[gridStyle,setGridStyled]=useState("1fr 1fr");
    useEffect(()=>{
        if(videoList.length >=5){
            setGridStyled("1fr 1fr 1fr");
        }
    })

    useEffect(()=>{
       
    },[peerCall])


    return(
        <PrivateSpacePage>
            <Navbar/>
            <PrivateSpaceContentsWrapper>
                <VideoWrapper>
                    <UsersVideoWrapper>
                    <MeetingRoomFrame>
            {/* todo : 프라이빗 스페이스 화면 구성 */}
            <VideoGrid numOfVideo={gridStyle}>
                {
                    videoList.map((video,idx)=>{
                        return <Video key={idx} id={video.id} stream={video.stream}/>;
                    })
                }
            </VideoGrid>
        </MeetingRoomFrame>
                    </UsersVideoWrapper>
                    <SettingForVideoWrapper>
                        <PrivateSpaceName>프라이빗 스페이스 이름</PrivateSpaceName>
                        <PrivateSpaceSettings>
                            <Button
                            onClick={handleVideoSetting}>
                                <ButtonIcon className="material-icons">videocam</ButtonIcon>
                                카메라</Button>
                            <Button
                            onClick={handleAudioSetting}>
                                <ButtonIcon className="material-icons">mic</ButtonIcon>
                                마이크</Button>
                            <Button
                            onClick={handleSharingScreen}>
                            <ButtonIcon className="material-icons">present_to_all</ButtonIcon>
                                화면공유</Button>
                        </PrivateSpaceSettings>
                    </SettingForVideoWrapper>
                </VideoWrapper>
                <ChatWrapper>

                </ChatWrapper>
            </PrivateSpaceContentsWrapper>
        </PrivateSpacePage>
        
    )
}

const MeetingRoomFrame = styled.div`
width:100%;
height:100%;
position relative;
`

const VideoGrid = styled.div`
width:100%;
height:100%;
display:grid;
grid-template-columns: ${(props) => props.numOfVideo || "1fr 1fr"};
gap: 5px 5px;

`

const PrivateSpacePage= styled.div`
    padding: 0px 0px 0px 0px;
    display:block;
    flex-direction: column;
    width:100%;
    height:100%;
`
const PrivateSpaceContentsWrapper=styled.div`
    border: 1px solid #A4A4A4;
    width:1500px;
    display:flex;
    flex-direction: row;
    margin:auto;
    height:90%;
`
const VideoWrapper =styled.div`
    border: 1px solid pink ;
    width:70%;
    
`

const UsersVideoWrapper =styled.div`
    border: 1px solid #A4A4A4;
    height:85%;

`
const UserVideo=styled.video`
    border: 1px solid pink ;
    width:50%;
    height:50%;
`
const SettingForVideoWrapper = styled.div``

const PrivateSpaceName=styled.div`
display:flex;
flex-direction: row;
align-items:center;
margin:15px 20px 25px 20px;
font-size:20px;
font-weight: 600;
`

const PrivateSpaceSettings=styled.div`
    
    margin-left:20px;
    margin-right:20px;
    padding-left:0px;
    list-style: none;
`
const Button=styled.div`
    float:left;
    padding:2px 18px 2px 0px;
    font-size:16px;
    display:flex;
    align-items:center;
`
const ButtonIcon=styled.div`
    margin-right:6px;
    color:#7A7676;


`
const ChatWrapper=styled.div`

`
