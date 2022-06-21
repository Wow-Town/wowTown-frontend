import Channel from "../components/Channel";
import Header from "../components/Header";
import styled from "styled-components";
import { useEffect ,useState } from "react";
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

export default function Channels(){
    const[channelList,setChannelList]=useState([
        {
            "channelId" : 1,
            "channelName" : "채널1",
            "maxJoinNum" : 100,
            "currentJoinNum" : 10,
          }
    ]);
    // useEffect(() => {
    //     axios.get('http://13.209.5.41:81/channels')
    //         .then(response => {
    //             console.log(response.data);
    //             setChannelList(response.data);
    //         });
    // }, []);
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