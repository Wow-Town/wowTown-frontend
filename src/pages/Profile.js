/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import FrameHeader from "../components/templates/FrameHeader";
import Button from "../components/atoms/Button";
import SelectedInterestList from '../components/templates/SelectedInterestList';
//import { ChannelState } from "../utils/ChannelState";
//import { useRecoilState } from 'recoil';
//import { useEffect } from "react";


export default function Profile(){
    const userInf=[
        {
            "avatarId" : "1",
            "nickName" : "나나나",
            "description" : "나나나나나나니skskskskssssssssssssssssssssssssssssssssssssssss",
            "interestList" : ["REACT", "ALGORITHM", "PYTHON"]
          },
        ]


    return(
        <ProfilePage>
            <FrameHeader frameTitle='내 프로필'/>
            <ProfileFrame>
                <SimpleProfile>
                    <ProfileImg className="material-icons">account_circle</ProfileImg>
                    <Name>{userInf[0].nickName}</Name>
                    <Button fontSize="13px" color="#C4C4C4" height ='27px'   buttonText="캐릭터 수정"/>
                </SimpleProfile>
                <H3>관심 분야</H3>
                    <SelectedInterestList  />
                <H3>소개</H3>
                    <IntroductionDiv>
                    {userInf[0].description}    
                    </IntroductionDiv>
            </ProfileFrame>
        </ProfilePage>
    );
}

const ProfilePage= styled.div`
    border: 1px solid #A4A4A4 ;
`
const ProfileFrame =styled.div`
    padding : 20px 30px 20px 30px;
`

const SimpleProfile = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;
    margin-bottom:60px;
`

const ProfileImg=styled.div`
    color:pink;
    font-size:60px;
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



const IntroductionDiv = styled.div`
    //width:370px;
    word-break:break-all;
    font-size:20px;
    font-weight: 400;
    margin-left:5px;
    padding: 10px 10px 10px 10px;
    border: 0.5px solid;
    border-radius:10px;

`

const H3= styled.h3`
    font-size:16px;
    font-weight: 600;
    padding-top:20px;
    //padding-bottom:13px;
    font-style:normal;
    width: 100px;
    line-height:20px; 


`
