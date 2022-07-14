/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Button from "./Button.js";
import {useNavigate} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ChannelState } from "../utils/ChannelState.js";

export default function Channel({channelList}){
    const navigate=useNavigate();
    const[ ,setEnteredChannelId] = useRecoilState( ChannelState);
    function onClick(channelId){
        setEnteredChannelId({channelId});
        navigate("/avatars?channelId="+channelId);
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
                <Button callback={() => {onClick(channel.channelId)}} buttonText="입장"/>
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

