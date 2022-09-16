/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";

export default function ListFrame({ownerName,subject,interests}){

    return(
        <Div>
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