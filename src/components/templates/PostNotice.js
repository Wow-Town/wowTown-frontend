/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import { useState } from "react";
import Button from "../atoms/Button";
import InterestList from "./InterestList";


export default function PostNotice(){
    const[noticeTitle,setNoticeTitle]=useState();
    const[noticeContents,setNoticeContents]=useState();
    const[interestList,setInterestList]=useState([]);
    const[noticetTitleError,setNoticeTitleError] =useState(false);
    const[noticeContentsError,setNoticeContentsError]=useState(false);
   
    
    
    function onNoticeTitleHandler(e){
        if(e.target.value.length ===0){setNoticeTitleError(true);
        }else{
            setNoticeTitle(e.target.value);
        }
    }
    function onNoticeContentsHandler(e){
        if(e.target.value.length ===0){setNoticeContentsError(true);
        }else{
            setNoticeContents(e.target.value);
        }
    }
    

    function checkNoticeFormValidation(){
        if(!noticetTitleError && noticeTitle 
            && !noticeContentsError && noticeContents
            && interestList.length !==0){
                return true;
            }else{
                return false;
            }
    }

    function onSubmitNotice(e){
        e.preventDefault();
        if(checkNoticeFormValidation()){
            console.log("맞");
            console.log(noticeTitle);
            console.log(noticeContents);
        }else{
            console.log("틀");
        }

    }
    return(
        <Frame>
            <FrameHeader frameTitle='공고 등록'/>
            <Div onSubmit={onSubmitNotice}>
                <TitleDiv>
                {/* <InputInfo 
                label="공고 제목"
                inputWidth = "100px"
                onChange={onNoticeTitleHandler}/> */}
                <Label>공고 제목</Label>
                <TitleInput onChange={onNoticeTitleHandler}></TitleInput>
                </TitleDiv>
                <AllAreaFrame>
                    <Label>모집 분야(1~3개)</Label>
                    <InterestList setInterestList={setInterestList}/>
                </AllAreaFrame>
                <ContentsDiv>
                    <Label>공고 내용</Label>
                    <Textarea
                        id="inputAboutIntroduction"
                        onChange={onNoticeContentsHandler} 
                     />
                </ContentsDiv>
                <Button buttonText="등록" marginLeft="140px"/>
            </Div>
        </Frame>
    );
}

const Frame= styled.div`
    height:100%;
    padding : 20px 30px 20px 30px;
    border: 1px solid #A4A4A4 ;
`

const Div = styled.form`
`
const TitleDiv = styled.div`
    margin-bottom:20px;
`
const AllAreaFrame =styled.div`

`
const ContentsDiv =styled.div`

`


const Label = styled.label`
    font-style:normal;
    font-size: 16px;
    font-weight: 700;
    width: 140px;
    line-height:20px;
   
`
const TitleInput = styled.input`
    width:369px;
    height:45px; 
    background: #FFFFFF;
    border: 2px solid #A4A4A4;
    box-sizing: border-box;
    border-radius: 10px;
    margin-top:10px;
`
const Textarea = styled.textarea`
    max-width: 369px;
    min-width: 369px;
    max-height: 250px;
    min-height: 250px;
    height:50px; 
    background: #FFFFFF;
    border: 1px solid #A4A4A4;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px 15px 10px 15px;
    margin: 10px 0px 40px 0px;
`