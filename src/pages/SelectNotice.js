import styled from "styled-components";
import FrameHeader from "../components/FrameHeader";
import { useNavigate } from "react-router-dom";
export default function SelectNotice(){
    
    const navigate= useNavigate();

    
    return(
        <Frame >
        <FrameHeader frameTitle='공고 유형 선택'/>
        <Div onClick={()=>{navigate('../studyGroups');}}>
            <Icon className="material-icons" >find_in_page</Icon>
            <Label>공고 검색</Label>
        </Div>
        <Div onClick={()=>{navigate('../PostStudyGroups');}}>
            <Icon className="material-icons">edit_document</Icon>
            <Label>공고 등록</Label>    
        </Div>        
        
    </Frame>
    );

}

const Frame= styled.div`
    padding : 20px 30px 20px 30px;
    border: 1px solid #A4A4A4 ;
    width:490px;
    height:60%;
`
const Div=styled.div`
    border: 1px solid #A4A4A4 ;
    width:370px;
    height:200px;
    margin-top:30px;
    border-radius:10px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    cursor: pointer;
    &:hover{
        background-color: #EEEEEE;
    }
    
`
const Icon= styled.span`
    width:80px;
    height:80px;
    font-size:80px;
    color:#A4A4A4;
`
const Label = styled.div`
    font-weight: 400;
`