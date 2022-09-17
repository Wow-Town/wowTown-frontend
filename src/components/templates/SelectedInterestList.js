/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
export default function SelectedInterestList({interestList}){
    return(
        <SelectedInterestListFrame >
            {
                interestList.map((interest,idx) =>{
                    return <Interest key={idx}>{interest}</Interest>
                })
            }
        </SelectedInterestListFrame>
    )
}

const SelectedInterestListFrame = styled.div` 
`

const Interest =styled.li`
    display:inline-block;
    font-size:16px;
    font-weight: 700;
    background-color:#BCBCBC;
    margin-right: 10px;
    padding: 5px 10px;
    border-radius:10px;

`