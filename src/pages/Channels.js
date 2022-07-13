/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Channel from "../components/Channel";
import Header from "../components/Header";
import styled from "styled-components";
import { useEffect ,useState } from "react";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { LoginState } from '../utils/LoginState';

export default function Channels(){
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    const[channelList,setChannelList]=useState([]);

    useEffect(() => {
        axios.get('http://api.wowtown.co.kr:81/channels',{
            headers:{
                'Authorization' : localStorage.getItem('accessToken'),
            }
        }).then(response => {
                console.log(response);
                setChannelList(response.data);
                axios.defaults.headers.common['Authorization'] = ` ${response.data.accessToken}`

        })
    },[]);

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
