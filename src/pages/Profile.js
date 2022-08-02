/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import FrameHeader from "../components/templates/FrameHeader";
import Button from "../components/atoms/Button";
import { ChannelState } from "../utils/ChannelState";
import { useRecoilState } from 'recoil';
import { useEffect } from "react";
import axios from 'axios';

export default function Profile(){

    useEffect(() => {
        axios.get('http://api.wowtown.co.kr:81/avatars',{
            headers:{
                'Authorization' : localStorage.getItem('accessToken'),
            }
        }).then(response => {
                console.log(response);
                axios.defaults.headers.common['Authorization'] = ` ${response.data.accessToken}`

        })
    },[]);

    return(
        <ProfileFrame >
            <FrameHeader frameTitle='내 프로필'/>
            <SimpleProfile>
                <ProfileImg>닉</ProfileImg>
                <Name>닉네임</Name>
                <Button fontSize="13px" color="#C4C4C4" height ='27px'   buttonText="캐릭터 수정"/>
            </SimpleProfile>
            <H3>관심 분야</H3>
            <InterestListDiv>
                <H4>ALGORITHM</H4>
                <H4>FRONTEND</H4>
                <H4>BACKEND</H4>
            </InterestListDiv>
             
            <H3>소개</H3>
            
            <IntroductionDiv>
                안녕~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            </IntroductionDiv>
            
        </ProfileFrame>
    );
}

const ProfileFrame= styled.div`
padding : 20px 30px 20px 30px;
border: 1px solid #A4A4A4 ;
width:490px;
`

const SimpleProfile = styled.div`
display:flex;
flex-direction: row;
align-items:center;
margin-bottom:60px;
`

const ProfileImg=styled.div`
background-color:pink;
width:60px;
height:60px;
line-height:60px;
border-radius:100px;
text-align: center;
display:table-cell;
vertical-align:middle;

`

const Name= styled.h1`
padding-left:25px;
padding-right:10px;
font-size:30px;
font-weight:500;
`

const InterestListDiv = styled.div`
display:flex;
flex-direction: row;
justify-content: flex-start;
`

const IntroductionDiv = styled.div`
//width:370px;
word-break:break-all;
font-size:20px;
font-weight: 400;
margin-left:5px;

`

const H3= styled.h3`
font-size:16px;
font-weight: 600;
padding-top:20px;
padding-bottom:13px;
font-style:normal;
width: 100px;
line-height:20px; 


`

const H4 =styled.li`
display:inline-block;
font-size:16px;
font-weight: 700;
background-color:#BCBCBC;
margin: 5px;
padding: 5px 10px;
border-radius:10px;

`