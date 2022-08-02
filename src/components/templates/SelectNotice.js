/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import FrameHeader from "./FrameHeader";
import NoticeList from "./NoticeList";
import PostNotice from "./PostNotice";

export default function SelectNotice({setNotice}){

    function onClickNoticeList(){
        setNotice(<NoticeList/>);
    }
    function onClickPostNotice(){
        setNotice(<PostNotice/>);
    }
    

    return(
        <SelectNoticeFrame>
            <FrameHeader frameTitle='공고 유형 선택'/>
            <Div onClick={()=> onClickNoticeList()}>
                <Icon className="material-icons" >find_in_page</Icon>
                <Label>공고 검색</Label>
            </Div>
            <Div onClick={()=> onClickPostNotice()}>
                <Icon className="material-icons">edit_document</Icon>
                <Label>공고 등록</Label>    
            </Div>
        </SelectNoticeFrame>
    );
}

const SelectNoticeFrame = styled.div`
width:100%;
height:100%;
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