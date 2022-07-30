/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Button from "./Button.js";
import {useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';
import { useRecoilState } from 'recoil';
import { ChannelState } from "../utils/ChannelState.js";
import { enterChannel } from '../apis/channel.api';
import { getAvatar } from "../apis/avatar.api.js";
import { AvatarState } from "../utils/AvatarState.js";

export default function Channel({channelList}){
    const navigate=useNavigate();
    const[enteredChannelId ,setEnteredChannelId] = useRecoilState( ChannelState);
    const[avatar, setAvatar] = useRecoilState(AvatarState);
    //채널 입장 api 호출 후 바로 다음으로 아바타 조회 api 호출
    const{ mutateAsync: handleGetAvatar } = useMutation(getAvatar,{
        onSuccess: ({response, success, error }) => {
            if(success){
                setAvatar(response);
                navigate('/connectMetaverse');
                     
            }else{
                //error 발생한 이유는 해당 채널에 아바타가 없기 때문이다. -> 아바타 생성 페이지로 이동
                console.log('login failed: ', error);
                navigate('/avatars');   
            }
        }
        });
    
    // 채널 입장 api 호출
    const{ mutateAsync: handleEnterChannel } = useMutation(enterChannel,{
        onSuccess: ({success, error }) => {
            if(success){
                console.log('채널 입장 성공');   
                handleGetAvatar(); 
            }else{
                console.log('login failed: ', error);
            }
        }
        });

    function onClick(channelId){
        setEnteredChannelId(channelId);
        console.log(channelId);
        handleEnterChannel(channelId);
    }
        
    
    return(
        <DivChannelList>
           {channelList.map( channel =>{
            return(
                <ChannelFrame key={channel.channelId}>
                <DivChannel>
                <InfoChannel>
                    {channel.channelName}
                    <InfoJoinNum>{channel.currentJoinNum}/{channel.maxJoinNum}명</InfoJoinNum>
                </InfoChannel>
                <Button onClick={()=>onClick(channel.channelId)} buttonText="입장"/>
                </DivChannel>
                </ChannelFrame>
            )
            })}
        </DivChannelList>
    );

}

const DivChannelList=styled.div`
    display:flex;
    flex-direction: column; 
    justify-content: center; 
    padding-left:83px;
`

const ChannelFrame=styled.div`

    
`
const DivChannel=styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #A4A4A4 ;
    border-radius: 10px;
    height:100px;
    width:510px;
    margin-bottom: 10px;
    
    
`

const InfoChannel=styled.span`
    display:flex;
    flex-direction: column; 
    width: 100px;
    padding-right:170px;
    font-size:18px;
    
`

const InfoJoinNum=styled.div`
font-size:14px;
`

