/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import SelectNotice from "../components/templates/SelectNotice";
import { useEffect,useState } from "react";


export default function Notice({clearNotice, setClearNotice}){
    const [notice, setNotice] =useState(); 

    useEffect(() =>{
        if(clearNotice){
            setNotice(<SelectNotice setNotice={setNotice}/>);
            setClearNotice(false);
        }
    })

    return(
        <NoticeFrame>{notice}</NoticeFrame>
    );
}

const NoticeFrame = styled.div`
padding : 20px 30px 20px 30px;
border: 1px solid #A4A4A4 ;
width:490px;
height:600px; 
`