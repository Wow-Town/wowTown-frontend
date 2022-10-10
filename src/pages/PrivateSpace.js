/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Navbar from '../components/templates/Navbar';
import styled from "styled-components";
import { useEffect,useRef,useState } from 'react';
import axios from 'axios';

let myStream;

export default function PrivateSpace(){
    let videoRef =useRef(null);
    const [videoState,setVideoState]=useState({
        
    });
    function handleVideoSetting(){
        console.log( myStream.getVideoTracks());
        //myStream.getVideoTracks().foreack( (track) =>{ track.enabled = false});
        if (myStream.getVideoTracks()[0].enabled ===true){ myStream.getVideoTracks()[0].enabled = false}
        else{ myStream.getVideoTracks()[0].enabled= true}
        console.log( 'after',myStream.getVideoTracks()[0].enabled);
    }
    function handleAudioSetting(){
        console.log( myStream.getAudioTracks()[0].enabled);
        if (myStream.getAudioTracks()[0].enabled ===true){ myStream.getAudioTracks()[0].enabled = false}
        else{ myStream.getAudioTracks()[0].enabled= true}
        console.log( myStream.getAudioTracks()[0].enabled);
    }

    async function getMedia(){
        try{
            myStream = await navigator.mediaDevices.getUserMedia({
                video:true,
                audio : true, //울릴수도..
            })
            //https://www.youtube.com/watch?v=4sLUfUGLEp0 참고 영상 (+노마드 코더 3.0강)
            console.log('마이스트림',myStream);
            let video = videoRef.current;
            video.srcObject = myStream;
            video.play();

        }catch(error){
            console.log('getMedia함수에서 발생한 에러',error);
        }
    }


    useEffect( () => {
       //카메라화면과 오디어 얻기
       getMedia();
       console.log('비디오레프',videoRef);
    },[videoRef]);
    
    return(
        <PrivateSpacePage>
            <Navbar/>
            <PrivateSpaceContentsWrapper>
                <VideoWrapper>
                    <UsersVideoWrapper>
                        <UserVideo 
                        ref={videoRef}
                         autoPlay
                         muted
                         />

                        
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
                            <Button>
                            <ButtonIcon className="material-icons">present_to_all</ButtonIcon>
                                화면공유</Button>
                        </PrivateSpaceSettings>
                    </SettingForVideoWrapper>
                </VideoWrapper>
                <ChatWrapper>

                </ChatWrapper>
            </PrivateSpaceContentsWrapper>
        </PrivateSpacePage>

    );
}

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