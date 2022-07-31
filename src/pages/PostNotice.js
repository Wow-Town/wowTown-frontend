/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Area from "../components/Area";
import FrameHeader from "../components/FrameHeader";
import { useState } from "react";
import Button from "../components/Button";

export default function PostNotice(){
    const[noticeTitle,setNoticeTitle]=useState();
    const[noticeContents,setNoticeContents]=useState();
    const[interestList,setInterestList]=useState([]);
    const[noticetTitleError,setNoticeTitleError] =useState(false);
    const[noticeContentsError,setNoticeContentsError]=useState(false);
   
    const areas=[
        "BACKEND", "FRONTEND","PYTHON",
        "CPP",
        "REACT","SPRING",
        "JAVA","ALGORITHM" 
    ]
    
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
    function onInterestListHandler(areaIndex){
        
        if(!interestList.includes(areas[areaIndex])){
            setInterestList([...interestList,areas[areaIndex]]);
            console.log(interestList);
            }
        
    }

    function setData(areaName){
        onInterestListHandler(areaName);
    }
    
    function setDataRemove(areaIndex){
        if(interestList.includes(areas[areaIndex])){
            setInterestList(interestList.filter( (item)=>{
                return item !==areas[areaIndex];
            }))
            console.log(interestList);
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
        <Frame>bb
            <FrameHeader frameTitle='공고 등록'/>
            <Div onSubmit={onSubmitNotice}>
                <TitleDiv>
                <Label>공고 제목</Label>
                <TitleInput onChange={onNoticeTitleHandler}></TitleInput>
                </TitleDiv>
                <div>
                    <Label>모집 분야</Label>
                    <ul className="areasFrame">
                    {areas.map((area,index) =>{
                        return <Area 
                         key={index} 
                         index={index} 
                         setData={setData} 
                         setDataRemove= {setDataRemove} 
                         area={area}
                        interestList = {interestList}
                        />;
                    })}
                </ul>
                </div>
                <div>
                    <Label>공고 내용</Label>
                    <Textarea
                        id="inputAboutIntroduction"
                        onChange={onNoticeContentsHandler} 
                     />
                </div>
                <Button buttonText="등록" marginLeft="133px"/>
            </Div>
        </Frame>
    );
}

const Frame= styled.div`
    padding : 20px 30px 20px 30px;
    border: 1px solid #A4A4A4 ;
    width:490px;

`

const Div = styled.form`

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

