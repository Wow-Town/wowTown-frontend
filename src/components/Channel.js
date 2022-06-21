import styled from "styled-components";
import Button from "../components/Button";


export default function Channel({channelList}){
    return(
        <DivChannel>
            
            <InfoChannel></InfoChannel>
            <Button buttonText="입장"/>
            
        </DivChannel>
    );

}

const DivChannel=styled.div`

`

const InfoChannel=styled.div`

`
