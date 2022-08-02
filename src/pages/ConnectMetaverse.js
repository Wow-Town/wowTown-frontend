/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Button from '../components/atoms/Button';
import Navbar from "../components/templates/Navbar";
import Profile from './Profile';
import Notice from './Notice';
import { useNavigate, Routes, Route  } from 'react-router-dom';
import { useState } from 'react';

export default function connectMetaverse(){
    const navigate=useNavigate();
    const [clearNotice,setClearNotice] = useState(false);

    function onClick(){
        navigate('/connectMetaverse/profile');
    }
    function onClickNotice(){
        setClearNotice(true);
        navigate('/connectMetaverse/notice')
    }
    return(
        <Div>
            <Navbar/>
            <ContentsFrame>
                <Div2>
                    <Metaverse>ffff</Metaverse>
                    <Div3>
                        <DivCharacterName> 
                            <Span>닉네임</Span> 
                            <Button fontSize="13px" color="#C4C4C4" height ='27px' onClick={() => {onClick()}}  buttonText="상세 보기"/>
                        </DivCharacterName>
                        <Menu>
                            <Ul>
                            <span className="material-symbols-outlined">
                                            person_search
                            </span> 친구 목록</Ul>
                            <Ul>접속 유저</Ul>
                            <Ul>채팅 목록</Ul>
                            <Ul onClick={onClickNotice}>공고 보기</Ul>
                        </Menu>
                    </Div3>                
                </Div2>

                <Routes>
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/notice" element={<Notice clearNotice={clearNotice} setClearNotice={setClearNotice}/>} />
                </Routes>
            </ContentsFrame>
        </Div>
    )
}

const Div=styled.div`
padding: 0px 0px 0px 0px;
display:flex;
flex-direction: column;
width:100%;
height:100%;
`

const ContentsFrame = styled.div`
width:1500px;
display:flex;
flex-direction: row;
margin:0 auto;
`

const Div2 =styled.div`

`

const Metaverse = styled.div`
position: sticky;
top: 0;
border: 1px solid  #bcbcbc;
width:1067px;
min-width:500px;
height:662px;
`

const Div3 =styled.div`
border: 1px solid  #bcbcbc;
height:200px;
`

const DivCharacterName=styled.div`
display:flex;
flex-direction: row;
align-items:center;
margin:15px 20px 15px 20px;
font-size:20px;
font-weight: 600;
`

const Span=styled.span`
margin-right:10px;
margin-top:3px;
font-size:20px;
`

const Menu= styled.ul`
margin-left:20px;
margin-right:20px;
padding-left:0px;
list-style: none;
`

const Ul= styled.li`
float:left;
padding:2px 10px 2px 0px;
font-size:16px;
`

const Empty = styled.div`
padding : 20px 30px 20px 30px;
border: 1px solid #A4A4A4 ;
width:490px;
height:60%; 
`
