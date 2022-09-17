/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import FrameHeader from "./FrameHeader";
import { useNavigate } from 'react-router-dom';

export default function SelectNotice(){
    const navigate=useNavigate();

    function onClickNoticeList(){
        navigate('/connectMetaverse/notices/search');
    }
    function onClickPostNotice(){
        navigate('/connectMetaverse/notices/post');
    }
    

    return(
        <SelectNoticeFrame>
            <FrameHeader frameTitle='공고 유형 선택'/>
            <SelectNoticetype>
            <Div onClick={()=> onClickNoticeList()}>
                <Icon className="material-icons" >find_in_page</Icon>
                <Label>공고 검색</Label>
            </Div>
            <Div onClick={()=> onClickPostNotice()}>
                <Icon className="material-icons">edit_document</Icon>
                <Label>공고 등록</Label>    
            </Div>
            </SelectNoticetype>
        </SelectNoticeFrame>
    );
}

const SelectNoticeFrame = styled.div`
    width:100%;
    height:100%;

`
const SelectNoticetype =styled.div`
    width:100%;
`
const Div=styled.div`

border: 1px solid #A4A4A4 ;
width:100%;
height:250px;
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