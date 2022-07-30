/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Area from "../components/Area";
import FrameHeader from "../components/FrameHeader";
import { useState } from "react";
import Button from "../components/Button";
export default function PostNotice(){
    const areas=[
        "BACKEND", "FRONTEND","PYTHON",
        "CPP",
        "REACT","SPRING",
        
        "JAVA","ALGORITHM" 
    ]

    const[interestList,setInterestList]=useState([]);
    function handleInterestList(areaIndex){
        
        if(!interestList.includes(areas[areaIndex])){
            setInterestList([...interestList,areas[areaIndex]]);
            console.log(interestList);
            }
        
    }

    function setData(areaName){
        handleInterestList(areaName);
    }
    
    function setDataRemove(areaIndex){
        if(interestList.includes(areas[areaIndex])){
            setInterestList(interestList.filter( (item)=>{
                return item !==areas[areaIndex];
            }))
            console.log(interestList);
        }
    }

    return(
        <Frame>
            <FrameHeader frameTitle='공고 등록'/>
            <Div>
                <TitleDiv>
                <Label>공고 제목</Label>
                <TitleInput></TitleInput>
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
                        //onChange={onIntroductionHandler} 
                     />
                </div>
               
            </Div>
        </Frame>
    );
}

const Frame= styled.div`
    padding : 20px 30px 20px 30px;
    border: 1px solid #A4A4A4 ;
    width:490px;

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