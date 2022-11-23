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
            noticeId:noticeId, ownerName:ownerName
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
word-break: break-all;
position: relative;
`
const Name=styled.div`
word-wrap: break-word;      /* IE 5.5-7 */
white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
white-space: pre-wrap;
margin-bottom:10px;
display: inline-block;
width: 270px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
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