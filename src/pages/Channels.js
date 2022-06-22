/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Channel from "../components/Channel";
import Header from "../components/Header";
import styled from "styled-components";
import { useEffect ,useState } from "react";
import axios from 'axios';

export default function Channels({config}){
    const[channelList,setChannelList]=useState([
        {
            channelId : 1,
            channelName : "채널1",
            maxJoinNum : 100,
            currentJoinNum : 10,
          }
    ]);
   
    return(
        <ContentsFrame>
            <Header text="입장할 채널을 고르세요"/>
            <Channel channelList={channelList}/>
        </ContentsFrame>
    );
}

const ContentsFrame = styled.div`
    display:flex;
    flex-direction: column;
    height:100%;
    width:670px;
`

const ChannelList = styled.div`
    display:flex;
    flex-direction: column;

`
