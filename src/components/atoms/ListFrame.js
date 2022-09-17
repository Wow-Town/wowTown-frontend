/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
export default function ListFrame({ownerName,subject,interests,noticeId}){
    const navigate = useNavigate();
    const {clickedNoticeId,setClickedNoticeId}= useState();
    function onClickGetNoticeDetail(){
        //클릭하면 해당 공고 id 불러옴, 그 id맞는 공고디테일

        //setClickedNoticeId(noticeId);
        navigate('../'+noticeId,
        { state : {
            noticeId:noticeId
        }});
    }

    return(
        <Div onClick={onClickGetNoticeDetail}>
            <Name>{subject}</Name>
            <Interests>
                {interests.map(
                    (interest)=>{
                        return( 
                        <Interest key={interest}>{interest}</Interest>
                    )}
                )}
            </Interests>
        </Div>
    );
}


const Div = styled.div`
width:90%;
padding:10px 15px 10px 15px;
margin-bottom:10px;
border: 1px solid #A4A4A4 ;
border-radius:10px;
`
const Name=styled.div`
margin-bottom:10px;

`
const Interests = styled.div`
display:flex;

`

const Interest = styled.div`
display:inline-block;
font-size:14px;
font-weight: 500;
background-color:#BCBCBC;
margin-right: 10px;
padding: 5px 10px;
border-radius:10px;
`