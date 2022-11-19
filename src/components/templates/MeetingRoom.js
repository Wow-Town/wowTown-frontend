/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import { AvatarState } from "../../utils/AvatarState";
import { useRecoilState } from 'recoil';
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate, useParams, Routes, Route} from "react-router-dom";
import {useMutation} from 'react-query';
import { getChatRoomMessage  } from "../../apis/chatRoom.api";
import {Buffer} from 'buffer';
import Navbar from "./Navbar";
import { Stomp } from "@stomp/stompjs";
import { Peer } from 'peerjs';
import Video from "./Video";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";
import ChatRoom from "./ChatRoom";
import { getPrivateSpace } from "../../apis/PrivateSpace.api";
import Avatar from "../../pages/Avatar";
import AvatarFrame from "../atoms/AvatarFrame";
import Profile from "./Profile";

let stompClient;
//let myStream;
export default function MeetingRoom(){
   const navigate=useNavigate();
    //const location = useLocation();
    //const [receiveMessage, setReceiveMessage] = useState();
    const [video, setVideo] = useState({});
    const [videoList, setVideoList] = useState([]);
    const privateSpaceId = useRef();
    const [chatRoomId,setChatRoomId] = useState();
    const [avatar] = useRecoilState(AvatarState);
    const myStream = useRef();
    const sharingScreenStream = useRef();
    const sharingScreenId = useRef('');
    const params = useParams();
    const [peerCallList,setPeerCallList] = useState([]);
    const[micOn,setMicOn]=useState(true);
    const[videoOn,setVideoOn]=useState(true);
    const[openChatRoom,setOpenChatRoom] = useState(false);
    const[nowSharing,setNowSharing]=useState(false);
    const privateSpaceRoomName = useRef('');

    const{ mutateAsync: handleGetPrivateSpace } = useMutation(getPrivateSpace,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log('프라이빗 스페이스 조회 성공');
                console.log(response);
                privateSpaceRoomName.current = response.roomName;
                setChatRoomId(response.chatRoomUUID);
            }else{
                console.log('login failed: ', error);
            }
        }
        });

    function handleVideoSetting(){
        console.log('mystream보면',myStream.current.getVideoTracks()[0].enabled);
        if( myStream.current.getVideoTracks()[0].enabled === true){
            myStream.current.getVideoTracks()[0].enabled = false;
            console.log('mystream바꾼후',myStream.current.getVideoTracks()[0]);
            setVideoOn(false);
        }
        else if( myStream.current.getVideoTracks()[0].enabled === false){
            myStream.current.getVideoTracks()[0].enabled = true 
            setVideoOn(true);
        }
    }
    function handleAudioSetting(){
        console.log('mystream보면',myStream.current.getAudioTracks()[0].enabled);
        if( myStream.current.getAudioTracks()[0].enabled === true){
            myStream.current.getAudioTracks()[0].enabled = false;
            console.log('mystream바꾼후',myStream.current.getAudioTracks()[0]);
            setMicOn(false);
            console.log('마이크꺼ㅓㅓㅓㅓㅓ');
            console.log(micOn);
        }
        else if( myStream.current.getAudioTracks()[0].enabled === false){
            myStream.current.getAudioTracks()[0].enabled = true 
            setMicOn(true);
            console.log('마이크 킨다');
            console.log(micOn);
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
            peerCallList.map((peerCall)=>{
                peerCall.peerConnection.getSenders()[1].replaceTrack(screenTrack);
            })
            
            sharingScreenId.current = screenTrack.id;
            console.log('공유화면의 id는',sharingScreenId.current);
            setNowSharing(true);
            console.log('ㄴsss 버튼 바꾸기 켜진상태')

            screenTrack.onended = function () {
                const orginalTrack = myStream.current.getVideoTracks()[0];
                peerCallList.map((peerCall)=>{
                    peerCall.peerConnection.getSenders()[1].replaceTrack(orginalTrack);
                })
                sharingScreenId.current = '';
                setNowSharing(false);
                console.log('ㄴsss 버튼 바꾸기 꺼진상태')
              };
        })
    }

    function handleChatRoom(){
        setOpenChatRoom(true);
        navigate('/privatespace/'+privateSpaceId.current+ '/chat', 
                { state : {chatRoomId : chatRoomId, roomName : privateSpaceRoomName.current}})
    }

    useEffect(()=>{
        privateSpaceId.current = params.privateSpaceUUID;
        handleGetPrivateSpace({"privateSpaceUUID": privateSpaceId.current});
        console.log( privateSpaceId.current);
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then(stream =>{
            myStream.current =stream;
            setVideo({"id": avatar.avatarId.toString(), "stream": stream, "option": "CREATE"});

            var ws = new WebSocket('wss://api.wowtown.co.kr/ws-stomp');
            //var ws = new WebSocket('wss://localhost/ws-stomp');
            stompClient= Stomp.over(ws);
            stompClient.connect({}, function(frame) {
                const myPeer = new Peer({debug: 3});
                myPeer.on('open', function(id) {
                    console.log(id);
                    stompClient.send("/pub/privateSpace/message",
                    {},
                    JSON.stringify({"type" : "ENTER", "privateSpaceUUID" : privateSpaceId.current, "senderId" : avatar.avatarId, "peerUUID": id}));
                    console.log("미팅룸 입장");
                  });
                
                console.log('mypeer 도 선언해쥼',myPeer)
                myPeer.on('call',call=>{ //peer에 연결되면 제일먼저 상대방 call을 받을준비 해야함 -> 비동기 함수로 바로 다음줄 실행함
                    setPeerCallList(peerCallList => peerCallList.concat(call));
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
                            console.log(peerCallList);
                            setPeerCallList(peerCallList => peerCallList.concat(call));
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

    useEffect( () => {


    },[sharingScreenId]);
    const[gridStyle,setGridStyled]=useState("1fr 1fr");
    useEffect(()=>{
        if(videoList.length >=5){
            setGridStyled("1fr 1fr 1fr");
        }
    })

    //useEffect(()=>{
        //var ws = new WebSocket('wss://localhost/ws-stomp');
        //stompClient= Stomp.over(ws);
            
   // },[peerCall]);


    return(
        <PrivateSpacePage>
            <Navbar/>
            <PrivateSpaceContentsWrapper>
                <VideoWrapper openChatRoom ={openChatRoom}>
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
                        <PrivateSpaceName>{privateSpaceRoomName.current}</PrivateSpaceName>
                        <PrivateSpaceSettings>
                            <Button
                            onClick={handleVideoSetting}>
                                { videoOn === true?
                                    <ButtonIcon className="material-icons">videocam</ButtonIcon>
                                    :  <ButtonIcon className="material-icons">videocam_off</ButtonIcon>
                                }
                                카메라</Button>
                            <Button
                            onClick={handleAudioSetting}>
                                { micOn ===true?
                                <ButtonIcon className="material-icons">mic</ButtonIcon>
                                :  <ButtonIcon className="material-icons">mic_off</ButtonIcon>
                                }
                                마이크</Button>
                            <Button
                            onClick={handleSharingScreen}>
                                {nowSharing === true?
                            <ButtonIcon className="material-icons">present_to_all</ButtonIcon>
                                : <ButtonIcon className="material-icons">stop_screen_share</ButtonIcon>
                                }
                                화면공유</Button>
                                
                            <Button
                            onClick={handleChatRoom}>
                                { openChatRoom ===true?
                                <ButtonIcon className="material-icons">chat_bubble</ButtonIcon>
                                :  <ButtonIcon className="material-icons">chat</ButtonIcon>
                                }
                                채팅</Button>
                        </PrivateSpaceSettings>
                    </SettingForVideoWrapper>
                </VideoWrapper>
                {
                    openChatRoom ? <ChatWrapper>
                                <Routes>
                                    <Route path="/chat" element={<ChatRoom setOpenChatRoom={setOpenChatRoom}></ChatRoom>} />
                                    <Route path="/avatar/*" element={<Profile/>} />
                                </Routes>
                            </ChatWrapper>
                            :
                            <></>
                }
                
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
    //border: 1px solid pink ;
    width:${(props) => props.openChatRoom ? "70%" : "100%"};
    
`

const UsersVideoWrapper =styled.div`
    border: 1px solid #A4A4A4;
    height:85%;

`
const UserVideo=styled.video`
    //border: 1px solid pink ;
    width:50%;
    height:50%;
`
const SettingForVideoWrapper = styled.div`


`

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
    padding: 20px 30px 20px 30px;
    margin: 30px 40px 30px 30px;
    border: 1px solid #A4A4A4;
    width: 30%;
    height: 700px;
`
