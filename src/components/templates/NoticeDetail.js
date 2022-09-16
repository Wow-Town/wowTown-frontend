/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { getNoticeDetail } from "../../apis/notice.api";
import styled from "styled-components";
import FrameHeader from "./FrameHeader";
import Button from "../atoms/Button";
import InterestList from "./InterestList";
import SelectedInterestList from "./SelectedInterestList";
export default function NoticeDetail(){

    function setInterestList(){
        console.log("d");
    }
    return(
        <NoticeDetailPage>
                <FrameHeader frameTitle='공고 상세'/>
                <NoticeDetailWrapper>
                    <NoticeDetailTitleDiv>
                        파이썬 알고리즘 
                    </NoticeDetailTitleDiv>
                    <RecruitAreaDiv>
                        <Label>모집 분야</Label>
                        <AreaWrapper>
                            <Interest>REACT</Interest>
                            <Interest>REACT</Interest>
                            <Interest>REACT</Interest>
                        </AreaWrapper>
                    </RecruitAreaDiv>
                    </NoticeDetailWrapper>
                    <ContentsWrapper>
                        <Label>공고 내용</Label>
                        <NoticeDetailContents>
                            공고 내용 나옴ddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                        </NoticeDetailContents>
                    </ContentsWrapper>
                    <ButtonWrapper>
                        <Button buttonText="문의" marginLeft="auto"/>
                        <Button buttonText="입장" marginLeft="auto"/>
                    </ButtonWrapper>
            
        </NoticeDetailPage>
)
}

const NoticeDetailPage = styled.div`

`
const NoticeDetailWrapper =styled.div`

`

const NoticeDetailTitleDiv = styled.div`
    
`

const RecruitAreaDiv = styled.div`

`
const AreaWrapper =styled.div`
`
const ContentsWrapper =styled.div`
    
`
const Label = styled.label`
    font-style:normal;
    font-size: 16px;
    font-weight: 700;
    width: 140px;
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
`

const ButtonWrapper =styled.div`

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