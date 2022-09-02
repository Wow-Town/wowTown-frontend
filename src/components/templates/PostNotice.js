/* eslint-disable no-unused-vars */
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import { useState } from "react";
import Button from "../atoms/Button";
import InterestList from "./InterestList";
import {useMutation} from 'react-query';
import { createNotice } from "../../apis/notice.api";
import { useNavigate } from 'react-router-dom';

export default function PostNotice(){
    const navigate=useNavigate();
    const[noticeTitle,setNoticeTitle]=useState();
    const[noticeContents,setNoticeContents]=useState();
    const[interestList,setInterestList]=useState([]);
    const[noticetTitleError,setNoticeTitleError] =useState(false);
    const[noticeContentsError,setNoticeContentsError]=useState(false);
   
    

    const{ mutateAsync: handleCreateNotice } = useMutation(createNotice,{
        onSuccess: ({ success, error }) => {
            if(success){
                console.log('공고 생성');
                navigate('/connectMetaverse/notice/search');
                //handleEnterChatRoom(response.chatRoomUUID);


            }else{
                console.log('login failed: ', error);
            }
        }
        });

    
    function onNoticeTitleHandler(e){
        if( e.target.value.length ===0 ){ setNoticeTitleError(true);
        }else{ setNoticeTitleError(false); }
        setNoticeTitle(e.target.value); 
    }
    function onNoticeContentsHandler(e){
        if( e.target.value.length ===0 ){ setNoticeContentsError(true);
        }else{setNoticeContentsError(false); }
        setNoticeContents(e.target.value); 
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
            handleCreateNotice({"subject": noticeTitle, "description": noticeContents, "interests": interestList});
        }else{
            console.log("틀");
        }

    }
    return(
        <PostNoticeFrame>
            <FrameHeader frameTitle='공고 등록'/>
            <NoticeForm onSubmit={onSubmitNotice}>
                <TitleDiv>
                <Label>공고 제목</Label>
                <TitleInput 
                    value={noticeTitle || ""}
                    onChange={onNoticeTitleHandler}></TitleInput>
                {
                    noticetTitleError && noticeTitle.length ===0 ? <ErrorMessage>제목을 입력해주세요.</ErrorMessage> : <ErrorMessage/>    
                }
                </TitleDiv>
                <AllAreaFrame>
                    <Label>모집 분야(1~3개)</Label>
                    <InterestList setInterestList={setInterestList}/>
                    {/* {
                    interestList.length ===0? <ErrorMessage>모집분야를 1개 이상 선택해주세요.</ErrorMessage> : <ErrorMessage/>    
                    } */}
                </AllAreaFrame>
                <ContentsDiv>
                    <Label>공고 내용</Label>
                    <Textarea
                        //id="inputAboutIntroduction"
                        value={noticeContents}
                        onChange={onNoticeContentsHandler} 
                     />
                     {
                    noticeContentsError && noticeContents.length ===0 ? <ErrorMessage>내용을 입력해주세요.</ErrorMessage> : <ErrorMessage/>    
                    }
                </ContentsDiv>
                <ButtonWrapper>
                    <Button buttonText="등록" marginLeft="auto"/>
                </ButtonWrapper>
            </NoticeForm>
        </PostNoticeFrame>
    );
}

const PostNoticeFrame = styled.div`
    width:100%;
    height:100%;
`

const NoticeForm = styled.form`
    width:100%;
`
const TitleDiv = styled.div`
    margin-bottom:20px;
`
const AllAreaFrame =styled.div`

`
const ContentsDiv =styled.div`
    margin: 10px 0px 30px 0px;
`


const Label = styled.label`
    font-style:normal;
    font-size: 16px;
    font-weight: 700;
    width: 140px;
    line-height:20px;
   
`
const TitleInput = styled.input`
    width:100%;
    height:45px; 
    background: #FFFFFF;
    border: 2px solid #A4A4A4;
    box-sizing: border-box;
    border-radius: 10px;
    margin-top:10px;
`
const Textarea = styled.textarea`
    width:100%;
    max-height: 170px;
    min-height: 170px;
    height:50px; 
    background: #FFFFFF;
    border: 1px solid #A4A4A4;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px 15px 10px 15px;
    margin-top:10px;
    
`

const ButtonWrapper = styled.div`
    width:100%;
    text-align: center;
`

const ErrorMessage =styled.div`
    font-size: 12px;
    font-weight: 700;
    line-height:20px; 
    color: red;
    height: 20px;
`