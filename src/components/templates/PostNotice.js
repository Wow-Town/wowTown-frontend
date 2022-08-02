/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Area from "../atoms/Area";
import FrameHeader from "./FrameHeader";
import { useState } from "react";
import Button from "../atoms/Button";
import InterestList from "./InterestList";
export default function PostNotice(){

    const[interestList,setInterestList]=useState([]);

    return(
        <PostNoticeFrame>
            <FrameHeader frameTitle='공고 등록'/>
            <Div>
                <TitleDiv>
                <Label>공고 제목</Label>
                <TitleInput></TitleInput>
                </TitleDiv>
                <div>
                    <Label>모집 분야</Label>
                    <InterestList setInterestList={setInterestList}/>
                </div>
                <div>
                    <Label>공고 내용</Label>
                    <Textarea
                        id="inputAboutIntroduction"
                        //onChange={onIntroductionHandler} 
                     />
                </div>
               
            </Div>
        </PostNoticeFrame>
    );
}

const PostNoticeFrame = styled.div`
width:100%;
height:100%;
`


const Div = styled.div`

`

const TitleDiv = styled.div`

`

const Label = styled.label`
font-style:normal;
font-size: 16px;
font-weight: 700;
width: 140px;
line-height:20px; 
padding: 0px 0px 10px 0px;
margin-top:30px;
`

const TitleInput = styled.input`
width:369px;
height:45px; 
background: #FFFFFF;
border: 2px solid #A4A4A4;
box-sizing: border-box;
border-radius: 10px;
padding: 1px 15px 1px 15px;

`

const Textarea = styled.textarea`
max-width: 369px;
min-width: 369px;
max-height: 250px;
height:50px; 
background: #FFFFFF;
border: 1px solid #A4A4A4;
box-sizing: border-box;
border-radius: 10px;
padding: 10px 15px 10px 15px;
margin-bottom:40px;
`
