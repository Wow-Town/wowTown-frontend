import styled from "styled-components";
export default function SelectedInterestList(){
    return(
        <SelectedInterestListFrame >
            <Interest>REACT</Interest>
            <Interest>FRONTEND</Interest>
            <Interest>ALGORITHM</Interest>
        </SelectedInterestListFrame>
    )
}

const SelectedInterestListFrame = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    padding: 9px 10px 9px 10px;
    
    
    
`
const Interest =styled.li`
    display:inline-block;
    font-size:16px;
    font-weight: 700;
    background-color:#BCBCBC;
    margin: 5px;
    padding: 5px 10px;
    border-radius:10px;

`