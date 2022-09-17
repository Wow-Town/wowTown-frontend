/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { getNoticeDetail } from "../../apis/notice.api";
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import Button from "../atoms/Button";
import InterestList from "./InterestList";
import SelectedInterestList from "./SelectedInterestList";
import {useMutation} from 'react-query';
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

export default function NoticeDetail(){
    const [subject,setSubject]=useState("");
    const [onwerId,setOwnerId]=useState("");
    const [interests,setInterests]=useState([]);
    const [description,setDescription]=useState("");

    const location = useLocation();
   

    const{ mutateAsync: handleGetNoticeDetail} = useMutation(getNoticeDetail,{
        onSuccess: ({response, success, error }) => {
            if(success){
                console.log("굥고 조회 성공", response);   
                setSubject(response.subject);
                setOwnerId(response.ownerId);
                setInterests(response.interests);
                setDescription(response.description);

            }else{
                console.log('아바타 조회 실패: ', error);
            }
        }
        });
    
    useEffect( ()=>{
        const noticeId = location.state.noticeId;
        console.log(noticeId);
        handleGetNoticeDetail(noticeId);
        
    },[]);

    return(
        <NoticeDetailPage>
                <FrameHeader frameTitle='공고 상세'/>
                <NoticeDetailWrapper>
                    <NoticeDetailTitleDiv>
                        {subject}
                    </NoticeDetailTitleDiv>
                    <OwnerIdDiv>
                        <Label> 작성자 </Label>
                        
                        <ProfileImg className="material-icons">account_circle</ProfileImg>
                        {onwerId}
                        
                    </OwnerIdDiv>
                    <RecruitAreaDiv>
                        <Label>모집 분야</Label>
                        <AreaWrapper>
                            {interests.map(
                                (interest) =>{
                                    return(
                                        <Interest
                                        key ={interest}
                                        > {interest}</Interest>
                                    )
                                }
                            )}
                        </AreaWrapper>
                    </RecruitAreaDiv>
                    
                    <ContentsWrapper>
                        <Label>공고 내용</Label>
                        <NoticeDetailContents>
                            {description} 
                        </NoticeDetailContents>
                    </ContentsWrapper>
                    <ButtonWrapper>
                        <Button buttonText="문의" marginLeft="80px" marginRight="10px" height="31px" />
                        <Button buttonText="입장"  height="31px" color="#FFBC45"marginLeft="auto"/>
                    </ButtonWrapper>
                    </NoticeDetailWrapper>
        </NoticeDetailPage>
)
}

const NoticeDetailPage = styled.div`

`
const NoticeDetailWrapper =styled.div`

`

const NoticeDetailTitleDiv = styled.div`

padding-right:10px;
padding-bottom:40px;
font-size:25px;
font-weight:500;
`

const RecruitAreaDiv = styled.div`

`
const AreaWrapper =styled.div`
    margin-top:10px;
    margin-bottom:15px;
`
const ContentsWrapper =styled.div`
    
`

const OwnerIdDiv=styled.div`
    margin-bottom: 10px;
    display:flex;
    direction:row;
    align-items:center;p
`
const Label = styled.label`
    font-style:normal;
    font-size: 16px;
    font-weight: 700;
    width: 60px;
    line-height:20px;
    
   
`
const NoticeDetailContents =styled.div`
    
    max-height: 170px;
    min-height: 170px;
    height:50px; 
    background: #FFFFFF;
    border: 1px solid #A4A4A4;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px 15px 10px 15px;
    margin-top:10px;
    word-break:break-all;
`

const ButtonWrapper =styled.div`
    margin-top:35px;
    display:flex;
    
`

const Interest =styled.li`
    margin: 5px;
    padding: 5px 10px;
    border-radius:10px;
    display:inline-block;
font-size:14px;
font-weight: 500;
background-color:#BCBCBC;


`
const ProfileImg=styled.div`
    color:pink;
    

    text-align: center;
    display:table-cell;
    vertical-align:middle;


`
