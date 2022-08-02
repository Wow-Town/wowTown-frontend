/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";

export default function ListFrame(){

    return(
        <Div>
            <Name>공고 이름 들어감</Name>
            <Interests>
                <Interest>REACT</Interest>
                <Interest>FRONTEND</Interest>
            </Interests>
        </Div>
    );
}


const Div = styled.div`
margin-top:10px;
margin-bottom:10px;
padding:10px 10px 10px 10px;
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
font-size:16px;
font-weight: 700;
background-color:#BCBCBC;
margin-right: 10px;
padding: 5px 10px;
border-radius:10px;
`