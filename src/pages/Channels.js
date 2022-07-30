/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Channel from "../components/Channel";
import Header from "../components/Header";
import styled from "styled-components";
import { useEffect ,useState } from "react";
import {useMutation} from 'react-query';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { LoginState } from '../utils/LoginState';
import { getChannelList } from '../apis/channel.api';

export default function Channels(){
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    const[channelList,setChannelList]=useState([]);
    const{ mutateAsync: handleGetChannelList } = useMutation(getChannelList,{
        onSuccess: ({response, success, error }) => {
            if(success){
                setChannelList(response);        
            }else{
                console.log('login failed: ', error);
            }
        }
        });
    
    useEffect(() => {
        handleGetChannelList();
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
